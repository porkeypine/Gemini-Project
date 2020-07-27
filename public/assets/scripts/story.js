// HARDCODED STUFF: TEXT, ROOMS, ETC.


// STANDARD CONSTANTS

const std_bg = "assets/images/rooms/OneDoorBackground.svg";

const leftUnlocked = new Door("left");
const centreUnlocked = new Door("centre");
const rightUnlocked = new Door("right");

// DEFINING ROOMS
// text: text, style positioning, order, clickable, special function
// prop: name, img, inspect_img, x, y, w, h
// room: id, backgroundSrc, text, doors, props, special function
// input: id, img, type, input length, xPos, yPos, width, height, password

const Text0_1 = new Text("You open your eyes slowly, groggy with sleep. \nYou're sitting on the floor in an empty, sterile room.\nThere is a single, unmarked door on the opposite wall. \nExcept for the brass door knob, everything is eerily white.", "top: 10%", 0, false);
const Text0_2 = new Text("Get up.", "", 0, true); 
const Text0_3 = new Text("You stand up, blood rushing dizzily away from your head. \nSpots dance in your vision for a moment, \n and you lean back against the wall until you're steady.", "top: 40%", 1, false, "displayNextText");
const Text0_4 = new Text("The door is unlocked.", "top:80%", 2, false);
var Room0 = new Room(0, "assets/images/rooms/Room0.svg", [Text0_1, Text0_2, Text0_3, Text0_4], ["", centreUnlocked, ""]);

const lockedKeyDoor = new Door("centre", true, "key 1");
const key1 = new Prop("key 1", "assets/images/Key.svg", "assets/images/KeyInspect.svg", 727, 2178, 185, 169);
const Text1_1 = new Text("You enter the next room and the door shuts behind you. \nThis room is exactly the same as the previous one, \nbut there is a key on the floor that you decide to pick up.", "top:25%", 0, false, "displayNextText");
const Text1_2 = new Text("\nYou figure that you'd try the door behind you.", "top:50%", 1, false);
var Room1 = new Room(1, "assets/images/rooms/Room1.svg", [Text1_1, Text1_2], [leftUnlocked, lockedKeyDoor, rightUnlocked], {"key 1" : key1});

const lockedNumDoor = new Door("centre", true);
const Text2_1 = new Text("This room is as sparse and empty as the ones before, \nexcept for the keypad by the door. \nEverything you need is already here.", "top: 25%", 0, false, "displayNextText");
const Text2_2 = new Text("But... could you have missed out something?", "top: 80%", 1, false);
var Room2 = new Room(2, "assets/images/rooms/Room2.svg", [Text2_1, Text2_2], [leftUnlocked, lockedNumDoor, rightUnlocked], {}, roomTwo);

var Room3 = new Room(3, "assets/images/rooms/Room3.svg", [], [leftUnlocked, lockedNumDoor, rightUnlocked], {}, roomThree);

// DEFINING REACHABLE ROOMS 
Room0.reachableRooms = ["", Room1, "", ""];
Room1.reachableRooms = ["", Room2, "", Room0];
Room2.reachableRooms = ["", Room3, "", Room1];
Room3.reachableRooms = ["", Room0, "", Room2];

async function sleep(milliseconds) {
    setTimeout(milliseconds);
}

// HARDCODING STUFF
function roomTwo() {
    var numPad = new Inputs("numPad", "", "number", 6, 1553, 1348, 120, 165, "61283");
    var pad = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    pad.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/Keypad.svg');
    pad.setAttributeNS('', 'id', 'pad');
    newInput = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    newInput.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspect.svg');
    pad.setAttributeNS('', 'x', numPad.xPos);
    pad.setAttributeNS('', 'y', numPad.yPos);
    pad.setAttributeNS('', 'width', numPad.width);
    pad.setAttributeNS('', 'height', numPad.height);
    var code;
    pad.addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', '');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspect.svg');
        inspectProp.setAttributeNS('', 'class', '');
        inspectProp.addEventListener("click", openNumPad);
    });
    function openNumPad() {
        code = prompt("Enter the passcode: ");
        if (code == "61283") {
            console.log("unlocked");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspectUnlocked.svg');
            unlock(1);
        } else {
            console.log("wrong wtf try again noob");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspectError.svg');
        }
    }
    document.getElementById('background').addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', 'hide');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
        inspectProp.setAttributeNS('', 'class', 'hide');
        pad.setAttributeNS('', 'class', '');
        inspectProp.removeEventListener("click", openNumPad);
    })
    document.getElementById('itemsInRoom').appendChild(pad);
}

function roomThree() {
    console.log(document.getElementById('background'));
    var lightbulb = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
    lightbulb.setAttributeNS('', 'id', 'lightbulb');
    lightbulb.setAttributeNS('', 'width', '100%');
    lightbulb.setAttributeNS('', 'height', '100%');
    lightbulb.setAttributeNS('', 'x', '0');
    lightbulb.setAttributeNS('', 'y', '0');
    //--- -... ... . ... ... .. --- -. = obsession
    //0 = ., 1 = -, 2 = pause
    document.getElementById('itemsInRoom').appendChild(lightbulb);
    console.log(document.getElementById('itemsInRoom'));
    var flickering = [1, 1, 1, 2, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 1, 1, 1, 2 , 1, 0, 2];
    async function shortpause() {
        sleep(333);
    }
    async function on() {
        lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
    }
    async function off() {
        lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
    }
    async function pause() {
        sleep(999);
    }
    async function play() {
        for (i = 0; i < flickering.length; i++) {
            switch(flickering[i]) {
                case 0:
                    console.log("dot");
                    on().then(sleep(333)).then(off()).then(sleep(333));
                    break;
                case 1:
                    console.log("long");
                    on().then(sleep(999)).then(off()).then(sleep(333));
                    break;
                case 2:
                    console.log("break");
                    sleep(999);
                    break;
            }
            // if (i == flickering.length - 1 && Room3.doors[1].locked) {
            //     i = 0;
            // }
        }
    }
    var numPad = new Inputs("numPad", "", "number", 6, 1553, 1348, 120, 165);
    var pad = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    pad.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/Keypad.svg');
    pad.setAttributeNS('', 'id', 'pad');
    newInput = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    newInput.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspect.svg');
    pad.setAttributeNS('', 'x', numPad.xPos);
    pad.setAttributeNS('', 'y', numPad.yPos);
    pad.setAttributeNS('', 'width', numPad.width);
    pad.setAttributeNS('', 'height', numPad.height);
    var code;
    pad.addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', '');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspect.svg');
        inspectProp.setAttributeNS('', 'class', '');
        inspectProp.addEventListener("click", openNumPad);
    });
    function openNumPad() {
        code = prompt("Enter the passcode: ");
        if (code == "obsession" || code == "Obsession" || code == "OBSESSION") {
            console.log("unlocked");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspectUnlocked.svg');
            unlock(1);
        } else {
            console.log("wrong wtf try again noob");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspectError.svg');
        }
    }
    document.getElementById('background').addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', 'hide');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
        inspectProp.setAttributeNS('', 'class', 'hide');
        pad.setAttributeNS('', 'class', '');
        inspectProp.removeEventListener("click", openNumPad);
    })
    document.getElementById('itemsInRoom').appendChild(pad);
    var i = 0;
    play();
}
