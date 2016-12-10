onmessage = function(e) {
    N = e.data;
    if(N<2) {
        postMessage(false);
        close();
        return;
    }
    for(let i=2; i*i<=N; ++i) {
        if(N%i == 0) {
            postMessage(false);
            close();
            return;
        }
    }
    postMessage(true);
    close();
    return;
}
