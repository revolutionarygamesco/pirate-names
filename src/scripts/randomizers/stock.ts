const stockArray = <T>(stock: Array<{ n: number, item: T }>): T[] => {
  const arr: T[] = []

  for (const { n, item } of stock) {
    for (let i = 0; i < n; i++) {
      arr.push(item)
    }
  }

  return arr
}

export default stockArray
