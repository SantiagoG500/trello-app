export const debounce = (callback, wait) => {
  let timer;
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, wait);
  }
}