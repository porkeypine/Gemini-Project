class RoomTemplate {
    constructor() {
        this.id = "unknown";
        this.backgroundSrc = "unknown";
        this.props = [];
        this.itemCoordinates = [];
        this.reachableRooms = [null, null, null, null];
    }
}

let Room0 = new RoomTemplate();
Room0.id = 0;
Room0.backgroundSrc = "Assets/Images/0.jpg";
Room0.props = [];
Room0.itemCoordinates = [];

let Room1 = new RoomTemplate();
Room1.id = 1;
Room1.backgroundSrc = "Assets/Images/1.jpg";
Room1.props = [];
Room1.itemCoordinates = [];

let Room2 = new RoomTemplate();
Room2.id = 2;
Room2.backgroundSrc = "Assets/Images/2.jpg";
Room2.props = [];
Room2.itemCoordinates = [];

let Room3 = new RoomTemplate();
Room3.id = 3;
Room3.backgroundSrc = "Assets/Images/3.jpg";
Room3.props = [];
Room3.itemCoordinates = [];

Room0.reachableRooms = [Room1, Room2, Room3, null];
Room1.reachableRooms = [Room3, null, Room1, null];
Room2.reachableRooms = [null, null, null, Room1];
Room3.reachableRooms = [Room1, Room2, null, Room3];

let curr = Room0;
let prev;
let reachable = curr.reachableRooms;
let currentRoom = document.getElementById("currentRoom");
currentRoom.src = curr.backgroundSrc;
let firstDoor = document.getElementById("firstDoor");
let secondDoor = document.getElementById("secondDoor");
let thirdDoor = document.getElementById("thirdDoor");
let backDoor = document.getElementById("backwards");

function update() {
    if (reachable[0] != null) {
        firstDoor.coords = "160, 140, 355, 520";
        firstDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[0];
            reachable = curr.reachableRooms;
            currentRoom.src = curr.backgroundSrc;
            currentRoom.name = curr.id;
            update();
        });
    } else {
        firstDoor.coords = "";
    }

    if (reachable[1] != null) {
        secondDoor.coords = "470, 140, 665, 520";
        secondDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[1];
            reachable = curr.reachableRooms;
            currentRoom.src = curr.backgroundSrc;
            currentRoom.name = curr.id;
            update();
        });
    } else {
        secondDoor.coords = "";
    }

    if (reachable[2] != null) {
        thirdDoor.coords = "800, 140, 950, 520";
            thirdDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[2];
            reachable = curr.reachableRooms;
            currentRoom.src = curr.backgroundSrc;
            currentRoom.name = curr.id;
            update();
        });
    } else {
    secondDoor.coords = "";
    }

    if (reachable[3] != null) {
        backDoor.coords = "0, 550, 1137, 662";
        backDoor.addEventListener("click", function() {
            prev = curr;
            curr = reachable[4];
            reachable = curr.reachableRooms;
            currentRoom.src = curr.backgroundSrc;
            currentRoom.name = curr.id;
            update();
        });
    } else {
        backDoor.coords = "";
    }
}
update();