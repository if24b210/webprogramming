"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const keys = [
    { note: "C", key: "a", type: "white" },
    { note: "Cis", key: "w", type: "black" },
    { note: "D", key: "s", type: "white" },
    { note: "Dis", key: "e", type: "black" },
    { note: "E", key: "d", type: "white" },
    { note: "F", key: "f", type: "white" },
    { note: "Fis", key: "t", type: "black" },
    { note: "G", key: "g", type: "white" },
    { note: "Gis", key: "z", type: "black" },
    { note: "A", key: "h", type: "white" },
    { note: "Ais", key: "u", type: "black" },
    { note: "B", key: "j", type: "white" }
];
let loadedNotes = [];
function playSound(note) {
    const audio = new Audio("sounds/" + note + ".mp3");
    audio.play();
}
// Piano-Tasten im #piano mit Element IDs erstellen
function createPiano() {
    const piano = document.getElementById("piano");
    if (!piano) {
        return;
    }
    const whiteKeysContainer = document.createElement("div");
    whiteKeysContainer.className = "white-keys";
    keys.forEach(function (k) {
        const keyElement = document.createElement("div");
        keyElement.className = "key";
        keyElement.id = "key" + k.note;
        keyElement.textContent = k.note;
        if (k.type === "black") {
            keyElement.classList.add("black");
        }
        keyElement.addEventListener("click", function () {
            playSound(k.note);
        });
        if (k.type === "white") {
            whiteKeysContainer.appendChild(keyElement);
        }
        else {
            piano.appendChild(keyElement);
        }
    });
    piano.appendChild(whiteKeysContainer);
}
// User Interaction: Keyboard Events
document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toLowerCase();
    keys.forEach(function (k) {
        if (pressedKey === k.key) {
            playSound(k.note);
            const keyElement = document.getElementById("key" + k.note);
            if (keyElement) {
                keyElement.classList.add("active");
                setTimeout(function () {
                    keyElement.classList.remove("active");
                }, 100);
            }
        }
    });
});
function resetPiano() {
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach(function (key) {
        key.classList.remove("active");
    });
    const noteLine = document.getElementById("note-line");
    if (noteLine) {
        noteLine.textContent = "";
    }
}
// JSON laden
function loadNotes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("notes.json");
            const data = yield response.json();
            console.log("Geladene Noten:", data.notes);
            loadedNotes = data.notes;
            const noteLine = document.getElementById("note-line");
            if (noteLine) {
                noteLine.textContent = "Loaded notes from JSON: " + data.notes.join(" - ");
            }
            return data.notes;
        }
        catch (error) {
            console.error("[Error]: Error Noten laden", error);
        }
    });
}
function playLoadedNotes() {
    loadedNotes.forEach(function (note, index) {
        setTimeout(function () {
            playSound(note);
        }, index * 600);
    });
}
createPiano();
loadNotes();
//# sourceMappingURL=script.js.map