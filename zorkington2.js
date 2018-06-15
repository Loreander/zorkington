let playerInventory = []
correctEntryMessage = 'Success! The door opens. You enter the foyer and the \ndoor shuts behind you'
falseEntryMessage = '"Bzzzzzt", the door is still locked'
playerInventory = {}
currentRoom = 'mainStreet'


let displayHelp = 
    'Help Menu\n---------\nUse the following shortcuts if you get stuck...' +
    '\nlook around : Gives you a description of the room' +
    '\nexits       : gives you a list of exits from the current room' +
    '\ninventory   : displays player inventory' +
    '\nhint        : if there is a user hint available' +
    '\nhelp        : brings up the help menu' +
    '\ndrop item   : will remove an item from your inventory'


let filteredActions = {
    'readSign' : ['read sign', 'examine sign', 'look sign', ]
    
}

let rooms = {
    'foyer'       : {
        'exits'                 : ['182 Main St.'],
        'description'           : 'You are in a foyer. Or maybe it\'s an antechamber. Or \na vestibule. Or an entryway. Or an atrium. Or a \nnarthex. But let\'s forget all that fancy flatlander \nvocabulary,and just call it a foyer. In Vermont, this \nis pronounced "FO-ee-yurr". A copy of Seven Days lies \nin a corner.',
        'items'                 : {'newspaper' : 'A Seven Days Newspaper'},
        'actionResponse'        : {
            'take paper'        : '',
            'look around'       : 'You are in a foyer. Or maybe it\'s an antechamber. Or \na vestibule. Or an entryway. Or an atrium. Or a \nnarthex. But let\'s forget all that fancy flatlander \nvocabulary,and just call it a foyer. In Vermont, this \nis pronounced "FO-ee-yurr". A copy of Seven Days lies \nin a corner.',
            'help'              : displayHelp,
            'hint'              : ['Never miss a chance to take a "Seven Days"'],
            'check inventory'   : checkInventory()
          }
    },


    'mainStreet'  : {
        'exits'         : [],
        'description'   : 'You are standing on Main Street between Church\nand South Winooski.There is a door here. A keypad\nsits on the handle.On the door is a handwritten sign.',
        'items'         : [],
        'actionResponse'       : {
            'read sign'          : 'The sign says "Welcome to Burlington Code Academy! \nCome on up to the second floor. If the door is locked,\nuse the code 12345."',
            'take sign'          : 'That would be selfish. How will other students find \ntheir way?',
            'open door'          : 'The door is locked. There is a keypad on the door handle',
            'look around'        : 'You are standing on Main Street between Church\nand South Winooski.There is a door here. A keypad\nsits on the handle.On the door is a handwritten sign.',
            'enter code 12345'   : correctEntryMessage,
            'code in 12345'      : correctEntryMessage,
            '12345'              : correctEntryMessage,
            'help'               : displayHelp,
            'check inventory'    : checkInventory()
        }
    },
}



function arrivesInRoom(){
    console.log(rooms[currentRoom].description)
    userAction = getUserAction()
};

function getUserAction(){
    console.log('\n>_')
    process.stdin.once('data', (chunk) => {
    userAction = chunk.toString().trim().toLowerCase();
    if (currentRoom === 'mainStreet') {
        checkActionMainSt()
    } 

    else if (currentRoom === 'foyer'){
        checkActionFoyer()
    }
});
};

function checkActionMainSt(){
    console.log('')

    let actionResponse = rooms[currentRoom].actionResponse[userAction];

    if (actionResponse !== undefined && (typeof actionResponse == 'string')) {
        console.log(actionResponse)
        getUserAction()
    } else if (actionResponse !== undefined){
        actionResponse
    }
    else console.log(`I don\'t understand how to "${userAction}". Type \'help\' if you are stuck.`)
        getUserAction()
    
}

function addInventory(item, description) {
    playerInventory[item] = description
    console.log('\nYou have added the ' + item + ' to your inventory!')
};

function checkInventory(){
    if (playerInventory.toString() == ''){
        console.log('You are not carrying anything...')
        getUserAction()
    } else console.log(`You are carrying:`)
        console.log(playerInventory)
        getUserAction()
}
arrivesInRoom()
console.log('Your journey begins....\n')