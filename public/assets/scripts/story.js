// HARDCODED STUFF: TEXT, ROOMS, ETC.


// STANDARD CONSTANTS

var std_bg = "assets/images/rooms/ThreeDoorRoomBackground.svg";

let leftUnlocked = new Door("left");
let centreUnlocked = new Door("centre");
let rightUnlocked = new Door("right");

// DEFINING ROOMS
// text: text, style positioning, order, clickable, special function
// prop: name, img, inspect_img, x, y, w, h
// room: id, backgroundSrc, text, doors, props, special function
// input: id, img, type, input length, xPos, yPos, width, height, password

let Text0_1 = new Text("You wake up in an empty room.", "top: 10%", 0, false);
let Text0_2 = new Text("Click me.", "", 0, true); 
let Text0_3 = new Text("After click", "top: 50%", 1, false);
let Room0 = new Room(0, "assets/images/rooms/Room0.svg", [Text0_1, Text0_2, Text0_3], ["", centreUnlocked, ""]);

let lockedKeyDoor = new Door("centre", true, "key 1");
let lockedNumDoor = new Door("centre", true)
let key1 = new Prop("key 1", "assets/images/Key.svg", "assets/images/KeyInspect.svg", 727, 2178, 185, 169);
let key2 = new Prop("key 2", "assets/images/Key.svg", "assets/images/KeyInspect.svg", 400, 1500, 185, 169);
let key3 = new Prop("key 3", "assets/images/Key.svg", "assets/images/KeyInspect.svg", 500, 200, 185, 169);

let Room1 = new Room(1, "assets/images/rooms/Room1.svg", document.getElementsByClassName("Room1"), [leftUnlocked, lockedKeyDoor, rightUnlocked], {"key 1" : key1, "key 2" : key2, "key 3" : key3});

let Room2 = new Room(2, "assets/images/rooms/Room2.svg", [], [leftUnlocked, lockedNumDoor, rightUnlocked], {}, roomTwo);

let Room3 = new Room(3, "assets/images/rooms/Room3.svg", [], [leftUnlocked, lockedNumDoor, rightUnlocked], {}, roomThree);

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
    console.log(code);
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
