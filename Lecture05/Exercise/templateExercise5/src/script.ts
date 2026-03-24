interface PianoKey {
    note: string;
    key: string;
    type: string;
}

interface NotesData {
    notes: string[];
}

const keys: PianoKey[] = [
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

let loadedNotes: string[] = [];

function playSound(note: string): void {
    const audio = new Audio("sounds/" + note + ".mp3");
    audio.play();
}

// Piano-Tasten im #piano mit Element IDs erstellen
function createPiano(): void {
    const piano = document.getElementById("piano") as HTMLDivElement | null;

    if (!piano) {
        return;
    }

    const whiteKeysContainer = document.createElement("div");
    whiteKeysContainer.className = "white-keys";

    keys.forEach(function (k: PianoKey): void {
        const keyElement = document.createElement("div");
        keyElement.className = "key";
        keyElement.id = "key" + k.note;
        keyElement.textContent = k.note;

        if (k.type === "black") {
            keyElement.classList.add("black");
        }

        keyElement.addEventListener("click", function (): void {
            playSound(k.note);
        });

        if (k.type === "white") {
            whiteKeysContainer.appendChild(keyElement);
        } else {
            piano.appendChild(keyElement);
        }
    });

    piano.appendChild(whiteKeysContainer);
}

// User Interaction: Keyboard Events
document.addEventListener("keydown", function (event: KeyboardEvent): void {
    const pressedKey = event.key.toLowerCase();

    keys.forEach(function (k: PianoKey): void {
        if (pressedKey === k.key) {
            playSound(k.note);

            const keyElement = document.getElementById("key" + k.note) as HTMLDivElement | null;

            if (keyElement) {
                keyElement.classList.add("active");

                setTimeout(function (): void {
                    keyElement.classList.remove("active");
                }, 100);
            }
        }
    });
});

function resetPiano(): void {
    const allKeys = document.querySelectorAll(".key");

    allKeys.forEach(function (key: Element): void {
        key.classList.remove("active");
    });

    const noteLine = document.getElementById("note-line") as HTMLParagraphElement | null;
    if (noteLine) {
        noteLine.textContent = "";
    }
}

// JSON laden
async function loadNotes(): Promise<string[] | void> {
    try {
        const response = await fetch("notes.json");
        const data: NotesData = await response.json();

        console.log("Geladene Noten:", data.notes);

        loadedNotes = data.notes;

        const noteLine = document.getElementById("note-line") as HTMLParagraphElement | null;
        if (noteLine) {
            noteLine.textContent = "Loaded notes from JSON: " + data.notes.join(" - ");
        }

        return data.notes;
    } catch (error) {
        console.error("[Error]: Error Noten laden", error);
    }
}

function playLoadedNotes(): void {
    loadedNotes.forEach(function (note: string, index: number): void {
        setTimeout(function (): void {
            playSound(note);
        }, index * 600);
    });
}

createPiano();
loadNotes();