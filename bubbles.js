const bubblesLimit = 20;
const bubbleTemplate = `
<div class="bubble"></div>
`;

let previousX = 0;
let bubbles = [];
const contextHref = window.location.href;

const bodyHeight = $('body').height();

function generateBubbles() {
    let step = $('body').width() / bubblesLimit;
    let cachedLeft = step;

    for(let i = 0; i < bubblesLimit; i++) {
        let el = $.parseHTML(bubbleTemplate);
        let topIter = bodyHeight;

        $(el).css('left', (cachedLeft + step) + 'px');

        let blueIndex = 255 * Math.random();

        cachedLeft += 80;

        let speed = getRandomInt(1, 6) + Math.random();

        let l =  100 / speed;

        $(el).width(l);
        $(el).height(l);
        $(el).css('background-color', `rgba(${blueIndex}, 255, 255`);


        let interval = setInterval(() => {
            $(el).css('top', topIter);
            topIter -= speed;

            if(topIter < -200) {
                $(el).remove();
                clearInterval(interval);
            }
        }, 5);

        bubbles.push($(el));

        $('body').append(el);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let inter = setInterval(() => {
    generateBubbles();
}, 2000);

$('body').mousemove((e) => {
    let deltaX = previousX - e.pageX;

    previousX = e.pageX;

    let moveDeltaX = deltaX * 0.05;

    for(let i in bubbles) {
        let bubble = bubbles[i];
        bubble.css('left', `+=${moveDeltaX}px`);
    }
});

$(window).blur(function() {
    console.log('bl');
    clearInterval(inter);
    for(let bubble in bubbles) {
        $(bubbles[bubble]).remove();
    }
});

$(window).focus(function() {
    inter = setInterval(() => {
        generateBubbles();
    }, 2000);
});