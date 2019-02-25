/**
 * @ignore
 */
export type NextIteration = string[] | undefined;

/**
 * @ignore
 */
export class CookieIterator {
  cookiesList = document.cookie.split(';') || [];

  next(): NextIteration {
    let toReturn;
    let charPos;
    if (this.cookiesList.length === 0) {
      return undefined;
    }
    // dequeue first element of cookiesList
    toReturn = this.cookiesList.shift() as string;

    // remove leading whitespaces only
    charPos = 0;
    while (toReturn[charPos] === ' ') {
      charPos++; // eslint-disable-line
    }
    toReturn = toReturn.substring(charPos);

    // split 'key=value' string by first '=' occurrence (regex greedy operator)
    const values = toReturn.split(/=(.+)?/);
    return [values[0], values[1]];
  }
}
