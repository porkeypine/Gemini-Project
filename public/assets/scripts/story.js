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
const Text1_1 = new Text("You enter the next room and the door shuts behind you. \nThis room is exactly the same as the previous one, \nbut there is a key on the floor you can pick up.", "top:28%", 0, false, "displayNextText");
// BUGGY: can't pick up the key before the text all disappears
const Text1_2 = new Text("You figure you can also try the door behind you.", "top:40%", 1, false);
var Room1 = new Room(1, "assets/images/rooms/Room1.svg", [Text1_1, Text1_2], [leftUnlocked, lockedKeyDoor, rightUnlocked], {"key 1" : key1});

const lockedDoor = new Door("centre", true);

const Text2_1 = new Text("This room is as sparse and empty as the ones before, \nexcept for the keypad by the door. \nEverything you need is already here.", "top: 28%", 0, false, "displayNextText");
const Text2_2 = new Text("But... could you have missed out something?", "top: 80%", 1, false);
const morsePaper = new Prop('morsePaper', 'assets/images/MorseCodePaper.svg', 'assets/images/MorseCodePaperInspect.svg', 727, 2178, 300, 134);
var Room2 = new Room(2, "assets/images/rooms/Room2.svg", [Text2_1, Text2_2], [leftUnlocked, lockedDoor, rightUnlocked], {}, roomTwo);

var Room3 = new Room(3, "assets/images/rooms/Room3.svg", [], ["", lockedDoor, ""], {}, roomThree);

const cloth = new Prop('cloth', 'assets/images/Cloth.svg', 'assets/images/Cloth.svg', 800, 2100, 260, 260);
var Room4 = new Room(4, std_bg, [], ["", lockedDoor, ""], {'cloth' : cloth}, roomFour);

const lockedGlovesDoor = new Door("centre", true, "gloves");
const gloves = new Prop("gloves", "assets/images/Gloves.svg", "assets/images/Gloves.svg", 1000, 2000, 260, 260);
var Room5 = new Room(5, std_bg, [], ["", lockedGlovesDoor, ""], {"gloves" : gloves}, roomFive);

// DEFINING REACHABLE ROOMS 
Room0.reachableRooms = ["", Room1, "", ""];
Room1.reachableRooms = ["", Room2, "", Room0];
Room2.reachableRooms = ["", Room3, "", Room1];
Room3.reachableRooms = ["", Room4, "", Room2];
Room4.reachableRooms = ["", Room5, "", Room3];
Room5.reachableRooms = ["", Room0, "", Room4];

// HARDCODING STUFF
function roomTwo() {
    var numPad = new Inputs("numPad", "", "number", 6, 1553, 1348, 120, 165, "61283");
    var pad = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    pad.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/Keypad.svg');
    pad.setAttributeNS('', 'id', 'pad');
    pad.setAttributeNS('', 'x', numPad.xPos);
    pad.setAttributeNS('', 'y', numPad.yPos);
    pad.setAttributeNS('', 'width', numPad.width);
    pad.setAttributeNS('', 'height', numPad.height);
    document.getElementById('itemsInRoom').appendChild(pad);
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
            console.log("wrong");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeypadInspectError.svg');
        }
    }
    background.addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', 'hide');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
        inspectProp.setAttributeNS('', 'class', 'hide');
        pad.setAttributeNS('', 'class', '');
        inspectProp.removeEventListener("click", openNumPad);
    })
}

function roomThree() {
    Room2.props['morsePaper'] = morsePaper;
    console.log(document.getElementById('background'));
    var lightbulb = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
    lightbulb.setAttributeNS('', 'id', 'lightbulb');
    lightbulb.setAttributeNS('', 'width', '100%');
    lightbulb.setAttributeNS('', 'height', '100%');
    lightbulb.setAttributeNS('', 'x', '0');
    lightbulb.setAttributeNS('', 'y', '0');
    document.getElementById('thingsInTheBack').appendChild(lightbulb);
    console.log(document.getElementById('itemsInRoom'));
    var flickering = [1, 1, 1, 2, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 1, 1, 1, 2 , 1, 0, 2];
    //-0 on, 1200 off, -1600 on, 2800 off, - 3200 on, 4400 off, -4800 on, 6000 off, .6400 on, 6800 off, .7200 on, 7600 off, . 8000 on, 8400 off, .9600 on, 10000 off
    //.10400 on, 10800 off, . 11200 on, 11600 off, . 12800 on, 13200 off, .14400 on, 14800 off, .15200 on, 15600 off, . 16000 on, 16400 off, .17600 on, 18000 off,
    //.18400 on, 18800 off, . 19200 on, 19600 off, .20800 on, 21200 off, . 21600 on, 22000 off, -23200 on, 24400 off, -25600 on, 26800 off, - 28000 on, 29200 off,
    //-30400 on, 31600 off, . 32000 on, 32400 off, 33600 start again
    function on() {
        setInterval(function () {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
        }, 33600);
    }

    function off() {
        setInterval(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
        }, 33600);
    }
    function play() {
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 0);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 1200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 1600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 2800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 3200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 4400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 4800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 6000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 6400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 6800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 7200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 7600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 8000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 8400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 9600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 10000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 10400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 10800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 11200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 11600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 12800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 13200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 14400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 14800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 15200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 15600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 16000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 16400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 17600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 18000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 18400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 18800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 19200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 19600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 20800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 21200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 21600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 22000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 23200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 24400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 25600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 26800);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 28000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 29200);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 30400);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 31600);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/LitBulb.svg');
            on();
        }, 32000);
        setTimeout(function() {
            lightbulb.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/UnlitBulb.svg');
            off();
        }, 32400);
    }
    var numPad = new Inputs("numPad", "", "number", 6, 1553, 1348, 120, 165);
    var pad = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    pad.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/Keypad.svg');
    pad.setAttributeNS('', 'id', 'pad');
    pad.setAttributeNS('', 'x', numPad.xPos);
    pad.setAttributeNS('', 'y', numPad.yPos);
    pad.setAttributeNS('', 'width', numPad.width);
    pad.setAttributeNS('', 'height', numPad.height);
    var code;
    pad.addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', '');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeyboardInspect.svg');
        inspectProp.setAttributeNS('', 'class', '');
        inspectProp.addEventListener("click", openNumPad);
    });
    function openNumPad() {
        code = prompt("Enter the passcode: ");
        if (code == "obsession" || code == "Obsession" || code == "OBSESSION") {
            console.log("unlocked");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeyboardInspectUnlocked.svg');
            unlock(1);
        } else {
            console.log("wrong");
            inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/KeyboardInspectError.svg');
        }
    }
    background.addEventListener("click", function() {
        inspector.setAttributeNS('', 'class', 'hide');
        inspectProp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
        inspectProp.setAttributeNS('', 'class', 'hide');
        pad.setAttributeNS('', 'class', '');
        inspectProp.removeEventListener("click", openNumPad);
    })
    document.getElementById('itemsInRoom').appendChild(pad);
    play();
}

var vase = document.createElementNS('http://www.w3.org/2000/svg', 'image');
function clean() {
    console.log(clean);
    switch (vase.getAttributeNS('', 'id')) {
        case 'VaseVeryDirty':
            vase.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/VaseLessDirty.svg');
            vase.setAttributeNS('', 'id', 'VaseLessDirty');
            break;
        case 'VaseLessDirty':
            vase.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/VaseLittleDirty.svg');
            vase.setAttributeNS('', 'id', 'VaseLittleDirty');
            break;
        case 'VaseLittleDirty':
            vase.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/VaseClean.svg');
            vase.setAttributeNS('', 'id', 'VaseClean');
            break;
        case 'VaseClean':
            unlock(1);
            vase.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/VaseButton.svg');
            vase.setAttributeNS('', 'id', 'VaseButton');
    }
}
var clothprop = document.getElementById('cloth');
if (clothprop.x < 1650 && clothprop.x > 1150 && clothprop.y < 1625 && clothprop.y > 1175) {
    clean();
}

function roomFour() {
    // var vase = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    vase.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/images/VaseVeryDirty.svg');
    vase.setAttributeNS('', 'id', 'VaseVeryDirty');
    vase.setAttributeNS('', 'x', '1150');
    vase.setAttributeNS('', 'y', '1175');
    vase.setAttributeNS('', 'width', '500');
    vase.setAttributeNS('', 'height', '900');
    document.getElementById('itemsInRoom').appendChild(vase);
    
}
//BUGGY CLOTH MAKE OPAQUE

function roomFive() {
    function imUncomfortable() {
        console.log(curr.doors[1].locked);
        numberOfTimesClicked++;
        console.log("Clicked door " + numberOfTimesClicked);
        if (numberOfTimesClicked == 1) {
            const textDiv = document.createElement('div');
            textDiv.className = "textContainer";
            textDiv.style = "top: 78%";
            const textPara = document.createElement('p');
            textPara.id = "uncomfortable";
            textPara.innerText = noGloveText[numberOfTimesClicked-1];
            textPara.className = "text";
            textDiv.appendChild(textPara);
            document.body.appendChild(textDiv);
        } else if (numberOfTimesClicked == 2) {
            document.getElementById("uncomfortable").innerText = noGloveText[numberOfTimesClicked-1];
        } else if (numberOfTimesClicked >= 3) {
            document.getElementById("uncomfortable").innerText = noGloveText[numberOfTimesClicked-1];
            unlock(1);
            secondDoor.removeEventListener("click", imUncomfortable);
        } else {
            console.log('zero clicks clicked somehow');
        }
    }

    setTimeout(function(){
        door1.setAttributeNS('', 'x', '1773');
        door1.setAttributeNS('', 'y', '1026');
        door1.setAttributeNS('', 'width', '568');
        door1.setAttributeNS('', 'height', '761');
        var numberOfTimesClicked = 0;
        var noGloveText = ["The idea makes you anxious, \nand you cringe back before you touch the door knob.", "You're really not sure this is a great idea.", "You don't like this, but... well, alright then."];
        // overlay.classList.remove('hide');
        
        secondDoor.addEventListener("click", imUncomfortable);
    }, 300);
}