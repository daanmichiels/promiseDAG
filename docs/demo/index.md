---
title: promiseDAG demo
layout: default
custom_js:
- demo.js
- promiseDAG.js
---

# promiseDAG demo


This webpage demonstrates the use of promiseDAG visually.
Below you'll find a directed acyclic graph (DAG).
Each of the nodes represents an asynchronous task that needs to be completed.
The lines between tasks indicate interdependencies.

Please look at the source of this page to see the code.
Refresh the page to restart the demo.

<div style="display: flex; flex-direction: column; align-items: center;">
    <div id="dag">
    </div>
    <p style="display: block; text-align: center; width: 36em;">
        The promise <span id="status" style="font-weight: bold;">has not been created yet</span>.
    </p>
</div>

## What you're seeing

This demo page uses `promiseDAG()` to run 10 interdependent tasks
as efficiently as possible.
Each of the nodes in the diagram above represents a task.

- A blue node is a task that has not been started yet.
- A yellow node represents a task that is pending.
- A green node represents a task that was completed successfully (the promise was resolved).
- A red node represents a task that failed (the promise was rejected).


The asynchronous tasks in this demo just consist of waiting,
and then either succeeding (resolving the promise) or failing (rejecting the promise).
The wait is a uniformly chosen timespan between 0 and 4 seconds.
The probability of success of each node is about 93% (to make the chances of the entire
network succeeding about 50%).

The `promiseDAG()` function returns a promise.
The status of this promise is displayed just below the diagram.


## Things to note

Note that the order of execution of the tasks is not fixed.
Which tasks get started when is determined by how fast the dependencies get resolved.
Sometimes a task in the third column is already finished when a task in the first is still pending.

Once a task fails, the promise returned by `promiseDAG()` is rejected and
no further tasks are started.

A naive alternative to using `promiseDAG()` is to topologically sort
the dependency graph, and then complete the tasks sequentially. Because there are 10 tasks
in this demo, each with average duration 2 seconds, this would take 20 seconds on average
to complete all the tasks.
Using `promiseDAG()`, the tasks get completed much quicker.

