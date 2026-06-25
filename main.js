let count = 0;
let list = document.getElementById("list");

document.getElementById("btn-minus").addEventListener("click", function() {
    let stop = document.getElementById("chk-stop").checked;
    if (stop && count <= 0) return;
    count--;
    document.getElementById("counter").innerText = count;
});

document.getElementById("btn-plus").addEventListener("click", function() {
    count++;
    document.getElementById("counter").innerText = count;
});

document.getElementById("btn").addEventListener("click", function() {
    let text = document.getElementById("input").value;
    if (text === "") return;
    let li = document.createElement("li");
    let cb = document.createElement("input");
    cb.type = "checkbox";
    cb.addEventListener("change", function() {
        if (this.checked) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.5";
            list.appendChild(li);
        } else {
            li.style.textDecoration = "";
            li.style.opacity = "";
        }
    });
    li.appendChild(cb);
    li.appendChild(document.createTextNode(" " + text));
    list.appendChild(li);
    document.getElementById("input").value = "";
});

document.querySelectorAll("#list li input[type='checkbox']").forEach(function(cb) {
    cb.addEventListener("change", function() {
        let li = this.parentElement;
        if (this.checked) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.5";
            list.appendChild(li);
        } else {
            li.style.textDecoration = "";
            li.style.opacity = "";
        }
    });
});

function calc(op) {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    let res;
    if (op === "+") res = a + b;
    if (op === "-") res = a - b;
    if (op === "×") res = a * b;
    if (op === "÷") res = b !== 0 ? a / b : "Error";
    document.getElementById("result").innerText = "Result: " + res;
}

document.getElementById("add").addEventListener("click", function() { calc("+"); });
document.getElementById("sub").addEventListener("click", function() { calc("-"); });
document.getElementById("mul").addEventListener("click", function() { calc("×"); });
document.getElementById("div").addEventListener("click", function() { calc("÷"); });

const video = document.getElementById("my-video");
const btnPlayStop = document.getElementById("btn-play-stop");
const volumeSlider = document.getElementById("volume-slider");

btnPlayStop.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        btnPlayStop.innerText = "Stop";
    } else {
        video.pause();
        btnPlayStop.innerText = "Play";
    }
});

volumeSlider.addEventListener("input", function() {
    video.volume = volumeSlider.value;
});

const hoverSound = new Audio("hover-sound.mp3");
const clickSound = new Audio("click-sound.mp3");

document.querySelectorAll("button").forEach(function(btn) {
    btn.addEventListener("mouseenter", function() {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log("Hover sound blocked: ", e));
    });
    
    btn.addEventListener("click", function() {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Click sound blocked: ", e));
    });
});

const main = document.querySelector(".main");
const darkness = document.getElementById("darkness");
const endOfBlocks = document.getElementById("end-of-blocks");
const cards = document.querySelectorAll(".card");

main.addEventListener("scroll", function() {
    let rect = endOfBlocks.getBoundingClientRect();
    
    // JS Parallax for cards
    cards.forEach((card, index) => {
        let speed = 0;
        if (index % 3 === 1) speed = 0.15;  // moves down a bit
        if (index % 3 === 2) speed = -0.15; // moves up a bit
        
        let yPos = main.scrollTop * speed;
        card.style.transform = `translateY(${yPos}px)`;
    });
    let distance = window.innerHeight - rect.top;
    
    if (distance > 0) {
        let calculatedOpacity = distance / 800;
        if (calculatedOpacity > 0.5) calculatedOpacity = 0.5;
        darkness.style.opacity = calculatedOpacity.toFixed(3);
    } else {
        darkness.style.opacity = "0";
    }
    
    // Video Scrubbing
    const adVideo = document.getElementById("ad-video");
    if (adVideo && !isNaN(adVideo.duration)) {
        let maxScroll = main.scrollHeight - main.clientHeight;
        let scrollFraction = main.scrollTop / maxScroll;
        // Clamp fraction to [0, 1]
        if (scrollFraction < 0) scrollFraction = 0;
        if (scrollFraction > 1) scrollFraction = 1;
        
        adVideo.currentTime = adVideo.duration * scrollFraction;
    }
});

// Close Ad Overlay
const adOverlay = document.getElementById("ad-overlay");
const btnAdClose = document.getElementById("btn-ad-close");

if (btnAdClose && adOverlay) {
    btnAdClose.addEventListener("click", function() {
        // 1. Crumble the site
        const elementsToCrumble = document.querySelectorAll(".card, .sidebar, .top-header");
        elementsToCrumble.forEach(el => {
            let randomRot = (Math.random() - 0.5) * 180;
            el.style.setProperty("--fall-rotation", randomRot + "deg");
            let randomDelay = Math.random() * 0.5;
            el.style.animationDelay = randomDelay + "s";
            el.classList.add("crumble-element");
        });

    
        for (let i = 0; i < 100; i++) {
            let clone = adOverlay.cloneNode(true);
            clone.id = "";
            let randomTop = Math.random() * (window.innerHeight - 200);
            let randomLeft = Math.random() * (window.innerWidth - 250);
            clone.style.top = Math.max(0, randomTop) + "px";
            clone.style.left = Math.max(0, randomLeft) + "px";
            clone.style.bottom = "auto";
            clone.style.right = "auto";
            clone.style.opacity = "0";
            clone.style.transform = "scale(0.1)";
            clone.style.transition = "all 5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            document.body.appendChild(clone);
            
            setTimeout(() => {
                clone.style.opacity = "1";
                clone.style.transform = "scale(1)";
            }, 100 + Math.random() * 800);
        }

        if (typeof clickSound !== "undefined") {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    });
}

const colorText = document.getElementById("color-text");
if (colorText) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                colorText.style.color = "#9e3db6";
            } else {
                colorText.style.color = "#555";
            }
        });
    }, {
        threshold: 1.0 
    });
    
    observer.observe(colorText);
}
