let myMap = new Map()

let keyString = 'a string'
let keyObj = {}
let keyFunc = function () {}

// setting the values
myMap.set(keyString, "value associated with 'a string'")
myMap.set(keyObj, 'value associated with keyObj')
myMap.set(keyFunc, 'value associated with keyFunc')

myMap.size // 3
