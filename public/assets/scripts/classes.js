// INITIALISATION: CLASS DECLARATIONS

class Inputs {
    constructor(id = "", imgSrc = "", inputType = "", inputLength = "", xPos = 0, yPos = 0, height = 0, width = 0, password = "") {
        this.id = id;
        this.imgSrc = imgSrc;
        this.inputType = inputType;
        this.inputLength = inputLength;
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = height;
        this.width = width;
        this.password = password;
    }
}

class Room {
    constructor(id = "-1", backgroundSrc = "", text = [], doors = [], props = {}, func = "nothing") {
        this.id = id;
        this.backgroundSrc = backgroundSrc;
        this.text = text;
        // listed in the order of left, centre, right, back
        this.reachableRooms = []; 
        // iff there's a reachable room for left/centre/right, there will be doors listed in order of left/centre/right
        this.doors = doors;
        this.props = props;
        this.func = func;
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
    constructor(text = "", positioning = "", order = 0, clickable = false, specialFunction = "") {
        this.text = text;
        this.positioning = positioning;
        this.order = order;
        this.clickable = clickable;
        this.specialFunction = specialFunction;
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