var timerElement = document.getElementById("timer-stopwatch-container");

var pie = document.createElement("canvas");
pie.class = "google-timer-pie-chart";
pie.hidden = false;
pie.style.position = "relative";
//pie.style.left = "0px";
//pie.style.top = "0px";
pie.style.zIndex = "100";
pie.style.align = 'middle';
pie.style.verticalAlign = 'middle';

var context = pie.getContext('2d');
context.width = 151;
context.height = 151;
context.clearRect(0, 0, pie.width, pie.height);
var circle = false;
if (circle) {
    context.beginPath();
    context.arc(76, 76, 75, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
}
context.beginPath();
context.arc(76, 76, 70, 0, 2 * Math.PI, false);
context.fillStyle = '#00FF00';
context.fill();
timerElement.appendChild(pie);
var fullScreenTimerElement = document.getElementById("act-timer-section");
// console.log(fullScreenTimerElement);
fullScreenTimerElement.appendChild(pie);
var timer = document.getElementsByClassName("act-tim-digit");
//console.log(timerElement);
var bar = document.getElementsByClassName("act-prog-anim")[0];

if (timer.length >= 1) {
    const observer = new MutationObserver(() => chart());
    const config = { attributes: true };
    //, attributeFilter: ["innerText"]
    observer.observe(timer[13], config);
    observer.observe(timer[14], config);
    observer.observe(timer[15], config);
    observer.observe(timer[16], config);
    observer.observe(timer[17], config);
    observer.observe(timer[18], config);
    // setInterval(() => chart(), 1000);
}
function chart() {
    timer = document.getElementsByClassName("act-tim-digit")
    var times = [];
    for (let i = 8; i < timer.length; i++) {
        times.push(timer[i].innerText);
    }
    var timeLeft = ((times[0] + times[1]) * 3600) + ((times[2] + times[3]) * 60) + ((times[4] + times[5]) * 1);
    bar = document.getElementsByClassName("act-prog-anim")[0];
    var total = bar.getAttribute("style").split(":")[1].split("s")[0].substring(1) * 1;
    //console.log(timerElement);
    draw(timeLeft / total);
    // console.log(timeLeft / total);
    //console.log(timerElement);

}
function draw(timePercent) {
    var context = pie.getContext('2d');
    context.clearRect(0, 0, pie.width, pie.height);

    if (circle) {
        context.beginPath();
        context.arc(76, 76, 75, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
    }
    if (timePercent == 1) {
        context.beginPath();
        context.arc(76, 76, 70, 0, 2 * Math.PI, false);
        context.fillStyle = '#00FF00';
        context.fill();
    } else {
        let angle = 2 * Math.PI * (1 - timePercent) + (Math.PI / 2);
        if (timePercent > 0) {
            context.beginPath();
            var r = 255 * Math.min(1, 2 - (timePercent * 2));
            var g = 255 * Math.min(1, timePercent * 2);
            var b = 0;
            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            context.moveTo(76, 76);
            context.arc(76, 76, 70, 3 * Math.PI / 2, Math.PI * 2 - angle);
            context.lineTo(76, 76);
            context.stroke();
            context.fill();
        }
    }


}
