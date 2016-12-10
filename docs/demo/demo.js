function exampleTask(element, p, t) {
    return new Promise((resolve, reject) => {
        element.setAttribute('fill', '#ff0');
        setTimeout(() => {
            if(Math.random() < p) {
                element.setAttribute('fill', '#0f0');
                resolve();
            } else {
                element.setAttribute('fill', '#f00');
                reject(new Error("unlucky"));
            }
        }, t);
    });
}

function createCanvas(width, height, containerId) {
    var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    canvas.setAttribute('width', '36em');
    canvas.setAttribute('height', '26em');
    document.getElementById("dag").appendChild(canvas);    
    return canvas;
}

function createNode(canvas, x, y) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '4em');
    rect.setAttribute('height', '4em');
    rect.setAttribute('rx', '0.6em');
    rect.setAttribute('ry', '0.6em');
    rect.setAttribute('fill', '#66f');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('x', (x-2) + "em");
    rect.setAttribute('y', (y-2) + "em");
    canvas.appendChild(rect);
    return rect;
}

function createConnection(canvas, fromPos, toPos) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', fromPos.x + "em");
    line.setAttribute('y1', fromPos.y + "em");
    line.setAttribute('x2', toPos.x + "em");
    line.setAttribute('y2', toPos.y + "em");
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-width', "0.1em");
    line.setAttribute('stroke-width', "0.1em");
    canvas.appendChild(line);
    return line;
}

function start() {
    var canvas = createCanvas();
    var positions = [
        {"x": 3, "y": 8},
        {"x": 3, "y": 18},
        {"x": 13, "y": 3},
        {"x": 13, "y": 13},
        {"x": 13, "y": 23},
        {"x": 23, "y": 8},
        {"x": 23, "y": 18},
        {"x": 33, "y": 3},
        {"x": 33, "y": 13},
        {"x": 33, "y": 23},
        ];
    var dependencies = [[],
                        [],
                        [0],
                        [1],
                        [1],
                        [0,2,3],
                        [3,4],
                        [5],
                        [5,6],
                        [6]];

    // draw lines
    for(let i=0; i<dependencies.length; ++i) {
        for(let j=0; j<dependencies[i].length; ++j) {
            createConnection(canvas, positions[dependencies[i][j]], positions[i]);
        }
    }
    // draw nodes
    var nodes = [];
    for(var i=0; i<positions.length; ++i) {
        nodes.push(createNode(canvas, positions[i].x, positions[i].y))
    }
    // create tasks
    var tasks = [];
    for(let i=0; i<positions.length; ++i) {
        tasks.push(() => {
            return exampleTask(nodes[i], 0.933, 4000*Math.random());
        });
    }

    // run!
    var p = promiseDAG(tasks, dependencies);
    // show promise's status
    document.getElementById("status").innerHTML = "is pending";
    p.then(() => {document.getElementById("status").innerHTML = "has been resolved";},
        () => {document.getElementById("status").innerHTML = "has been rejected";});
}

document.addEventListener("DOMContentLoaded", start);