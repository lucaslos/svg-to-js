export default function forEachMatch(regex: RegExp, string: string, callback: (...args: string[]) => void) {
  let result;
  while ((result = regex.exec(string)) !== null) {
    callback(...result);
  }
}
