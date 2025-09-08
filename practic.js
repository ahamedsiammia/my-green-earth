const number = [
    { id: 1,price:3},
    { id: 2,price:3},
    { id: 3,price:3},
    { id: 4,price:3},

]


let sum = 0;
 number.forEach((lg) =>{
   sum = sum + lg.price
   return sum;
})
console.log(sum)
