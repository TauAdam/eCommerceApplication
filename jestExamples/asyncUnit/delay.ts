type numbersHandler = () => number

const delay = (callback: numbersHandler, ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback())
    }, ms)
  })
}

export default delay
