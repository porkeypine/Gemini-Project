// INITIALISATION: CLASS AND CONSTANT VARIABLE DECLARATIONS

class Room {
    constructor(id = "-1", backgroundSrc = "", text = [], doors = [], props = {}) {
        this.id = id;
        this.backgroundSrc = backgroundSrc;
        this.text = text;
        // listed in the order of left, centre, right, back
        this.reachableRooms = []; 
        // iff there's a reachable room for left/centre/right, there will be doors listed in order of left/centre/right
        this.doors = doors;
        this.props = props;
    }
}

class Door {
    constructor(location = "", locked = false, unlockCondition = "") {
        this.location = location; // "left", "centre", "right"
        this.locked = locked;
        this.unlockCondition = unlockCondition; // format: name of item or some numerical combination like "28304"; consider using arrow functions instead?
    }
}

class Text {
    constructor(text = "", order = 0, clickable = false) {
        this.text = text;
        this.order = order; // order to display in the 
        this.clickable = clickable;
    }
}

class Prop {
    constructor(name = "unknown", img = "", inspect_img = "", x = 0, y = 0, height = 0, width = 0) {
        this.name = name;
        this.img = img;
        this.inspect_img = inspect_img;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

var inventory = {};

// STANDARD STUFF (CONSTANTS)
  
var std_bg = "assets/Images/Rooms/ThreeDoorRoomBackground.svg";

let leftUnlocked = new Door("left");
let centreUnlocked = new Door("centre");
let rightUnlocked = new Door("right");


// FROM HTML 

let firstDoor = document.getElementById("firstDoor");
let firstDoorAjar = document.getElementById("firstDoorAjar");
let door0 = document.getElementById("door0");
let secondDoor = document.getElementById("secondDoor");
let secondDoorAjar = document.getElementById("secondDoorAjar");
let door1 = document.getElementById("door1");
let thirdDoor = document.getElementById("thirdDoor");
let thirdDoorAjar = document.getElementById("thirdDoorAjar");
let door2 = document.getElementById("door2");
let backDoor = document.getElementById("backDoor");
let currentRoom = document.getElementById("currentRoom");
let background = document.getElementById("background");

//slots are spaces, items are the items (images) in inventory
let slot0 = document.getElementById("slot0");
let slot1 = document.getElementById("slot1");
let slot2 = document.getElementById("slot2");
let slot3 = document.getElementById("slot3");
let slot4 = document.getElementById("slot4");
let slot5 = document.getElementById("slot5");
//erm gotta see if I need these
let item0 = document.getElementById("item0");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let item4 = document.getElementById("item4");
let item5 = document.getElementById("item5");
let pocket = document.getElementById("inventory");


// DEFINING ROOMS

let Room0 = new Room(0, "assets/Images/Rooms/OneDoorBackground.svg", document.getElementsByClassName("Room0"), ["", centreUnlocked, ""]);
// room: id, backgroundSrc, text, doors, props
let lockedKeyDoor = new Door("right", true, "key 1")
let key1 = new Prop("key 1", "assets/Images/Key.svg", "assets/images/key.svg", 727, 2178, 185, 169);
// prop: name, img, inspect_img, x, y, w, h
let Room1 = new Room(1, std_bg, document.getElementsByClassName("Room1"), [leftUnlocked, centreUnlocked, lockedKeyDoor], {"key 1": key1});
let Room2 = new Room(2, std_bg, [], [leftUnlocked, centreUnlocked, rightUnlocked]);
let Room3 = new Room(3, std_bg, [], [leftUnlocked, centreUnlocked, rightUnlocked]);

Room0.reachableRooms = ["", Room1, "", ""];
Room1.reachableRooms = ["", "", Room2, Room0];
Room2.reachableRooms = [Room3, "", "", Room1];
Room3.reachableRooms = [Room1, Room0, "", Room2];


let curr = Room0;
update(Room0);


// TRAVELLING 
// for unlocked doors, just go straight through on click
if (!curr.doors[0].locked) {
    firstDoor.addEventListener("click", function() {
        update(curr.reachableRooms[0]);
    });
}
if (!curr.doors[1].locked) {
    secondDoor.addEventListener("click", function() {
        update(curr.reachableRooms[1]);
    });
}
if (!curr.doors[2].locked) {
    thirdDoor.addEventListener("click", function() {
        update(curr.reachableRooms[2]);
    });
}
backDoor.addEventListener("click", function() {
    update(curr.reachableRooms[3]);
});


// INVENTORY AND PROPS
let selectedElement = false;
let offset;

function makeDraggable(evt) {

    var svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            offset = getMousePosition(evt);
            offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
            offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
        }
    }
    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
      }
    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            var coord = getMousePosition(evt);
            selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
            selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
        }
    }
    function endDrag(evt) {
        var coord = getMousePosition(evt);
        if (3600 < coord.x && coord.x < 3900 && 200 < coord.y && coord.y < 2100 && selectedElement) {
            // updating inventory
            var p = selectedElement.id;
            inventory[p] = curr.props[p]; 
            updateInventory();

            // deleting from room
            delete curr.props[p];
            selectedElement.remove();
        }
        
        //if mouse is over door0, check if its carrying the right prop to unlock 
        else if (curr.doors[0].locked && 400 < coord.x && coord.x < 780 && 880 < coord.y && coord.y < 1960 
            && selectedElement) {
            if (selectedElement.id == curr.doors[0].unlockCondition) {
                console.log('yay');
                unlock(0);
            }
        }
        //if mouse is over door1, check if its carrying the right prop to unlock
        else if (curr.doors[1].locked && 1773 < coord.x && coord.x < 2341 && 1026 < coord.y && coord.y < 2341 
            && selectedElement) {
            if (selectedElement.id == curr.doors[1].unlockCondition) {
                console.log('yay');
                unlock(1);
            }
        }
        //if mouse is over door2, check if its carrying the right prop to unlock
        else if (curr.doors[2].locked && 2900 < coord.x && coord.x < 3400 && 880 < coord.y && coord.y < 3400 
            && selectedElement) {
            if (selectedElement.id == curr.doors[2].unlockCondition) {
                console.log('yay');
                unlock(2);
            }
        }
        if (selectedElement.id in inventory) {
            var slot = selectedElement.parentNode.slot
            selectedElement.setAttributeNS('', 'x', '3710');
            selectedElement.setAttributeNS('', 'y', 320 + parseInt(slot) * 310);
            selectedElement.setAttributeNS('', 'width', '280');
            selectedElement.setAttributeNS('', 'height', '280');
        }
            
        selectedElement = false;
    }
}

function unlock(doornum) {
    curr.doors[doornum].locked = false;
    update(curr);
} 

//putInInventory checks for which is the next open slot and adds it in to the first open slot
function updateInventory() {
    var i = 0;
    for (var key in inventory) {
        var item = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        item.setAttributeNS(
            'http://www.w3.org/1999/xlink', 
            'xlink:href', 
            inventory[key].img);
        item.setAttributeNS('', 'class', 'draggable');
        item.setAttributeNS('', 'id', key);
        item.setAttributeNS('', 'x', '3710');
        // var y = 320 + i * 310;
        item.setAttributeNS('', 'y', 320 + i * 310);
        item.setAttributeNS('', 'width', '280');
        item.setAttributeNS('', 'height', '280');
        this['slot' + i].appendChild(item);
        // this['item' + i].setAttributeNS(
        //     'http://www.w3.org/1999/xlink', 
        //     'xlink:href', 
        //     inventory[key].img);
        // this['item' + i].setAttributeNS('', 'class', 'draggable');
        // this['item' + i].setAttributeNS('', 'id', key);
        i++;
    }
}

// removing objects in the inventory 
slot0.addEventListener("dblclick", removeFromInventory());
slot1.addEventListener("click", removeFromInventory());
slot2.addEventListener("click", removeFromInventory());
slot3.addEventListener("click", removeFromInventory());
slot4.addEventListener("click", removeFromInventory());
slot5.addEventListener("click", removeFromInventory());

function removeFromInventory(slot) {
    console.log('remove slot ' + slot);
    var item = this['slot' + slot].firstElementChild;
    delete inventory[item.id];
    item.remove();   
}

//FUNCTIONS FOR TRAVELLING
function update(room) {
    console.log(room);

    // removing old props
    for (var key in curr.props) {
        var p = document.getElementById(key);
        if (p != null) {
            p.remove();
        }
    }

    currentRoom.setAttributeNS('', 'name', room.id);
    background.setAttributeNS(
        'http://www.w3.org/1999/xlink', 
        'xlink:href', 
        room.backgroundSrc);

    // put all props 
    for (var key in room.props) {
        var prop = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        prop.setAttributeNS(
            'http://www.w3.org/1999/xlink', 
            'xlink:href', 
            room.props[key].img);
        prop.setAttributeNS('', 'x', room.props[key].x);
        prop.setAttributeNS('', 'y', room.props[key].y);
        prop.setAttributeNS('', 'width', room.props[key].width);
        prop.setAttributeNS('', 'height', room.props[key].height);
        prop.setAttributeNS('', 'class', 'draggable');
        prop.setAttributeNS('', 'id', room.props[key].name);
        currentRoom.appendChild(prop);
    }

    curr = room;

    if (room.reachableRooms[0] != "" && room.doors[0] != "" && !room.doors[0].locked) {
        door0.setAttributeNS('', 'points', '400,880 773,1022 783,1960 419,2182');
        firstDoor.addEventListener("mouseover", function() {
            firstDoorAjar.setAttributeNS('', 'class', '');
            firstDoorAjar.setAttributeNS('', 'name', room.reachableRooms[0].id);
        });
        firstDoor.addEventListener("mouseout", function() {
            firstDoorAjar.setAttributeNS('', 'class', 'hide');
            firstDoorAjar.setAttributeNS('', 'name', '');
        });
    } else {
        door0.setAttributeNS('', 'points', '');
    }

    if (room.reachableRooms[1] != "" && room.doors[1] != "" && !room.doors[1].locked) {
        door1.setAttributeNS('', 'x', '1773');
        door1.setAttributeNS('', 'y', '1026');
        door1.setAttributeNS('', 'width', '568');
        door1.setAttributeNS('', 'height', '761');
        secondDoor.addEventListener("mouseover", function() {
            secondDoorAjar.setAttributeNS('', 'class', '');
            secondDoorAjar.setAttributeNS('', 'name', room.reachableRooms[1].id);
        });
        secondDoor.addEventListener("mouseout", function() {
            secondDoorAjar.setAttributeNS('', 'class', 'hide');
            secondDoorAjar.setAttributeNS('', 'name', '');
        });
    } else {
        // door1.setAttributeNS('', 'x', '0');
        // door1.setAttributeNS('', 'y', '0');
        door1.setAttributeNS('', 'width', '0');
        door1.setAttributeNS('', 'height', '0');
    }

    if (room.reachableRooms[2] != "" && room.doors[2] != "" && !room.doors[2].locked) {
        door2.setAttributeNS('', 'points', '2591,980 3423,766 3411,2434 2953,2108');
        thirdDoor.addEventListener("mouseover", function() {
            thirdDoorAjar.setAttributeNS('', 'class', '');
            thirdDoorAjar.setAttributeNS('', 'name', room.reachableRooms[2].id);
        });
        thirdDoor.addEventListener("mouseout", function() {
            thirdDoorAjar.setAttributeNS('', 'class', 'hide');
            thirdDoorAjar.setAttributeNS('', 'name', '');
        });
    } else {
        door2.setAttributeNS('', 'points', '');
    }

    if (room.reachableRooms[3] != "") {

        door3.setAttributeNS('', 'x', '1440');
        door3.setAttributeNS('', 'y', '2340');
        door3.setAttributeNS('', 'width', '660');
        door3.setAttributeNS('', 'height', '141');
    } else {
        // door3.setAttributeNS('', 'x', '0');
        // door3.setAttributeNS('', 'y', '0');
        door3.setAttributeNS('', 'width', '0');
        door3.setAttributeNS('', 'height', '0');
    }
}

//FUNCTIONS FOR TRAVELLING END