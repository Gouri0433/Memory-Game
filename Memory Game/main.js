document.querySelector(".control-button span").onclick = function () {
    let yourName = prompt("Whats your name?");
    //set name to unknown

    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = 'unknown';
    //name is not empty
    }else{
        //set name to your name
        document.querySelector(".name span").innerHTML = yourName;
    }

    //remove splash screen
    document.querySelector(".control-button").remove();
};
//effect duration
let duration = 1000;

//select block container
let blocksContainer = document.querySelector(".memory-game-blocks");

//create array from game blocks
let blocks = Array.from(blocksContainer.children);

//create range of keys
//let orderRange = [...Array(blocks.length).keys()];
let orderRange =Array.from(Array(blocks.length).keys());
shuffle(orderRange);

//add order css property to game blocks
blocks.forEach((block, index) => {
    
    //add css order property
    block.style.order = orderRange[index];

    //add click event
    block.addEventListener('click',function(){

            //trigger the flip block function
            flipBlock(block);
    });
});

//flip block function
function flipBlock(selectedBlock) {

    //add class is-flipped
    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //if there are 2 selected blocks
    if(allFlippedBlocks.length === 2){
        //console.log('Two flipped blocks selected');

        //stop clicking function
        stopClicking();

        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}


    //stop clicking function
function stopClicking(){
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        //remove class no clicking after the duration
         blocksContainer.classList.remove('no-clicking');
    }, duration);
}

//check matched block
function checkMatchedBlocks(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

//shuffle function
function shuffle(array) {
     
    //setting vars
    let current = array.length,
        temp,
        random;
    
    while(current>0){

        //get random no.
        random = Math.floor(Math.random() * current);

        //decrease length by 1
        current--;

        //[1]save current element in stash
        temp = array[random];

        //[1]save current element in stash
        array[current] = array[random];

        //[3]random element = get element from stash
        array[random] = temp;
    }
    return array;
}

//Current Array [1,2,3,4,5,6,7,8,9,0]
//new Array [1,2,3,4,5,6,7,8,9,0]
/*
    [1]save current element in stash
    [1]save current element in stash
    [3]random element = get element from stash
*/