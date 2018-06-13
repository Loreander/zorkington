console.log('Your journey begins....\n')
currentRoom = '182 Main St.';
roomDescriptions = {'182 Main St.': 'You are standing on Main Street between Church\nand South Winooski.There is a door here. A keypad\nsits on the handle.On the door is a handwritten sign.\n>_'}
arrivesInRoom();

function arrivesInRoom(){
    console.log(roomDescriptions[currentRoom])
    userAction = getUserAction()
}


/* Trying to get user response */
function getUserAction(){
    process.stdin.once('data', (chunk) => {
    userAction = chunk.toString().trim();
    checkAction()

});
}

/* Checking to see if the action matches our list of actions */
function checkAction(){
    if(userAction === 'read sign'){
        console.log('The sign says "Welcome to Burlington Code Academy! \nCome on up to the second floor. If the door is locked,\nuse the code 12345."')
    } else console.log('I don\'t understand what you want me to do...')
}


