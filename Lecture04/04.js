// create an array of piano keys

const pianoKeys = [
    {note: "C", key: "a"},
    {note: "D", key: "s"},
    {note: "E", key: "d"}
];


pianoKeys.forEach(k => {
    console.log(`${k.key}: ${k.note}`);
});
