export const getArticle = (word: string) => {
  if (word.endsWith('s')) return 'any'
  return 'aeiou'.split('').includes(word[0]) ? 'an' : 'a'
}

export const articlize = (word: string) => {
  return `${getArticle(word)} ${word}`
}
