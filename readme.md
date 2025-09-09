#### 1) What is the difference between var, let, and const?

--> 
   1. var
     - var can be used from outside of the Block.
     - You can Re-declare and Re-assign.
     - var is hoisted and if you want to access it before assign the value, you will gets a value called undefined.


   2. let
     - let is Block scoped.
     - You can't Re-declare it but you can Re-assign the value.
     - let is hoisted but temporal dead zone. You can't access before declare it.


   3. const
     - const is block scoped.
     - You can't Re-declare and Re-assign the value.
     - let is hoisted but temporal dead zone. You can't access before declare it. If it is an object or array, then the
       property or item inside the object can be changed.


#### 2) What is the difference between map(), forEach(), and filter()? 

--> 
   1. map()
     - It oparate on each element and returns a new array.
     - It is  used when needs to be printing and calculating data.

   2. forEach()
     - It oparate on each element but don't returns new array.
     - Doesn't change the old array.
     - Used when transforming new data from an old data.

   3. filter()
     - It's checked every element according to a condition.
     - If the condition is true then the element added into a new array.
     - It use when need to filter some elements from an array.


#### 3) What are arrow functions in ES6?

--> 
   Arrow functions is the shorthand syntax of traditional functions.  If the function have single parameter, 
   don't need to use parantheses and return. But if the function have multiple parameter, need to use parantheses 
   and return. Arrow function is not hoisted.

#### 4) How does destructuring assignment work in ES6?
--> 
   Destructuring assignment is a feature that allows you to easily assign values ​​from an array or object to a 
   different variable. It published in ES6. By using Object destructuring you can ectracted value according to name.


#### 5) Explain template literals in ES6. How are they different from string concatenation?
-->
   Template literals is a new feature of ES6. Template literals are written with backtick (`). By using 
   tamplate literals you can write multi-line strings. Single statements can be given dynamically using variables and 
   ternary oprators. For using variable or expression need to using ${}.