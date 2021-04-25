"use strict"

const fs = require("fs")

const pwmg = [
    {
        general: {
            salt: "Wetterwachs", 
            masterHash: "c17a3ef37eb4298e81b4e309aea144e011ba6f3757de05ae2b9d26dda0e8ab5d0df6b3b686331e5a7a124cc125ef28533806d60e1fb28e0368332a20bc0b4b07",
            chars: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#", "!", "'", "§", "$", "%", "&", "/", "(", ")", "=", "?", "{", "[", "]", "}", "+", "*", "~", "-", "_", ".", ":", ",", ";", "@", "€", "<", ">", "|", ""],
            algorithm: "sha512",
            auth: false
        },
        domain_list: [{name:"codingame", pwd: ""},{name:"udemy", pwd: ""},{name:"keybr", pwd: ""},]
    }
]

const jsonData = JSON.stringify(pwmg)

fs.writeFile("data.json", jsonData, 'utf8', function (err) {
    if (err) {
        return console.log(err)
    }

    console.log("The file was saved!")
})