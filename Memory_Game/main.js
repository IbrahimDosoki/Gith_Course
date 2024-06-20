// Select the strart game button
document.querySelector(".control-buttons span ").onclick = function () {

    // Prompt window to ask for Name 
    let yourName = prompt("Whats your name?");

    // if name is empty
    if (yourName == null || yourName == "") {
        // set the name to unknown
        document.querySelector(".name span ").innerHTML = "Unknown";
    } else {
        // name is not empty set name to your name 
        document.querySelector(".name span ").innerHTML = yourName;
    }


    // remove splash screen
    document.querySelector(".control-buttons ").remove();



}

//Efect duration
let duration = 1000;

// select blocks container 
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array from game blocks
let blocks = Array.from(blocksContainer.children);

// Create Ranege of keys 
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);



// Add order CSS properties to Game blocks 
blocks.forEach(function(block , index) {


    block.style.order = orderRange[index];

    // Add click event 
    block.addEventListener('click', function() {


        // Trigger the flipp block function 
        flipBlock(block)

    })

})

// Filp Block Function 
function flipBlock (selectedBlock ) {

    // add class is flipped 
    selectedBlock.classList.add('is-flipped');

    // Collect all flipped cards 
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

    // if theres to selected blocks 
    if(allFlippedBlocks.length === 2) {


        // console.log("Two flipped blocks selected");

        stopClicking()

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

// Stop clicking function 
function stopClicking() {

    // Add class no clicking on main container 
    blocksContainer.classList.add("no-clicking");

    // Set timeout for duration 
    setTimeout( () => {

        // Remove class no clicking after the duration 
        blocksContainer.classList.remove("no-clicking");

    }, duration);

}

// Check matched block function 
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span ')

    if(firstBlock.dataset.tec === secondBlock.dataset.tec) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

    } else {

        triesElement.innerHTML =  parseInt(triesElement.innerHTML) + 1;

        setTimeout( () => {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        }, duration)

    }

}



// Create Shuffle Function to random the elements of blocks 
function shuffle(array) {
    
    // Setting vars 
    let current = array.length ,
        temp , 
        random ;


    while (current > 0) {

        // Get random number 
        random = Math.floor(Math.random() * current);

        // Decrease length by one 
        current--;

        // [1] Save current element in stash 
        temp = array[current];

        // [2] Current element = random element 
        array[current] = array[random];

        // [3] Ranfom element = get element from stash 
        array[random] = temp;

    }

    return array;

}


