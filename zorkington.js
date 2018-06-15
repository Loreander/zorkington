
currentRoom = '182 Main St.';
playerInventory = {}
roomDescriptions = {
    '182 Main St.': 'You are standing on Main Street between Church\nand South Winooski.There is a door here. A keypad\nsits on the handle.On the door is a handwritten sign.', 
 
    'Foyer': 'You are in a foyer. Or maybe it\'s an antechamber. Or \na vestibule. Or an entryway. Or an atrium. Or a \nnarthex. But let\'s forget all that fancy flatlander \nvocabulary,and just call it a foyer. In Vermont, this \nis pronounced "FO-ee-yurr". A copy of Seven Days lies \nin a corner.'}


function arrivesInRoom(){
    console.log(roomDescriptions[currentRoom])
    userAction = getUserAction()
};


function getUserAction(){
    console.log('\n>_')
    process.stdin.once('data', (chunk) => {
    userAction = chunk.toString().trim().toLowerCase();
    if (currentRoom === '182 Main St.') {
        checkActionMainSt()
    } else if (currentRoom === 'Foyer'){
        checkActionFoyer()
    }
});
};

function checkActionMainSt(){
    console.log('')
    if(userAction === 'read sign'){
        console.log('The sign says "Welcome to Burlington Code Academy! \nCome on up to the second floor. If the door is locked,\nuse the code 12345."')
        getUserAction()
    } else if(userAction === 'take sign'){
        console.log('That would be selfish. How will other students find \ntheir way?')
        getUserAction()
    } else if(userAction === 'open door'){
        console.log('The door is locked. There is a keypad on the door handle')
        getUserAction()
    } else if(userAction.slice(0,4) == 'drop'){
        removeInventory(userAction.slice(5))
    } else if(userAction === 'look around'){
        arrivesInRoom()
    } else if(userAction === 'check inventory' || userAction ==='i' || userAction ==='inventory') {
        checkInventory()
    } else if(
        (userAction.split(' ')[0] === 'enter' && userAction.split(' ')[1] === 'code' && userAction.split(' ')[2] === '12345') || 
        (userAction.split(' ')[0] === 'enter' && userAction.split(' ')[1] === '12345') ||
        (userAction === '12345')){
        console.log('Success! The door opens. You enter the foyer and the \ndoor shuts behind you.\n')
        currentRoom = 'Foyer'
        arrivesInRoom()
    } else if(userAction === 'hint'){
        hints()
    } else if(userAction === 'help'){
        displayHelp()
    } else if (userAction.slice(-5) !== '12345' && (userAction.slice(0,10) === 'enter code' || userAction.slice(0,5) === 'enter')) {
        console.log('Bzzzzt! The door is still locked')
        getUserAction()
    }else error(userAction)
};

function checkActionFoyer(){
    if(userAction === 'look around'){
        arrivesInRoom()
    } else if(userAction === 'check inventory' || userAction ==='i' || userAction ==='inventory') {
        checkInventory()
    } else if(userAction === 'help'){
        displayHelp()
    } else if(userAction === 'hint'){
        hints()
    } else if(userAction.slice(0,4) == 'drop'){
        removeInventory(userAction.slice(5))
    } else if(userAction === 'take paper' || userAction ==='take seven days'){
        console.log('You pick up the paper and leaf through it looking for \ncomics and ignoring the articles, just like everybody \nelse does.')
        addInventory('newspaper', 'Seven Days Newspaper')
        getUserAction()
        roomDescriptions['Foyer'] = 'You are in a foyer. Or maybe it\'s an antechamber. Or \na vestibule. Or an entryway. Or an atrium. Or a \nnarthex. But let\'s forget all that fancy flatlander \nvocabulary,and just call it a foyer. In Vermont, this \nis pronounced "FO-ee-yurr".'
    } else error(userAction)
};

function error(userAction) {
    console.log('I don\'t understand how to "' + userAction + '", type help if you are stuck.')
    getUserAction()
};

function addInventory(item, description) {
    playerInventory[item] = description
    console.log('\nYou have added the ' + item + ' to your inventory!')
};

function displayHelp(){
    console.log('Help Menu')
    console.log('---------')
    console.log('Use the following shortcuts if you get stuck...')
    console.log('look around : Gives you a description of the room')
    console.log('exits       : gives you a list of exits from the current room')
    console.log('inventory   : displays player inventory')
    console.log('hint        : if there is a user hint available')
    console.log('help        : brings up the help menu')
    console.log('drop item   : will remove an item from your inventory')
    getUserAction()
}

function checkInventory(){

    if (playerInventory.toString() == ''){
        console.log('You are not carrying anything...')
    } else console.log(`You are carrying:`)
        console.log(playerInventory);
    getUserAction()
}

function hints(){
    if(currentRoom == '182 Main St.'){
        console.log('I wonder what the sign says?...')
        getUserAction()
    }
    else if(currentRoom == 'Foyer'){
        console.log('Never miss a chance to grab a Seven Days...')
        getUserAction()
    }
}

function removeInventory(item){
    if(playerInventory[item]!=undefined){
    console.log(`You have removed the ${item} from your inventory and it is now at ${currentRoom}`)
    roomDescriptions[currentRoom] += `The room contains a ${playerInventory[item]}`
    delete playerInventory[item]
    }
    else console.log('This is not an item in your inventory. Use "check inventory" to see your items.');
    getUserAction()
}

console.log('Your journey begins....\n')
arrivesInRoom();
