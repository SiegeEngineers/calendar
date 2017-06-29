export const normalize = (s) => {
  if (!s) return ''
  return s.toLowerCase().replace('_','').replace('1','i').replace('3','e').replace('4','a').replace(' ', '')
}