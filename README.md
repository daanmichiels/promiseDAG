# promiseDAG

JavaScript has the method [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
that allows one to create a promise that resolves when all of a list of promises have been resolved.
This project offers a more powerful version that roughly speaking allows one to specify

- a list of promises, and
- dependencies between them,

and create a single promise that resolves when the entire network of promises has been resolved.
