"use strict";
let userName = "Ana";
let age = 25;
let active = true;
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
function add(a, b) {
    return a + b;
}
console.log(add(2, 3));
// sada dodajem jedan objekat tog tipa
const keyC = {
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
const keys = [
    { note: "C", key: "a", color: "white" },
    { note: "D", key: "s", color: "white" },
    { note: "E", key: "d", color: "white" }
];
// iterate - prodji kroz niz Objekata
keys.forEach((item) => {
    console.log(item.note, item.key, item.color);
});
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
const button = document.getElementById("myButton");
const message = document.getElementById("message");
// Event Listener
if (button && message) { // mozda element ne postoji, zato proveravamo
    button.addEventListener("click", () => {
        message.textContent = "Button Clicked";
    });
}
