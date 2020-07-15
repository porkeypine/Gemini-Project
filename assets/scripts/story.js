// HARDCODED STUFF: TEXT, ROOMS, ETC.


// STANDARD CONSTANTS

var std_bg = "assets/Images/Rooms/ThreeDoorRoomBackground.svg";

let leftUnlocked = new Door("left");
let centreUnlocked = new Door("centre");
let rightUnlocked = new Door("right");


// DEFINING ROOMS
// text: text, style positioning, order, clickable, special function
// prop: name, img, inspect_img, x, y, w, h
// room: id, backgroundSrc, text, doors, props

let Text0_1 = new Text("You wake up in an empty room.", "top: 10%", 0, false);
let Text0_2 = new Text("Click me.", "", 0, true); 
let Text0_3 = new Text("After click", "top: 50%", 1, false);
let Room0 = new Room(0, "assets/Images/Rooms/Room0.svg", [Text0_1, Text0_2, Text0_3], ["", centreUnlocked, ""]);

let lockedKeyDoor = new Door("right", true, "key 1");
let key1 = new Prop("key 1", "assets/Images/Key.svg", "assets/images/KeyInspect.svg", 727, 2178, 185, 169);
let key2 = new Prop("key 2", "assets/Images/Key.svg", "assets/images/KeyInspect.svg", 400, 1500, 185, 169);
let key3 = new Prop("key 3", "assets/Images/Key.svg", "assets/images/KeyInspect.svg", 500, 200, 185, 169);
let Room1 = new Room(1, "assets/Images/Rooms/Room1.svg", document.getElementsByClassName("Room1"), [leftUnlocked, centreUnlocked, lockedKeyDoor], {"key 1" : key1, "key 2" : key2, "key 3" : key3});

let Room2 = new Room(2, "assets/Images/Rooms/Room2.svg", [], [leftUnlocked, centreUnlocked, rightUnlocked]);

let Room3 = new Room(3, "assets/Images/Rooms/Room3.svg", [], [leftUnlocked, centreUnlocked, rightUnlocked]);


// DEFINING REACHABLE ROOMS 
Room0.reachableRooms = ["", Room1, "", ""];
Room1.reachableRooms = ["", "", Room2, Room0];
Room2.reachableRooms = [Room3, "", "", Room1];
Room3.reachableRooms = [Room1, Room0, "", Room2];
