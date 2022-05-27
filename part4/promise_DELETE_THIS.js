import fetch from 'node-fetch';
// let promise = new Promise(function(resolve, reject) {

//   setTimeout(() => resolve("done"), 1000)
// })

// promise.then(result => console.log(result))

// Delay with a promise
// const delay = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms)
//   })
// }

// delay(3000).then(() => console.log('hi'))

async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("whoops")), 1000)
  });

  try{
    let result = await promise; // wait until the promise resolves (*)
  } catch(err) {
    throw "hi"
  }

  console.log(result); // "done!"
}

function f2() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let x = promise.then(result => {
    console.log(result)
  })

  console.log(x)
}

f();