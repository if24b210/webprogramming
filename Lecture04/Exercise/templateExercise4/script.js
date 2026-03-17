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
    let audio = new Audio("sounds/" + note + ".mp3");
    audio.play();
}

// Piano-Tasten im #piano mitElement ID's erstellen
function createPiano() {
    const piano = document.getElementById("piano");
    
    const whiteKeysContainter = document.createElement("div");
    whiteKeysContainter.classList="white-keys";

    keys.forEach(function(k) {
        const keyElement = document.createElement("div");
        keyElement.className = "key";
        keyElement.id = "key" + k.note;  // keyA, keyB,...
        //keyElement.textContent = k.note === "black" ? "#" : k.note;
        keyElement.textContent = k.note;
        
        if(k.type === "black") {
            keyElement.classList.add("black");
        }

        keyElement.addEventListener("click", function() {
            playSound(k.note);
        });
        
        if(k.type === "white") {
            whiteKeysContainter.appendChild(keyElement);
        } else {
            piano.appendChild(keyElement);
        }
    });

    piano.appendChild(whiteKeysContainter);
}

// User Interaction: Keyboard Events -> keydown / active
document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toLowerCase();

    keys.forEach(function(k) {
        if(pressedKey === k.key) {
            playSound(k.note);

            const keyElement = document.getElementById("key" + k.note);
            keyElement.classList.add("active");

            setTimeout(function () {
                keyElement.classList.remove("active");
            }, 100); 
        }
    });
})

function resetPiano() {
    const allKeys = document.querySelectorAll(".key");

    allKeys.forEach(function(key) {
        key.classList.remove("active");
    });

    const noteLine = document.getElementById("note-line");
    noteLine.textContent = "";
}

// JSON Laden
async function loadNotes() {
    try {
        const response = await fetch("notes.json");
        const data = await response.json();

        console.log("Geladene Noten: " , data.notes);

        loadedNotes = data.notes;

        const noteLine = document.getElementById("note-line");
        noteLine.textContent = "Loaded notes from JSON: " + data.notes.join(" - ");
        
        return data.notes;
    } catch(error) {
        console.error("[Error] : Error Noten laden", error);
    }
}

function playLoadedNotes() {
    loadedNotes.forEach(function(note, index) {
        setTimeout(function () {
            playSound(note);
        }, index * 600);
    });
}

createPiano();
loadNotes();
