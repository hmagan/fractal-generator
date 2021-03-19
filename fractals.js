let canvas = document.getElementById("canvas");
canvas.height = 1800;
canvas.width = 1800;
canvas.style.width = "900px";
canvas.style.height = "900px";

let context = document.getElementById("canvas").getContext("2d");
context.scale(2, 2);

function setFillColor(color){
    context.fillStyle = color;
}

function setStrokeColor(color){
    context.strokeStyle = color;
}

function drawCircle(radius, x, y){
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2); //450, 450 == center
    context.stroke();
}

function recursiveCircle(radius, x, y){
    if(radius > 2){
        drawCircle(radius, x, y);
        radius *= 0.75;
        recursiveCircle(radius, x, y);
    }
}

function circleFractal(radius, x, y){
    drawCircle(radius, x, y);
    if(radius > 4){
        circleFractal(radius / 2, x - radius, y);
        circleFractal(radius / 2, x + radius, y);
        circleFractal(radius / 2, x, y + radius);
        circleFractal(radius / 2, x, y - radius);
    }
}

function drawLine(x1, y1, x2, y2){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function eraseLine(x1, y1, x2, y2){
    setStrokeColor("#FFFFFF");
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawFilledTriangle(a_x, a_y, b_x, b_y, c_x, c_y){
    context.beginPath();
    context.moveTo(a_x, a_y);
    context.lineTo(b_x, b_y);
    context.lineTo(c_x, c_y);
    context.closePath();
    context.fill();
}

function drawEmptyTriangle(a_x, a_y, b_x, b_y, c_x, c_y){
    context.beginPath();
    context.moveTo(a_x, a_y);
    context.lineTo(b_x, b_y);
    context.lineTo(c_x, c_y);
    context.closePath();
    context.stroke();
}

function sierpinskiTriangle(a_x, a_y, b_x, b_y, c_x, c_y, iterations){
    drawFilledTriangle(a_x, a_y, b_x, b_y, c_x, c_y);
    if(iterations > 0){
        iterations--;
        setFillColor("#000000");
        //dubious math below
        sierpinskiTriangle(a_x, a_y, a_x + (b_x - a_x) / 2, (b_y + a_y) / 2, a_x + (c_x - a_x) / 2, c_y, iterations);
        sierpinskiTriangle((a_x + b_x) / 2, (a_y + b_y) / 2, b_x, b_y, c_x - (c_x - b_x) / 2, (b_y + c_y) / 2, iterations);
        sierpinskiTriangle(b_x, a_y, c_x - (c_x - b_x) / 2, (b_y + c_y) / 2, c_x, c_y, iterations);

        //make hole in the middle of each triangle
        setFillColor("#FFFFFF");
        drawFilledTriangle(a_x + (c_x - a_x) / 2, a_y, c_x - (c_x - b_x) / 2, (b_y + c_y) / 2, a_x + (b_x - a_x) / 2, (b_y + a_y) / 2);
    }
}

function enableSierpinskiTriangleOnClick(){
    let iterations = 0;
    sierpinskiTriangle(100, 700, 450, 100, 800, 700, iterations);

    canvas.addEventListener("click", function(){
        iterations++;
        sierpinskiTriangle(100, 700, 450, 100, 800, 700, iterations);
    });
}

function drawTree(x1, y1, x2, y2, iteration) {
    drawLine(x1, y1, x2, y2);
    if(iteration > 0){
        drawTree(x2, y2, x2 - 100, y2 - 100, iteration - 1);
        drawTree(x2, y2, x2 + 100, y2 - 100, iteration - 1);
    }
}

function enableTreeOnClick(){
    let iterations = 0;
    drawTree(450, 900, 450, 800, iterations);

    canvas.addEventListener("click", function(){
        iterations++;
        setFillColor("#FFFFFF");
        context.fillRect(0, 0, 900, 900);
        drawTree(450, 900, 450, 800, iterations);
    });
}

//incomplete
// function kochSnowflake(lines, curr, iteration){
//     if(curr === 0){
//         setStrokeColor("#000000");
//         drawEmptyTriangle(180, 620, 450, 170, 730, 620);
//         console.log(lines);
//         console.log(curr);
//         kochSnowflake(lines, curr + 1, iteration);
//     } else if(curr !== iteration){
//         let newLines = [];
//         for(let i = 0; i < lines.length; i++){
//             let a = {
//                 x: 0,
//                 y: 0
//             };
//             let b = {
//                 x: 0,
//                 y: 0
//             };
//             let c = {
//                 x: 0,
//                 y: 0
//             };
//             switch(lines[i][4]){
//                 case 1:
//                     a.x = lines[i][0] + (1/3) * (lines[i][2] - lines[i][0]);
//                     a.y =  lines[i][1];
//                     b.x = lines[i][0] + (2/3) * (lines[i][2] - lines[i][0]);
//                     b.y = lines[i][3];
//                     c.x = (a.x + b.x) / 2;
//                     c.y = a.y + (1/3) * (lines[i][2] - lines[i][0]);
//                     newLines.push([a.x, a.y, c.x, c.y]);
//                     newLines.push([b.x, b.y, c.x, c.y]);
//                     break;
//                 case 2:
//                     // a.x = lines[i][0] + (1/3) * (lines[i][2] - lines[i][0]);
//                     // a.y =  lines[i][1];
//                     // b.x = lines[i][0] + (2/3) * (lines[i][2] - lines[i][0]);
//                     // b.y = lines[i][3];
//                     // c.x = (a.x + b.x) / 2;
//                     // c.y = a.y + (1/3) * (lines[i][2] - lines[i][0]);
//                     break;
//                 case 3:
//                     // a.x = lines[i][0] + (1/3) * (lines[i][2] - lines[i][0]);
//                     // a.y =  lines[i][1];
//                     // b.x = lines[i][0] + (2/3) * (lines[i][2] - lines[i][0]);
//                     // b.y = lines[i][3];
//                     // c.x = (a.x + b.x) / 2;
//                     // c.y = a.y + (1/3) * (lines[i][2] - lines[i][0]);
//                     break;
//                 default: 
//                     console.log("ERROR: Missing line type.");
//             }
    
//             setStrokeColor("#000000");
//             drawEmptyTriangle(a.x, a.y, b.x, b.y, c.x, c.y);
//             //erase base line
//             eraseLine(a.x, a.y, b.x, b.y);
//         }
//         console.log(newLines);
//         console.log(curr);
//         kochSnowflake(newLines, curr + 1, iteration);
//     }
// }
// kochSnowflake([[180, 620, 450, 170, 3], [450, 170, 730, 620, 2], [180, 620, 730, 620, 1]], 0, 2);

function drawVicsekCrossFractal(iterations){
    if(iterations <= 1){
        context.fillRect(300, 0, 300, 300);
        context.fillRect(0, 300, 300, 300);
        context.fillRect(600, 300, 300, 300);
        context.fillRect(300, 600, 300, 300);
        context.fillRect(300, 300, 300, 300);
    } else {
        drawVicsekCrossFractal(iterations - 1);

        let data = context.getImageData(0, 0, 1800, 1800);

        if(iterations != 2){
            context.scale(3 / 0.5, 3 / 0.5);
        }

        //reset canvas
        setFillColor("#FFFFFF");
        context.fillRect(0, 0, 900, 900);

        let newCanvas = document.createElement("canvas");
        newCanvas.width = data.width;
        newCanvas.height = data.height;

        newCanvas.getContext("2d").putImageData(data, 0, 0);

        context.scale(0.5 / 3, 0.5 / 3);

        context.drawImage(newCanvas, 1800, 0);
        context.drawImage(newCanvas, 0, 1800);
        context.drawImage(newCanvas, 1800, 1800);
        context.drawImage(newCanvas, 3600, 1800);
        context.drawImage(newCanvas, 1800, 3600);
    }
}

//not working for some reason
function enableVicsekCrossFractalOnClick(){
    let iterations = 1;
    drawVicsekCrossFractal(iterations);

    canvas.addEventListener("click", function(){
        iterations++;
        drawVicsekCrossFractal(iterations);
    });
}

enableVicsekCrossFractalOnClick();