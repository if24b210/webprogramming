function playSound(note) {
    console.log("Playing note:", note);

    let audio = new Audio(`sounds/${note}.mp3`);
    audio.play();

    const key = document.getElementById("key" + note);
    if (key) {
        key.classList.add("active");

        setTimeout(function () {
            key.classList.remove("active");
        }, 200); // Remove the "active" class after 200 ms = in sec = 0.2 sec
    }
}

// Keyboard map: for all keys (A - C S - D D - E F - F G - G H - A J - B)
const keyMap = {
    a: "C",
    w: "Cis",
    s: "D",
    e: "Dis",
    d: "E",
    f: "F",
    t: "Fis",
    g: "G",
    z: "Gis",
    h: "A",
    u: "Ais",
    j: "B",
};

// for click events
const all_noten = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "Ais", "B"];

// Key Events: use mapping, no code repetition
all_noten.forEach(function (note) {
    document.getElementById("key" + note).addEventListener("click", function () {
        console.log("Clicked on note:", note);
        playSound(note);
    });
});


// Keyboard events -> now with const value of keyMap
document.addEventListener("keydown", function (event) {
    console.log("Keydown event-pressed:", event.key);

    const note = keyMap[event.key.toLowerCase()]; // upper to lower case !
    if (note) {
        console.log("[keydown]Mapped to note:", note);
        playSound(note);
    }
});

document.addEventListener("keyup", function (event) {
    console.log("Keyup event-pressed:", event.key);

    const note = keyMap[event.key.toLowerCase()];
    if (note) {
        console.log("[keyup] Mapped to note:", note);
    }
});

/*
// Click Events - event listener for piano keys
document.getElementById("keyC").addEventListener("click", function () {
    playSound("C");
});
document.getElementById("keyD").addEventListener("click", function () {
    playSound("D");
});
document.getElementById("keyE").addEventListener("click", function () {
    playSound("E");
});
document.getElementById("keyF").addEventListener("click", function () {
    playSound("F");
});
document.getElementById("keyG").addEventListener("click", function () {
    playSound("G");
});
document.getElementById("keyA").addEventListener("click", function () {
    playSound("A");
});
document.getElementById("keyB").addEventListener("click", function () {
    playSound("B");
});
*/
