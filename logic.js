const scotch = ['e4', 'e5', 'Nf3', 'Nc6', 'd4'];
const vienna = ['e4', 'e5', 'Nc6', 'Nf3', 'f4'];
const kings_indian = ['e4', 'e6', 'd3', 'd5', 'Nd2'];
let moveNum = 0;
let moveNumIDVal = moveNum + 1;
const checkButton = document.getElementById('check-button');
clearButton = document.getElementById('clear-study-button');

const opening = (openingType) => {
    
    if (openingType == 'scotch') {
        return scotch;
    } else if (openingType == 'vienna') {
        return vienna;
    } else if (openingType == 'kings-indian') {
        return kings_indian;
    }
}

const showNotationContent = () => { 
    clearNotationContent(); // clear the notation content before showing the new one
    const openingType = document.getElementById('opening-options').value; // get the value of the selected option

    const notationList = document.getElementById('notation-list'); // get the notation list element
    const notation = opening(openingType); // get the notation of the selected opening

    // loop through the notation array and create a list item for each element
    notation.forEach(element => {
        var li = document.createElement('li'); // create a list item
        var text = document.createTextNode(element); // create a text node

        li.appendChild(text); // append the text node to the list item
        notationList.appendChild(li);  // append the list item to the notation list
    });
}

const clearNotationContent = () => {
    const notationList = document.getElementById('notation-list');
    notationList.innerHTML = '';
}

const showNextStudyMove = () => {
    console.log("Move #=" + moveNum);
    console.log("Move ID #=" + moveNumIDVal);
    console.log("")

    // get the study list items
    const studyListItems = document.getElementsByClassName('input-move')

    // if the moveNum is greater than the length of the notation, then the study is complete
    if (moveNum >= studyListItems.length) {
        console.log('study complete');
        // Add the clear button to reset the study
        clearButton.style.display = 'flex';
        return;
    }
    
    const curItem = studyListItems[moveNum]
    curItem.style.display = 'flex';
    curItem.style.width = '50px';
    curItem.style.marginLeft = '0px';
    checkButton.style.display = 'flex';
}

const checkGuess = () =>{
    // remove the correct move text if it exists
    if (document.getElementById('correct-move-text') != null) {
        document.getElementById('correct-move-text').remove();
    }

    if (document.getElementById('empty-move-text') != null) {
        document.getElementById('empty-move-text').remove();
    }

    // get the guess and the answer
    const openingType = document.getElementById('opening-options').value;
    const notation = opening(openingType);
    
    const answer = notation[moveNum];
    const guess = document.getElementById('input-move' + moveNumIDVal.toString());

    console.log("Guess: " + guess.value)
    console.log("Answer: " + answer)

    // If the guess is correct, display the text as green
    // If the guess is incorrect, display the text as red and show the correct move next to it
    if (guess.value.toLowerCase() == answer.toLowerCase()) {
        console.log('correct');
        guess.style.color = 'green';
        // increment the moveNum and moveNumIDVal
        moveNum++;
        moveNumIDVal++;
        // call study again to show the next move
        showNextStudyMove();
    } else if (guess.value == '') {
        console.log('empty');
        const empty_message = document.createElement('p');
        empty_message.innerHTML = `Please Enter A Move`;
        empty_message.style.color = 'blue';
        empty_message.id = 'empty-move-text';
        // Paragraph elements have automatic padding, so we need to remove it
        empty_message.style.marginBlockStart = '0px';
        empty_message.style.marginBlockEnd = '0px';
        document.getElementById('move-container' + moveNumIDVal.toString()).appendChild(empty_message);
    
    } else {
        console.log('wrong');
        guess.style.color = 'red';
        const correct_move = document.createElement('p');
        correct_move.innerHTML = `Wrong: The correct move is ${answer}. Try again!`;
        correct_move.style.color = 'red';
        correct_move.id = 'correct-move-text';
        // Paragraph elements have automatic padding, so we need to remove it
        correct_move.style.marginBlockStart = '0px';
        correct_move.style.marginBlockEnd = '0px';
        document.getElementById('move-container' + moveNumIDVal.toString()).appendChild(correct_move);
    }
    console.log("");
}

const clearStudy = () => {
    // reset the moveNum and moveNumIDVal
    moveNum = 0;
    moveNumIDVal = moveNum + 1;
    // reset the input fields
    const studyListItems = document.getElementsByClassName('input-move');

    // loop through the input fields and reset them
    for (let i = 0; i < studyListItems.length; i++) {
        studyListItems[i].style.display = 'none';
        studyListItems[i].value = null;
        studyListItems[i].placeholder = 'Move' + (i + 1);
        studyListItems[i].style.color = 'black';
    }

    // hide the check and clear buttons
    checkButton.style.display = 'none';
    clearButton.style.display = 'none';
}

// Make an 8x8 grid
const makeGrid = () => {
    const chessboard = document.getElementById('board');

    for (let i = 0; i < 8; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = 'square';
            cell.id = `${i}${j}`;
            row.appendChild(cell);
        }
        chessboard.appendChild(row);
    }

}


makeGrid();
