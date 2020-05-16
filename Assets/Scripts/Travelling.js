class RoomTemplate {
    constructor() {
        this.id = "unknown";
        this.backgroundSrc = "unknown";
        this.props = [];
        this.itemCoordinates = [];
        this.reachableRooms = [null, null, null, null];
        this.openDoor0;
        this.openDoor1;
        this.openDoor2;
    }
}

let emptyRoom = new RoomTemplate();
emptyRoom.id = -1;
emptyRoom.backgroundSrc = "";
emptyRoom.props = [];
emptyRoom.itemCoordinates = [];
emptyRoom.reachableRooms = [];

let Room0 = new RoomTemplate();
Room0.id = 0;
Room0.backgroundSrc = "assets/images/OneDoor.svg";
Room0.props = [];
Room0.itemCoordinates = [];
Room0.openDoor0 = "assets/images/OneDoorAjar.svg";

let Room1 = new RoomTemplate();
Room1.id = 1;
Room1.backgroundSrc = "assets/images/ThreeDoor.png";
Room1.props = [];
Room1.itemCoordinates = [];

let Room2 = new RoomTemplate();
Room2.id = 2;
Room2.backgroundSrc = "assets/images/OneDoor.svg";
Room2.props = [];
Room2.itemCoordinates = [];

let Room3 = new RoomTemplate();
Room3.id = 3;
Room3.backgroundSrc = "assets/images/OneDoor.svg";
Room3.props = [];
Room3.itemCoordinates = [];

Room0.reachableRooms = [Room1, Room2, Room3, emptyRoom];
Room1.reachableRooms = [Room3, emptyRoom, Room2, Room0];
Room2.reachableRooms = [emptyRoom, Room0, emptyRoom, Room1];
Room3.reachableRooms = [Room1, Room0, emptyRoom, Room0];

let curr = Room0;
let prev;
let firstDoor = document.getElementById("firstDoor");
let door1 = document.getElementById("door1");
let secondDoor = document.getElementById("secondDoor");
let thirdDoor = document.getElementById("thirdDoor");
let backDoor = document.getElementById("backwards");
let reachable = curr.reachableRooms;
let currentRoom = document.getElementById("currentRoom");
let background = document.getElementById("background");

function update() {
    reachable = curr.reachableRooms;
    currentRoom.name = curr.id;
    background.setAttributeNS(
        'http://www.w3.org/1999/xlink', 
        'xlink:href', 
        curr.backgroundSrc);
    currentRoom.name = curr.id;
    
    if (reachable[0].id != -1) {
        door1.x = 1773;
        door1.y = 1026;
        door1.width = 568;
        door1.height = 761;
        firstDoor.addEventListener("mouseover", function() {
            background.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                curr.openDoor0);
        });
        firstDoor.addEventListener("mouseout", function() {
            background.setAttributeNS(
                'http://www.w3.org/1999/xlink', 
                'xlink:href', 
                curr.backgroundSrc);
        });
        firstDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[0];
            update();
        });
    } else {
        door1.x = 0;
        door1.y = 0;
        door1.width = 0;
        door1.height = 0;
    }

  /*  if (reachable[1].id != -1) {
        secondDoor.coords = "470, 140, 665, 520";
        secondDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[1];
            update();
        });
    } else {
        secondDoor.coords = "";
    }

    if (reachable[2].id != -1) {
        thirdDoor.coords = "800, 140, 950, 520";
        thirdDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[2];
            update();
        });
    } else {
    thirdDoor.coords = "";
    }

    if (reachable[3].id != -1) {
        backDoor.coords = "0, 550, 1137, 662";
        backDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[3];
            update();
        });
    } else {
        backDoor.coords = "";
    }*/
}
update();