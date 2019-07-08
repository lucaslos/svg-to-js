import 'lib/svgo-web';
import { IconSet } from 'containers/App';
import forEachMatch from 'utils/forEachMatch';
import camelCase from 'camelcase';

// eslint-disable-next-line no-undef
const svgo = new SVGO({
  full: true,
  plugins: [
    { mergePaths: true },
    { convertShapeToPath: { convertArcs: true } },
  ],
});

type Shape = {
  d?: string;
  [i: string]: string | number | boolean | undefined;
};

function isNumericStr(str: string) {
  return !Number.isNaN(parseFloat(str)) && Number.isFinite(Number(str));
}

function convertSvg(content: string) {
  // get viewBox
  const viewBox = (/viewBox="(.*?)"/g.exec(content) || [''])[1];
  const paths: (Shape | string)[] = [];
  let colors: string[] = [];
  let finalContent = content;

  // get colors
  forEachMatch(/fill="(.+?)"/g, content, (full, color) => {
    if (color !== 'none' && !colors.includes(color)) {
      colors.push(color);
    }
  });

  // check colors
  if (colors.length < 2) {
    colors = [];
    finalContent = finalContent.replace(/fill=".+?"/g, '');
  }

  // get paths
  forEachMatch(/<path.+?\/>/g, finalContent, fullMatch => {
    const path: Shape = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      path[camelCase(prop)] = isNumericStr(value) ? Number(value) : value;
    });

    const attributes = Object.keys(path);

    if (attributes.length === 1 && path.d) {
      paths.push(path.d);
    } else {
      paths.push(path);
    }
  });

  if (!viewBox || paths.length === 0) {
    return false;
  }

  return {
    viewBox,
    ...(paths.length > 0 && { paths }),
  };
}

export default async function svgToJson(iconSet: IconSet) {
  const validIcons = iconSet.filter(icon => icon.svg !== '');

  if (validIcons.length === 0) {
    return '';
  }

  const promises = await validIcons.map(icon =>
    svgo.optimize(icon.svg)
      // .then(secondPass => svgo.optimize(secondPass.data))
  );
  const iconsSvgOutput = await Promise.all(promises);

  let outPut = '';

  iconsSvgOutput.forEach(({ data }, id) => {
    const name = validIcons[id].name || `icon${id}`;
    const convertedSvg = convertSvg(data);

    if (!convertedSvg) {
      throw new Error(`${outPut} error in 🡒 "${name}"`);
    }

    outPut = `${outPut}"${name}": ${JSON.stringify(
      convertSvg(data),
      null,
      2,
    )},\n`;
  });

  outPut = outPut.slice(0, -2);

  return outPut;
}
