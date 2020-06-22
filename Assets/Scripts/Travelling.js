//every prop has an identification number storing them in an array of ALL props
class prop {
    constructor() {
        this.id = "unknown";
        this.number = -1;
        this.imgsrc = "";
        this.x = 0;
        this.y = 0;
        this.height = 0;
        this.width = 0;
    }
}
let emptyProp = new prop();
emptyProp.id = "unknown";
emptyProp.number = -1;

class Door {
    constructor() {
        //this is p self explanatory
        this.locked = false;
        //name is to be replaced with firstDoor, etc
        this.door = "";
        //only important for checking whether the door is present in the room at all
        this.hasDestination = true;
    }
}

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

let openDoor0 = new Door();
openDoor0.door = firstDoor;
let openDoor1 = new Door();
openDoor1.door = secondDoor;
let openDoor2 = new Door();
openDoor2.door = thirdDoor;

let lockedDoor0 = new Door();
lockedDoor0.door = firstDoor;
lockedDoor0.locked = true;
let lockedDoor1 = new Door();
lockedDoor1.door = secondDoor;
lockedDoor1.locked = true;
let lockedDoor2 = new Door(); 
lockedDoor2.door = thirdDoor;
lockedDoor2.locked = true;

let emptyDoor0 = new Door();
emptyDoor0.door = firstDoor;
emptyDoor0.hasDestination = false;
let emptyDoor1 = new Door();
emptyDoor1.door = secondDoor;
emptyDoor1.hasDestination = false;
let emptyDoor2 = new Door();
emptyDoor2.door = thirdDoor;
emptyDoor2.hasDestination = false;

//unlockCondition[0] carries the prop number of what unlocks door 0 of the current room
class RoomTemplate {
    constructor() {
        this.id = "unknown";
        this.backgroundSrc = "unknown";
        this.props = [emptyProp, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp];
        this.reachableRooms = [];
        this.doors = [emptyDoor0, emptyDoor1, emptyDoor2];
        this.unlockCondition = [-1, -1, -1];
    }
}
let emptyRoom = new RoomTemplate();
emptyRoom.id = -1;
emptyRoom.backgroundSrc = "";
emptyRoom.props = [];
emptyRoom.reachableRooms = [];

let Room0 = new RoomTemplate();
Room0.id = 0;
Room0.backgroundSrc = "assets/images/Rooms/OneDoorBackground.svg";
let key1 = new prop();
key1.id = "key 1";
key1.imgsrc = "assets/images/key.svg";
key1.x = 727;
key1.y = 2178;
key1.width = 185;
key1.height = 169;
key1.number = 0;
Room0.props = [key1, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp];

let Room1 = new RoomTemplate();
Room1.id = 1;
Room1.backgroundSrc = "assets/images/Rooms/ThreeDoorRoomBackground.svg";
let key2 = new prop();
key2.id = "key 2";
key2.x = 727;
key2.y = 2178;
key2.width = 185;
key2.height = 169;
key2.number = 1;
Room1.props = [key2, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp];

let Room2 = new RoomTemplate();
Room2.id = 2;
Room2.backgroundSrc = "assets/images/Rooms/ThreeDoorRoomBackground.svg";

let Room3 = new RoomTemplate();
Room3.id = 3;
Room3.backgroundSrc = "assets/images/Rooms/ThreeDoorRoomBackground.svg";

Room0.reachableRooms = [emptyRoom, Room1, emptyRoom, emptyRoom];
Room0.doors = [emptyDoor0, openDoor1, emptyDoor2];
Room1.reachableRooms = [Room3, Room2, emptyRoom, Room0];
Room1.doors = [openDoor0, lockedDoor1, emptyDoor2];
Room1.unlockCondition[1] = 1
Room2.reachableRooms = [emptyRoom, Room0, emptyRoom, Room1];
Room2.doors = [openDoor0, openDoor1, openDoor2];
Room3.reachableRooms = [Room1, Room0, emptyRoom, Room2];
Room3.doors = [openDoor0, openDoor1, openDoor2];

let openDoors = [openDoor0, openDoor1, openDoor2];
let lockedDoors = [lockedDoor0, lockedDoor1, lockedDoor2];

//index of prop is its number, ie key1.number = 0
let allprops = [key1, key2];
//use propsInRoom to modify things in html document
let propsInRoom = [document.getElementById("prop0"), document.getElementById("prop1"), document.getElementById("prop2"), document.getElementById("prop3"), document.getElementById("prop4"), document.getElementById("prop5")];
let room;
let curr = Room0;
//slots are spaces, items are the items (images etc)
let slot0 = document.getElementById("slot0");
let slot1 = document.getElementById("slot1");
let slot2 = document.getElementById("slot2");
let slot3 = document.getElementById("slot3");
let slot4 = document.getElementById("slot4");
let slot5 = document.getElementById("slot5");
let item0 = document.getElementById("item0");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let item4 = document.getElementById("item4");
let item5 = document.getElementById("item5");
let mouseIsOver = -1;
let pocket = document.getElementById("inventory");
let inventory = [emptyProp, emptyProp, emptyProp, emptyProp, emptyProp, emptyProp];
let items = [item0, item1, item2, item3, item4, item5];
let inventorySlot = -1;

update(Room0);

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

let selectedElement = false;
let offset;

//detecting which prop is being dragged into the inventory
propsInRoom[0].addEventListener("mouseenter", function() {
    mouseIsOver = 0;
});
propsInRoom[0].addEventListener("mouseleave", function() {
    mouseIsOver = -1;
});

propsInRoom[1].addEventListener("mouseenter", function() {
    mouseIsOver = 1;
});
propsInRoom[1].addEventListener("mouseleave", function() {
    mouseIsOver = -1;
});

propsInRoom[2].addEventListener("mouseenter", function() {
    mouseIsOver = 2;
});
propsInRoom[2].addEventListener("mouseleave", function() {
    mouseIsOver = -1;
});

//detecting which inventory slot is being clicked
slot0.addEventListener("mouseenter", function() {
    inventorySlot = 0;
});
slot0.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});
slot1.addEventListener("mouseenter", function() {
    inventorySlot = 1;
});
slot1.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});
slot2.addEventListener("mouseenter", function() {
    inventorySlot = 2;
});
slot2.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});
slot3.addEventListener("mouseenter", function() {
    inventorySlot = 3;
});
slot3.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});
slot4.addEventListener("mouseenter", function() {
    inventorySlot = 4;
});
slot4.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});
slot5.addEventListener("mouseenter", function() {
    inventorySlot = 5;
});
slot5.addEventListener("mouseleave", function() {
    inventorySlot = -1;
});

let newPropSlot;
//tracking which object in the inventory is being selected
slot0.addEventListener("click", removeFromInventory);
slot1.addEventListener("click", removeFromInventory);
slot2.addEventListener("click", removeFromInventory);
slot3.addEventListener("click", removeFromInventory);
slot4.addEventListener("click", removeFromInventory);
slot5.addEventListener("click", removeFromInventory);

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
        if (3600 < coord.x && coord.x < 3900 && 200 < coord.y && coord.y < 2100 && mouseIsOver != -1) {
            putInInventory(mouseIsOver);
        }
        //if mouse is over door0, check if its carrying the right prop to unlock 
        else if (curr.doors[0].locked && 400 < coord.x && coord.x < 780 && 880 < coord.y && coord.y < 1960 
            && propsInRoom[mouseIsOver] == curr.unlockCondition[0]) {
            unlock(0);
        }
        //if mouse is over door1, check if its carrying the right prop to unlock
        else if (curr.doors[1].locked && 1773 < coord.x && coord.x < 2341 && 1026 < coord.y && coord.y < 2341 
            && propsInRoom[mouseIsOver].number == curr.unlockCondition[1].number) {
            unlock(1);
        }
        //if mouse is over door2, check if its carrying the right prop to unlock
        else if (curr.doors[2].locked && 2900 < coord.x && coord.x < 3400 && 880 < coord.y && coord.y < 3400 
            && propsInRoom[mouseIsOver] == curr.unlockCondition[2]) {
            unlock(2);
        }
        selectedElement = false;
    }
}

//FUNCTIONS FOR INVENTORY
function setInventoryPic(i, address) {
    switch (i) {
        case 0:
            item0.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
        case 1:
            item1.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
        case 2:
            item2.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
        case 3:
            item3.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
        case 4:
            item4.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
        case 5:
            item5.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                address);
            break;
    }
}

function removeFromInventory() {
    if (inventorySlot != -1 && inventory[inventorySlot].number != -1) {
        let x = nextEmptyPropInRoom();
        propsInRoom[x].setAttributeNS(
            'http://www.w3.org/1999/xlink', 
            'xlink:href', 
            inventory[inventorySlot].imgsrc);
        propsInRoom[x].setAttributeNS(
            '', 
            'x', 
            items[inventorySlot].getAttributeNS('', 'x'));
        propsInRoom[x].setAttributeNS(
            '', 
            'y', 
            items[inventorySlot].getAttributeNS('', 'y'));
        propsInRoom[x].setAttributeNS(
            '', 
            'height', 
            inventory[inventorySlot].height);
        propsInRoom[x].setAttributeNS(
            '', 
            'width', 
            inventory[inventorySlot].width);            
        curr.props[nextEmptyPropInRoom()] = inventory[inventorySlot];
        inventory[inventorySlot] = emptyProp;
        setInventoryPic(inventorySlot, '');
    }
}

//use when checking which prop in inventory is available
function nextEmptyPropInRoom() {
    for (i = 0; i < curr.props.length; i++) {
        if (curr.props[i].number == -1) {
            return i;
        }
    }
}

//putInInventory checks for which is the next open slot and adds it in to the first open slot
function putInInventory(propId) {
    for (i = 0; i < 6; i++) {
        if (inventory[i].number == -1) {
            inventory[i] = curr.props[propId];
            setInventoryPic(i, curr.props[propId].imgsrc)
            propsInRoom[propId].setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                '');
            propsInRoom[propId].setAttributeNS(
                '', 
                'x', 
                0);
            propsInRoom[propId].setAttributeNS(
                '', 
                'y', 
                0);
            propsInRoom[propId].setAttributeNS(
                '', 
                'width', 
                0);
            propsInRoom[propId].setAttributeNS(
                '', 
                'height', 
               0);
            break;
        }
    }
    curr.props[propId] = emptyProp;
}
//FUNCTIONS FOR INVENTORY END

//FUNCTIONS FOR TRAVELLING
function update(room) {
    for (i = 0; i < propsInRoom.length; i++) {
        if (i >= room.props.length) {
            propsInRoom[i].setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                '');
            propsInRoom[i].setAttributeNS('', 'x', '0');
            propsInRoom[i].setAttributeNS('', 'y', '0');
            propsInRoom[i].setAttributeNS('', 'width', '0');
            propsInRoom[i].setAttributeNS('', 'height', '0');
        } else {
            propsInRoom[i].setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                room.props[i].imgsrc);
            propsInRoom[i].setAttributeNS('', 'x', room.props[i].x);
            propsInRoom[i].setAttributeNS('', 'y', room.props[i].y);
            propsInRoom[i].setAttributeNS('', 'width', room.props[i].width);
            propsInRoom[i].setAttributeNS('', 'height', room.props[i].height);
        }
    }
    curr = room;
    currentRoom.setAttributeNS('', 'name', room.id);
    background.setAttributeNS(
        'http://www.w3.org/1999/xlink', 
        'xlink:href', 
        room.backgroundSrc);
    
    if (room.reachableRooms[0].id != -1 && !curr.doors[0].locked) {
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

    if (room.reachableRooms[1].id != -1 && !curr.doors[1].locked) {
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
        door1.setAttributeNS('', 'x', '0');
        door1.setAttributeNS('', 'y', '0');
        door1.setAttributeNS('', 'width', '0');
        door1.setAttributeNS('', 'height', '0');
    }

    if (room.reachableRooms[2].id != -1 && !curr.doors[2].locked) {
        door2.setAttributeNS('', 'points', '2591,980 3423,766 3411,2434 2953,2108');
        thirdDoor.addEventListener("mouseover", function() {
            thirdDoorAjar.setAttributeNS('', 'class', '');
            thirdDoorAjar.setAttributeNS('', 'name', room.reachableRooms[2].id);
        });
        thirdDoor.addEventListener("mouseout", function() {
            thirdDoorAjar.setAttributeNS('', 'class', 'hide');
            thirdDoorAjar.setAttributeNS('', 'name', 'reachable[2].id');
        });
    } else {
        door2.setAttributeNS('', 'points', '');
    }

    if (room.reachableRooms[3].id != -1) {

        door3.setAttributeNS('', 'x', '1440');
        door3.setAttributeNS('', 'y', '2340');
        door3.setAttributeNS('', 'width', '660');
        door3.setAttributeNS('', 'height', '141');
    } else {
        door3.setAttributeNS('', 'x', '0');
        door3.setAttributeNS('', 'y', '0');
        door3.setAttributeNS('', 'width', '0');
        door3.setAttributeNS('', 'height', '0');
    }
}

function unlock(doornum) {
    curr.doors[doornum] = openDoors[doornum];
    update(curr);
}
//FUNCTIONS FOR TRAVELLING END