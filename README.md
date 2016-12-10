# promiseDAG

JavaScript has the method [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
that allows one to create a promise that resolves when all of a list of promises have been resolved.
This project offers a more powerful version that roughly speaking allows one to specify

- a list of promises, and
- dependencies between them,

and create a single promise that resolves when the entire network of promises has been resolved.

## How to use

The project's code is a single function (`promiseDAG`) in a single file (`promiseDAG.js`).
Just add this file to your JavaScript project, and call the `promiseDAG` function.

An illustrated explanation of what `promiseDAG` does can be found in [documentation.md](documentation.md).

## License

This project is released under the LGPL-3.0.
