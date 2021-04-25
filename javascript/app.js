"use strict"

const fs = require("fs")
const { resolve } = require("path")
const KEY_ENTER = 13
let data = []
let chars = []
let salt  = ""
let masterHash = ""
let authToken = false
function readData() {
    data = JSON.parse(fs.readFileSync("data.json", {encoding: "utf-8"}))
    chars = data[0].general.chars
    salt = data[0].general.salt
    masterHash = data[0].general.masterHash
    authToken = data[0].general.auth  
}
/*
const writeData = new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data)
    fs.writeFile("data.json", jsonData, 'utf8', function (err) {
        if (err) {
            Promise.reject("!!!")
            return console.log("Unable to save to file!")
        }
    
        console.log("The file was saved!")
        Promise.resolve(1977)
    })
})*/

//----------------------------------------------------------------

const generateModule = {

    generatePw(domain, length) {
        if (true) {
            const hashString = masterHash + domain
            const hash = require("crypto").createHmac("sha512", salt).update(hashString).digest("hex")
            let number = parseInt(hash, 16)
            let password = ""
            while (number > 0 && password.length <= length) {
                password += chars[number % chars.length]
                number = number / chars.length
            }
            return password 
        } else {
            //return "Falsches Masterpasswort!"
        }
    }
}

//---------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    
    const elements = {
        //masterpwForm: document.getElementById("masterpassword"),
        domainForm: document.getElementById("domain"),
        generateButton: document.getElementById("generateButton"),
        outputfield: document.getElementById("passwordoutput"),
        length: document.getElementById("length"),
        wrapper: document.getElementById("wrapper"),
        body: document.querySelector("body")
    }

    //let initFile = new Promise((resolve, reject) => { 
    try {
        readData()
        console.log("Datensatz gefunden")
        login()
    } catch (err) {
        if (err.message.substr(0, 6) === "ENOENT"){
            data = [
                {
                general: {
                    salt: "Wetterwachs", 
                    masterHash: "",
                    chars: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#", "!", "'", "§", "$", "%", "&", "/", "(", ")", "=", "?", "{", "[", "]", "}", "+", "*", "~", "-", "_", ".", ":", ",", ";", "@", "€", "<", ">", "|", ""],
                    algorithm: "sha512",
                    auth: false
                },
                domain_list: [
                    {name:"codingame", pwd: ""},
                    {name:"udemy", pwd: ""},
                    {name:"keybr", pwd: ""},
                ]
                }
            ]

            const writeData = new Promise((resolve, reject) => {
                const jsonData = JSON.stringify(data)
                fs.writeFile("data.json", jsonData, 'utf8', function (err) {
                    if (err) {
                        console.log("Unable to save to file!")
                        reject("!!!")
                    }
                
                    console.log("The file was created!")
                    resolve("The file was saved!")
                })
            }).then(()=>{
                console.log("Promise erfüllt");
                readData();
                return Promise.resolve()
            }).then(() => {login()})
            
        } else {
            console.log("Error reading file")
            console.log(err.message)
        }
    }
        
    //})

    function login() {
        console.log("login initialisiert")
        if (masterHash !== "") {

            const divelement3 = document.createElement("div")
            divelement3.classList.add("div")
            divelement3.setAttribute("id", "regularLogin")
            const labelelement3 = document.createElement("label")
            labelelement3.innerText = "Willkommen zurück! \nBitte gib dein Masterpasswort ein:"
            labelelement3.setAttribute("id", "label3")
            const inputelement3 = document.createElement("input")
            inputelement3.setAttribute("type", "text")
            inputelement3.setAttribute("class", "form-controOne")
            inputelement3.setAttribute("id", "inputRegularLogin")
            divelement3.append(labelelement3)
            divelement3.append(inputelement3)
            elements.body.append(divelement3)

            elements.regularLogin = document.getElementById("regularLogin")
            elements.regularLoginText = document.getElementById("label3")
            elements.regularLoginInput = document.getElementById("inputRegularLogin")

            elements.regularLoginInput.addEventListener("keypress", (event) => {
                let loginInput = elements.regularLoginInput.value
                if (event.keyCode === KEY_ENTER) {
                    const loginHash = require("crypto").createHash("sha512").update(loginInput).digest("hex") + ""
                    if(loginHash === masterHash) {
                        elements.regularLogin.classList.add("dnone")
                        elements.wrapper.classList.remove("dnone")
                    } else {
                        elements.regularLoginText.innerText = "Falsches Passwort\n"
                        elements.regularLoginInput.value = ""
                    }
                }
            })

        } else if (authToken === true) {
            console.log("I should be last")
            elements.wrapper.classList.remove("dnone")
        } else {
            const divelement = document.createElement("div")
            divelement.classList.add("div")
            divelement.setAttribute("id", "firstLogin")
            const labelelement = document.createElement("label")
            labelelement.innerText = "Bitte gib dein Masterpasswort ein:"
            const inputelement = document.createElement("input")
            inputelement.setAttribute("type", "text")
            inputelement.setAttribute("class", "form-controOne")
            inputelement.setAttribute("id", "masterAuthStepOne")
            divelement.append(labelelement)
            divelement.append(inputelement)
            elements.body.append(divelement)

            elements.authStepOne = document.getElementById("masterAuthStepOne")
            elements.firstLogin = document.getElementById("firstLogin")
            //console.log(elements.authStepOne)
            elements.authStepOne.addEventListener("keypress", (event) => {                
                let input = elements.authStepOne.value
                if (event.keyCode === KEY_ENTER && input.length > 6) {
                    //console.log("Enter gedrückt")
                    const mPwHash = require("crypto").createHash("sha512").update(input).digest("hex") + ""
                    data[0].general.masterHash = mPwHash
                    //console.log(data[0].general)
                    const writeData2 = new Promise((resolve, reject) => {
                        const jsonData = JSON.stringify(data)
                        fs.writeFile("data.json", jsonData, 'utf8', function (err) {
                            if (err) {
                                console.log("Unable to save to file!")
                                reject("!!!")
                            }
                        
                            console.log("The file was saved!")
                            resolve("The file was saved!")
                        })
                    })
                    
                    writeData2.then(()=>{
                        console.log("Promise erfüllt");
                        readData()
                        resolve()
                    }).then(()=>{
                        elements.firstLogin.classList.add("dnone")

                        const divelement2 = document.createElement("div")
                        divelement2.classList.add("div")
                        divelement2.setAttribute("id", "secondLogin")
                        const labelelement2 = document.createElement("label")
                        labelelement2.innerText = "Bitte wiederhole das Passwort:"
                        labelelement2.setAttribute("id", "label2")
                        const inputelement2 = document.createElement("input")
                        inputelement2.setAttribute("type", "text")
                        inputelement2.setAttribute("class", "form-controOne")
                        inputelement2.setAttribute("id", "masterAuthStepTwo")
                        divelement2.append(labelelement2)
                        divelement2.append(inputelement2)
                        elements.body.append(divelement2)

                        elements.authStepTwo = document.getElementById("masterAuthStepTwo")
                        elements.secondLogin = document.getElementById("secondLogin")
                        elements.labelelement2 = document.getElementById("label2")

                        elements.authStepTwo.addEventListener("keypress", (event) => {
                            if (event.keyCode === KEY_ENTER) {
                                let input2 = elements.authStepTwo.value
                                const mPwHash2 = require("crypto").createHash("sha512").update(input2).digest("hex") + ""
                                if (mPwHash2 === masterHash) {
                                    elements.secondLogin.classList.add("dnone")
                                    elements.wrapper.classList.remove("dnone")
                                }
                                else {
                                    elements.labelelement2.innerText = "Keine übereinstimmung. Bitte erneut eingeben."
                                }
                            }                            
                        })
                    })
                }
            })
        }
    }

    //login()

    elements.generateButton.addEventListener("click", (event) => {
        const domain = elements.domainForm.value
        const length = elements.length.value
        if (domain.length < 1) {
            console.log("keine domain eingegeben")
        } else {
            elements.outputfield.value = generateModule.generatePw(domain, length)
        }
    })
})