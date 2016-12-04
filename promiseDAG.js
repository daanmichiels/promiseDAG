

function promiseDAG(callbacks, dag) {
    return new Promise((resolve, reject) => {
        var N = callbacks.length;
        var counts = dag.map((x) => x.length);
        var stopped = false;
        var remaining = N;
        var values = [];

        function handleResolution(promise, i, value) {
            values[i] = value;
            console.log(i, "resolved", value);
            if(stopped) {
                return;
            }
            remaining -= 1;
            if(remaining == 0) {
                resolve(values);
            }
            for(let j=0; j<N; ++j) {
                if(counts[j] < 1) {
                    continue;
                }
                if(dag[j].indexOf(i) >= 0) {
                    counts[j] -= 1;
                    if(counts[j] == 0) {
                        var args = []
                        for(let k=0; k<dag[j].length; ++k) {
                            args.push(values[dag[j][k]]);
                        }
                        console.log("Starting", j, "with arguments", args);
                        var promise = callbacks[j].apply(args);
                        promise.then(
                            (value) => { handleResolution(promise, j, value); },
                            (error) => { handleRejection(promise, j, error); });
                    }
                }
            }
        }

        function handleRejection(promise, i, error) {
            console.log("Promise " + i +" rejected.");
            stopped = true;
            reject(error);
        }

        for(let i=0; i<N; ++i) {
            if(counts[i] > 0) {
                continue;
            }
            var promise = callbacks[i]();
            promise.then(
                (value) => { handleResolution(promise, i, value); },
                (error) => { handleRejection(promise, i, error); });
        }
    });
}
