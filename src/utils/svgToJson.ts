import 'lib/svgo-web';
import { IconSet } from 'containers/App';
import forEachMatch from 'utils/forEachMatch';

// eslint-disable-next-line no-undef
const svgo = new SVGO({
  full: true,
  plugins: [{ convertShapeToPath: true }, { mergePaths: true }],
});

type Elem = {
  evenodd?: boolean;
  d?: string;
  [i: string]: string | number | boolean | undefined;
};

function isNumericStr(str: string) {
  return /^\d+\.\d+$/.test(str);
}

function convertSvg(content: string) {
  // get viewBox
  const viewBox = (/viewBox="(.*?)"/g.exec(content) || [''])[1];
  let paths: Elem[] = [];
  const rects: Elem[] = [];
  const circles: Elem[] = [];
  let colors: string[] = [];
  let finalContent = content;
  let colorIndex = 1;

  // get colors
  forEachMatch(/fill="(.+?)"/g, content, (full, color) => {
    if (color !== 'none' && !colors.includes(color)) {
      finalContent = finalContent.replace(RegExp(color, 'g'), `${colorIndex}`);
      colors.push(color);
      colorIndex++;
    }
  });

  // check colors
  if (colors.length < 2) {
    colors = [];
    finalContent = finalContent.replace(/fill=".+?"/g, '');
  }

  // get paths
  forEachMatch(/<path.+?\/>/g, finalContent, fullMatch => {
    const elem: Elem = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      elem[prop] = isNumericStr(value) ? Number(value) : value;
    });

    paths.push(elem);
  });

  paths = paths.map(elem =>
    Object.keys(elem).reduce<Elem>((object, key) => {
      if (['fill-rule', 'clip-rule'].includes(key)) {
        object.evenodd = true;
      } else {
        object[key] = elem[key];
      }

      return object;
    }, {}),
  );

  // get rects
  forEachMatch(/<rect.+?\/>/g, finalContent, fullMatch => {
    const elem: Elem = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      elem[prop] = isNumericStr(value) ? Number(value) : value;
    });

    rects.push(elem);
  });

  // get circles
  forEachMatch(/<circle.+?\/>/g, finalContent, fullMatch => {
    const elem: Elem = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      elem[prop] = isNumericStr(value) ? Number(value) : value;
    });

    circles.push(elem);
  });

  if (paths.length === 0 && rects.length === 0 && circles.length === 0) {
    return false;
  }

  return {
    viewBox,
    ...(colors.length > 0 && { colors }),
    ...(paths.length > 0 && { paths }),
    ...(rects.length > 0 && { rects }),
    ...(circles.length > 0 && { circles }),
  };
}

export default async function svgToJson(
  iconSet: IconSet,
) {
  const validIcons = iconSet.filter(icon => icon.svg !== '');

  if (validIcons.length === 0) {
    return '';
  }

  const promises = await validIcons.map(icon => svgo.optimize(icon.svg));
  const iconsSvgOutput = await Promise.all(promises);

  let outPut = '';

  iconsSvgOutput.forEach(({ data }, id) => {
    const name = validIcons[id].name || `icon${id}`;
    const convertedSvg = convertSvg(data);

    if (!convertedSvg) {
      throw new Error(`${outPut} error in 🡒 "${name}"`);
    }

    outPut = `${outPut}"${name}": ${JSON.stringify(convertSvg(data), null, 2)},\n`;
  });

  outPut = outPut.slice(0, -2);

  return outPut;
}
