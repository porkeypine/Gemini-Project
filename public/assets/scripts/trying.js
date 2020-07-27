// document.writeln("<script type='text/javascript' src='assets/scripts/classes.js'></script>");


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

let inspector = document.getElementById("inspector");
let inspectButt0 = document.getElementById("inspectButt0");
let deleteButt0 = document.getElementById("deleteButt0");
let inspectButt1 = document.getElementById("inspectButt1");
let deleteButt1 = document.getElementById("deleteButt1");
let inspectButt2 = document.getElementById("inspectButt2");
let deleteButt2 = document.getElementById("deleteButt2");
let inspectButt3 = document.getElementById("inspectButt3");
let deleteButt3 = document.getElementById("deleteButt3");
let inspectButt4 = document.getElementById("inspectButt4");
let deleteButt4 = document.getElementById("deleteButt4");
let inspectButt5 = document.getElementById("inspectButt5");
let deleteButt5 = document.getElementById("deleteButt5");

let overlay = document.getElementById("overlay");

let doorOpenSound = new Audio("assets/sounds/door_knob short.wav");
doorOpenSound.volume = 0.27;

let curr = Room0;
update(Room0);

// INVENTORY AND PROPS
let inventory = {};
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
            updateInventory(p);

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
            console.log(selectedElement.id);
            console.log(curr.doors[1].unlockCondition);
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
            var slot = selectedElement.parentNode.slot;
            console.log(slot);
            selectedElement.setAttributeNS('', 'x', '3710');
            selectedElement.setAttributeNS('', 'y', 320 + parseInt(slot) * 310);
            selectedElement.setAttributeNS('', 'width', '280');
            selectedElement.setAttributeNS('', 'height', '280');
        } else if (selectedElement instanceof Prop){
            curr.props[selectedElement.id].x = coord.x - offset.x;
            curr.props[selectedElement.id].y = coord.y - offset.y;
        }
        
        if (curr == Room4 && coord.x > 1150 && coord.x < 1650 
        && coord.y > 1175 && coord.y < 1625) {
            clean();
        }
        selectedElement = false;
    }
}


function unlock(doornum) {
    switch(doornum) {
        case 0:
            curr.doors[0] = leftUnlocked;
            break;
        case 1:
            curr.doors[1] = centreUnlocked;
            break;
        case 2:
            curr.doors[2] = rightUnlocked;
            break;
    }
    update(curr);
} 

function updateInventory(key) {
    var i = 0;
    // for (var key in inventory) {
    while (this['slot' + i].firstElementChild != null) {
        i++;
    }
    var item = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    item.setAttributeNS(
        'http://www.w3.org/1999/xlink', 
        'xlink:href', 
        inventory[key].img);
    item.setAttributeNS('', 'class', 'draggable');
    item.setAttributeNS('', 'id', key);
    item.setAttributeNS('', 'x', '3710');
    item.setAttributeNS('', 'y', 320 + i * 310);
    item.setAttributeNS('', 'width', '280');
    item.setAttributeNS('', 'height', '280');
    this['slot' + i].appendChild(item);
}

//INSPECT AND DELETE
function inspectFromInventory(slot) {
    console.log('viewing slot' + slot);
    var item = this['slot' + slot].firstElementChild;
    if (inspector.getAttribute("class") == "hide" && item.getAttribute('id') != '') {
        inspector.setAttributeNS('', 'class', '');
        console.log(inventory[item.getAttribute('id')]);
        inspectProp.setAttributeNS(
            'http://www.w3.org/1999/xlink', 
            'xlink:href', 
            inventory[item.getAttribute('id')].inspect_img);
        inspectProp.setAttributeNS('', 'class', '');
    }
}
function removeFromInventory(slot) {
    console.log('remove slot ' + slot);
    var item = this['slot' + slot].firstElementChild;
    delete inventory[item.id];
    item.remove();
}
let inspectProp = document.getElementById("inspectProp");
inspectProp.setAttributeNS('', 'id', 'inspectProp');
inspectProp.setAttributeNS('', 'class', 'hide');
background.addEventListener("click", function(){
    if (inspector.getAttribute("class") != 'hide') {
        inspector.setAttributeNS('', 'class', 'hide');
        inspectProp.setAttributeNS(
            '',
            'class',
            'hide'
        );
    }
});
inspectButt0.addEventListener("click", function(){
    inspectFromInventory(0);
});
inspectButt1.addEventListener("click", function(){
    inspectFromInventory(1);
});
inspectButt2.addEventListener("click", function(){
    inspectFromInventory(2);
});
inspectButt3.addEventListener("click", function(){
    inspectFromInventory(3);
});
inspectButt4.addEventListener("click", function(){
    inspectFromInventory(4);
});
inspectButt5.addEventListener("click", function(){
    inspectFromInventory(5);
});

deleteButt0.addEventListener("click", function(){
    removeFromInventory(0);
});
deleteButt1.addEventListener("click", function(){
    removeFromInventory(1);
});
deleteButt2.addEventListener("click", function(){
    removeFromInventory(2);
});
deleteButt3.addEventListener("click", function(){
    removeFromInventory(3);
});
deleteButt4.addEventListener("click", function(){
    removeFromInventory(4);
});
deleteButt5.addEventListener("click", function(){
    removeFromInventory(5);
});

// TEXT
function putText(currText, currOrder) {
    console.log("Text currOrder: " + currOrder + " Text array length: " + currText.length);
    if (currText.length > 0) {
        const textDiv = document.createElement('div');
        textDiv.className = "textContainer";
        textDiv.id = currOrder;

        while (currText.length > 0 && currText[0].order == currOrder) { // can display multiple text objects at the same time
            overlay.classList.remove('hide')
            var firstText = currText.shift(); // this deletes the first item in textArr and returns it

            // can have multiple texts in the same div, clickable and non-clickable
            var textPara = document.createElement('p');
            textPara.innerText = firstText.text;
            if (firstText.positioning != "") textDiv.style = firstText.positioning;

            // set style and listeners for text if needed
            if (firstText.clickable) {
                textPara.className = "clickText";
                if (firstText.specialFunction == "") {
                    textPara.addEventListener("click", function() {
                        // displays next text
                        document.getElementById(currOrder).remove();
                        currOrder++;
                        putText(curr.text, currOrder);
                    });
                } else {
                    textPara.addEventListener("click", firstText.specialFunction);
                }            
            } else {
                textPara.className = "text";
                // for displaying two non-clickable text divs (at different positions basically) at the same time
                function nextText() {
                    document.getElementById(currOrder).remove();
                    currOrder++;
                    putText(curr.text, currOrder);
                    currentRoom.removeEventListener("click", nextText);
                }
                if (firstText.specialFunction == "displayNextText") {
                    setTimeout(function(){
                        currentRoom.addEventListener("click", nextText);
                    }, 300);
                }
            }

            textDiv.appendChild(textPara);
        }
        // console.log(currText.length);
        document.body.appendChild(textDiv);
    } 
    if (currText.length == 0) {
        overlay.classList.add('hide');
    }
}


// TRAVELLING

// for unlocked doors, just go straight through on click
if (!curr.doors[0].locked) {
    firstDoor.addEventListener("click", function() {
        doorOpenSound.play();
        update(curr.reachableRooms[0]);
    });
}
if (!curr.doors[1].locked) {
    secondDoor.addEventListener("click", function() {
        doorOpenSound.play();
        update(curr.reachableRooms[1]);
    });
}
if (!curr.doors[2].locked) {
    thirdDoor.addEventListener("click", function() {
        doorOpenSound.play();
        update(curr.reachableRooms[2]);
    });
}
backDoor.addEventListener("click", function() {
    doorOpenSound.play();
    update(curr.reachableRooms[3]);
});

function update(room) {
    console.log(room);

    // removing old props
    var thingsToRemove = document.getElementById('itemsInRoom');
    while(thingsToRemove.firstElementChild) {
        thingsToRemove.lastElementChild.remove();
    }
    var otherThingsToRemove = document.getElementById('thingsInTheBack');
    while(otherThingsToRemove.firstElementChild) {
        otherThingsToRemove.lastElementChild.remove();
    }
    var propsToRemove = document.getElementById('props');
    while(propsToRemove.firstElementChild) {
        propsToRemove.lastElementChild.remove();
    }

    // removing old text
    var oldTexts = document.getElementsByClassName('textContainer');
    for (var i = 0; i < oldTexts.length; i++) {
        oldTexts[i].remove();
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
        document.getElementById('props').appendChild(prop);
    }

    // update curr
    curr = room;

    // calls function putText with an array of Text objects in the new room
    console.log(curr.text);
    putText(curr.text, 0);
    
    // travelling
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
        door3.setAttributeNS('', 'width', '0');
        door3.setAttributeNS('', 'height', '0');
    }
    if (room.func != "nothing") {
        room.func();
        console.log("done");
    }
}