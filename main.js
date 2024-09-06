const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
const _orange = "orange";
const orangechars = base64chars.map((c, i) => _orange[(i >> 4) % 6] + _orange[(i >> 2) % 6] + _orange[i % 6]);

let fconv = {};
let bconv = {};
base64chars.forEach((c, i) => {
    fconv[c] = orangechars[i];
    bconv[orangechars[i]] = c;
});

function base64encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function base64decode(str) {
    return decodeURIComponent(escape(atob(str)));
}

function wordchars() {
    return Math.floor(Math.random() * Math.random() * 6 - Math.random() * Math.random() * 3 + 5);
}

function sentencewords() {
    return Math.floor(Math.random() * Math.random() * 5 - Math.random() * Math.random() * 3 + 4);
}

function orange(str) {
    let raw = base64encode(str).split("").map(c => fconv[c]).join("").split("");

    // split words
    let words = [];
    while (raw.length) {
        let count = wordchars();
        words.push(raw.splice(0, count).join(""));
    }

    // split sentences
    let sentences = [];
    while (words.length) {
        let count = sentencewords();
        sentences.push(words.splice(0, count).join(" "));
    }

    return sentences.join(", ");;
}

function deorange(str) {
    let n = str.toLowerCase().replace(/[^orange]/g, "").match(/.{3}/g) || "";
    let m = n.map(c => bconv[c]).join("");
    return base64decode(m);
}

function generate() {
    var text = document.getElementById("text");
    var n = document.getElementById("1").value;

    if (n.length === 0) {

    } else {
        while (text.hasChildNodes()) {
            text.removeChild(text.firstChild);
        }
        var t = document.createElement("p");
        t.textContent = orange(n);
        document.getElementById("text").appendChild(t);
    }
}

function degenerate() {
    var text = document.getElementById("text");
    var n = document.getElementById("1").value;

    if (n.length === 0) {

    } else {
        while (text.hasChildNodes()) {
            text.removeChild(text.firstChild);
        }
        var t = document.createElement("p");
        t.textContent = deorange(n);
        document.getElementById("text").appendChild(t);
    }
}
