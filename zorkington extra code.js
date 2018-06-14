let foyer = {
    'exits'         : ['182 Main St.'],
    'description'   : 'You are in a foyer. Or maybe it\'s an antechamber. Or \na vestibule. Or an entryway. Or an atrium. Or a \nnarthex. But let\'s forget all that fancy flatlander \nvocabulary,and just call it a foyer. In Vermont, this \nis pronounced "FO-ee-yurr". A copy of Seven Days lies \nin a corner.',
    'items'         : {'newspaper' : 'A Seven Days Newspaper'},
    'actions'       : foyerActions
}

let mainStreet = {
    'exits'         : [],
    'description'   : 'You are standing on Main Street between Church\nand South Winooski.There is a door here. A keypad\nsits on the handle.On the door is a handwritten sign.',
    'items'         : [],
    'actions'       : mainStreetActions
}

let rooms = {
    'Foyer'         : foyer,
    'mainStreet'  : mainStreet,
}

let foyerActions = {
    'take paper' :
}
let mainStreetActions = {
    'read sign'  : 'The sign says "Welcome to Burlington Code Academy! \nCome on up to the second floor. If the door is locked,\nuse the code 12345."',
    'take sign'  : 'That would be selfish. How will other students find \ntheir way?',
    'open door'  : 'The door is locked. There is a keypad on the door handle',
    'look around':  room.[currentRoom].description,
    '' : error()
}

currentRoom = 'mainStreet'
console.log('Your journey begins....\n')
arrivesInRoom()

function arrivesInRoom(){
    console.log(rooms.[currentRoom].description)
 //   userAction = getUserAction()
};
