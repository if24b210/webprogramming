let userName: string = "Ana";
let age: number = 25;
let active: boolean = true;

console.log(userName);
console.log(age);
console.log(active);

/*  npm install -g typescript
    tsc --init // pravi tsconfig.json -> initialize Typescript project
    // compile TypeScript Files in filename.js
    tsc filename.ts
*/

/* u JSON fajlu sctrict
    "strict": true
    => To zanci:
        mora type
        nema any
        mora return type
        mora null check
*/

// function: parameter a je number, parameter b je broj, funkcija vraca broj
function add(a: number, b: number) {
    return a + b;
}

console.log(add(2, 3));


/*Interfaces - u skladu sa objektima (week 4) za piano keys.
 Objekti:  note, key,...*/
interface PianoKey{ // ime interface-a
    note: string;   // note mora biti text
    key: string;    // key mora biti tekst
    color: string;
}

// sada dodajem jedan objekat tog tipa
const keyC: PianoKey = { 
    // to znaci keyC je objekat tog tip
    // mora odgovarati Interface-u PianoKey
    note: "D",
    key: "c",
    color: "white"  
};

console.log(keyC.note);
console.log(keyC.key);
console.log(keyC.color);

// Niz objekata (Array)
// Piano Key je ovde niz objekata tipa PianoKey
const keys: PianoKey[] = [
    {note: "C", key: "a", color: "white"},
    {note: "D", key: "s", color: "white"},
    {note: "E", key: "d", color: "white"}
];

// iterate - prodji kroz niz Objekata
keys.forEach((item: PianoKey) => {
    console.log(item.note, item.key, item.color);
})

// DOM i eventListener
// dodaju se tipovi, na primer HTMLInputElement i Event
/*
Napravimo mali primer sa:

- jednim dugmetom u HTML
- jednim paragrafom
TypeScript koji:
- nađe DOM elemente
- doda click event listener
- promeni tekst
*/

/* document.getElementById() moze da vrati:
      element
      ili null

      -> zato pisemo HtmlButtonElemnt | null
*/

const button = document.getElementById("myButton") as HTMLButtonElement | null;
const message = document.getElementById("message") as HTMLParagraphElement | null;

// Event Listener
if (button && message) { // mozda element ne postoji, zato proveravamo
    button.addEventListener("click", () => {
        message.textContent = "Button Clicked";
    })
}