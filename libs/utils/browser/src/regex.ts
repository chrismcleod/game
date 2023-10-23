export const arrayToOrRegexStr = (
  arr?: string | string[],
  defaultRegEx?: string
) => {
  if (!arr) return defaultRegEx || ''
  const cast = ([] as string[]).concat(arr)
  return `${cast
    .slice(1)
    .reduce((acc, cur) => `${acc}|(\\s${cur}\\s)`, `(\\s${cast[0]}\\s)`)}`
}

export const arrayToOrRegex = (
  arr?: string | string[],
  defaultRegEx?: string
) => {
  return new RegExp(arrayToOrRegexStr(arr, defaultRegEx), 'ig')
}
