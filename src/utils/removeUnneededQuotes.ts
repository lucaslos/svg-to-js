import forEachMatch from 'utils/forEachMatch';

export default function removeUnneededQuotes(str: string) {
  let cleanStr = str;
  const regex = / |-/g;

  forEachMatch(/"(.+?)"/g, cleanStr, (full, value) => {
    if (!regex.test(value)) {
      cleanStr = cleanStr.replace(full, value);
    }
  });

  return cleanStr;
}
