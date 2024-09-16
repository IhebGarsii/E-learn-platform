/* const isStringArray = (str) => {
  return str.isArray();
};

console.log(isStringArray([1,1]));
 */

/* function indexx(arr, n) {
  const arrr = arr.filter((value, index) => index < n);
  return arrr;
}
console.log(indexx([], 3));
 */
/* 
function lastElement(arr, n) {
  if (n < 0) {
    n = 1;
  }
  const arrr = arr.slice(-n);
  return arrr;
}
console.log(lastElement([1, 2, 3, 4, 5], -4));
 */

/* const joinArray = (array, sep) => {
  return array.join(sep);
};
console.log(joinArray(["iheb", "garsi"], "-"));
 */

/* function insertDashEvenNumber(str) {
  str = str.toString();
  let result = [];
  let number = str[0];
  for (let i = 0; i < str.length; i++) {
    console.log(number % 2 === 0);

    if (number % 2 === 0) {
      if (i < str.length - 1) {
        result.push(number, "-");
      } else {
        result.push(number);
      }

      number = str[i + 1];
    } else {
      number += str[i + 1];
    }
    console.log(number);
  }
  return result;
}
console.log(insertDashEvenNumber(2598468)); // Output: 2-54-6-8 */

/* function calcSum(array) {
  const sum = array.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue);
  }, 0);
  console.log(sum);
}

calcSum([1, 2, 3, 4, 5]);
 */

function removeDuplicate(array) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      if (array[i] !== array[j]) {
        arr.push(array[i]);
        break;
      }
    }
  }
  console.log(arr);
}
removeDuplicate([1, 1, 5, 2]);
