// element, probability of succes, time
function sleep(element, p, t) {
    return new Promise((resolve, reject) => {
        element.classList.add("pending");
        setTimeout(() => {
            if(Math.random() < p) {
                element.classList.remove("pending");
                element.classList.add("resolved");
                resolve();
            } else {
                element.classList.remove("pending");
                element.classList.add("rejected");
                reject(new Error("unlucky"));
            }
        }, t);
    });
}

function confirm(element) {
    return new Promise((resolve, reject) => {
        element.classList.add("pending");
        var yes = document.createElement('button');
        var no = document.createElement('button');
        yes.innerHTML = 'Yes';
        no.innerHTML = 'No';
        yes.addEventListener("click", (evt) => {
            element.removeChild(yes);
            element.removeChild(no);
            element.classList.remove("pending");
            element.classList.add("resolved");
            resolve();
        });
        no.addEventListener("click", (evt) => {
            element.removeChild(yes);
            element.removeChild(no);
            element.classList.remove("pending");
            element.classList.add("rejected");
            reject();
        });
        element.appendChild(document.createElement('br'));
        element.appendChild(yes);
        element.appendChild(no);
    });
}

function music(element, url) {
    return new Promise((resolve, reject) => {
        element.classList.add("pending");
        var music = document.createElement('audio');
        music.addEventListener('canplay', () => {
            element.classList.remove("pending");
            element.classList.add("resolved");
            resolve();
        });
        music.addEventListener('error', () => {
            element.classList.remove("pending");
            element.classList.add("rejected");
            reject(new Error("Error loading " + url));
        });
        music.setAttribute('controls', '');
        music.src = url;
        element.appendChild(document.createElement('br'));
        element.appendChild(music);
    });
}

function ajax(element, url) {
    return new Promise((resolve, reject) => {
        element.classList.add("pending");
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    element.classList.remove("pending");
                    element.classList.add("resolved");
                    resolve(xhr.responseText.trim());
                } else {
                    element.classList.remove("pending");
                    element.classList.add("rejected");
                    reject(new Error(xhr.status));
                }
            }
        });
        xhr.open('GET', url);
        xhr.send(null);
    });
}

function worker(element) {
    return new Promise((resolve, reject) => {
        element.classList.add("pending");
        var w = new Worker("checkprime.js");
        w.onmessage = function(evt) {
            element.classList.remove("pending");
            element.classList.add("resolved");
            resolve(evt.data);
        };
        w.postMessage(918245165647861);
    });
}
