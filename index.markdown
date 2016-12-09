# promiseDAG

The `promiseDAG()` function makes it easier to work with JavaScript's promises.
It is a generalization of <code>Promise.all</code> to directed acyclic graphcs (DAG's).
The project is <a href="https://github.com/daanmichiels/promiseDAG">hosted on GitHub</a>.
You can see it in action on the <a href="demo/">demo page</a>.


## Promises in JavaScript

In JavaScript, promises are objects that represent the result of an asynchronous operation
that may or may not have completed.
If you are not familiar with promises, here are some good pages to read:

- [Web Fundamentals at Google Developers](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [The Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## Promise.prototype.then()

A promise's `then` method can be used for convenient chaining of promises.
If multiple asynchronous tasks need to be completed sequentially,
with the output of one being fed as input to the next, `Promise.prototype.then()` is ideal.

In the following snippet, three promises are chained (each just sleeps for a little while).

~~~~
// promise that resolves after t milliseconds
// with no value
function sleep(t) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("resolved", t);
			resolve();
		}, t);
	});
}

sleep(3000)
.then((value) => { return sleep(2000); })
.then((value) => { return sleep(1000); })
.then((value) => { console.log("done!"); });
~~~~

In other words, `Promise.prototype.then()` is suited for this kind of situation (time in the diagram goes from left to right):

![sequential](g3876.png)


## Promise.all()

The standard
[`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
in JavaScript constructs a promise from a list (well, iterable) of promises.
The constructed promise satisfies the following properties:

- it gets resolved when all supplied promises have been resolved,
- it gets rejected as soon as one of the supplied promises has been rejected.

In the following snippet, three promises are started at the same time.

~~~~
// promise that resolves after t milliseconds
// with no value
function sleep(t) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("resolved", t);
			resolve();
		}, t);
	});
}

Promise.all([sleep(3000), sleep(2000), sleep(1000)])
.then((value) => { console.log("done!"); });
~~~~

In other words, `Promise.all()` is suited for this kind of situation (all the tasks are started at the same time):

![parallel](g3897.png)


## promiseDAG()

The `Promise.all()` function allows one to efficiently run multiple asynchronous tasks,
all at the same time.
The `promiseDAG()` function generalizes `Promise.all()` to more complicated networks of tasks: it allows the specification of _interdependencies_ between the supplied tasks.

Suppose you're running a music streaming page.
After a user logs in, the following tasks have to be have the following asynchronous tasks:

1. fetch a user's preferences
2. fetch news from the user's preferred feeds
3. buffer the user's preferred music

Each of these tasks is easily implemented as a promise, but we cannot use
`Promise.all()` to execute these tasks simultaneously: before we can fetch the
background image or load the music, we have to know the user's preferences.

~~~~
function fetchPreferences() {
	return fetch('./username/preferences.json', {
		method: 'get'
	});
}

function fetchBackground(image) {
	return fetch('./')
}

~~~~
