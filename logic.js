const scotch = ['e4', 'e5', 'Nf3', 'Nc6', 'd4'];
const vienna = ['e4', 'e5', 'Nf3', 'Nf6', 'c4'];
const kings_indian = ['e4', 'e6', 'd3', 'd5', 'Nd2'];
let moveNum = 0;
let moveNumIDVal = moveNum + 1;
const checkButton = document.getElementById('check-button');
let clicks = 0;

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

const study1 = () => {
    study(0);}

const study = (n) => {
    console.log("movenum=" + moveNum);
    console.log("moveID=" + moveNumIDVal);
    console.log("")
    const openingType = document.getElementById('opening-options').value;
    const notation = opening(openingType);
    // const studyList = document.getElementById('study-list');
    const studyListItems = document.getElementsByClassName('input-move')

    // if the moveNum is greater than the length of the notation, then the study is complete
    if (moveNum >= notation.length) {
        console.log('study complete');
        resetStudy();
        return;
    }

    studyListItems[moveNum].style.display = 'flex';
    guess = document.getElementById('input-move' + moveNumIDVal.toString());
    checkButton.style.display = 'flex';
    checkButton.addEventListener('click', () => {
            clicks++;
            console.log("Num Clicks:" + clicks);
            console.log("FUNCALL:" + n)
            if (document.getElementById('correct-move-text') != null) {
                document.getElementById('correct-move-text').remove();
            }
            if (guess.value != '') {
                checkGuess(guess, notation[moveNum], n);
            }
        } 
    )
}

// fun1(10)
// fun1(n)
//     if n == 1 return
//     fun1(n-1)
//     print(n)


// fun2 

const checkGuess = (guess, answer, n) =>{
    console.log("Guess: " + guess.value)
    console.log("Answer: " + answer)
    // If the guess is correct, display the text as green
    // If the guess is incorrect, display the text as red and show the correct move next to it
    if (guess.value.toLowerCase() == answer.toLowerCase()) {
        console.log('correct');
        guess.style.color = 'green';
        moveNum++;
        moveNumIDVal++;
    } else {
        console.log('wrong');
        guess.style.color = 'red';
        const correct_move = document.createElement('p');
        correct_move.innerHTML = `Wrong: The correct move is ${answer}. Try again!`;
        correct_move.id = 'correct-move-text';
        document.getElementById('study-list').appendChild(correct_move);
    }
    console.log("");
    study(n + 1);
}

const resetStudy = () => {
    moveNum = 0;
    moveNumIDVal = moveNum + 1;

    clearButton = document.getElementById('clear-study-button');
    clearButton.style.display = 'flex';
    clearButton.addEventListener('click', () => {
        clearStudy();
    })
}

const clearStudy = () => {
    const studyListItems = document.getElementsByClassName('input-move');
    studyListItems.forEach(element => {
        element.style.display   = 'none';
    })
    Button.style.display = 'none';
    clearButton.style.display = 'none';
}


// const study = () => {
//     const openingType = document.getElementById('opening-options').value;
//     const notation = opening(openingType);
//     const studyList = document.getElementById('study-list');
//     // studyList.style.display = 'flex';
//     const checkButton = document.getElementById('check-button');
//     checkButton.style.display = 'block';

//     let currStudyMoveIndex = 0;

//     // show the first move by un-hiding the first list item
//     studyList.forEach(element => {
//         element.style.display = 'block';})

//     // studyList[currStudyMoveIndex].style.display = 'block';

//     // When the check button is clicked, check the guess and show the next move
//     checkButton.addEventListener('click', () => {
//         const guess = document.getElementById('guess').value;
//         const answer = notation[currStudyMoveIndex];
//         checkGuess(guess, answer);
//         currStudyMoveIndex = showNextStudyMove(currStudyMoveIndex, studyList);})
// }

// const showNextStudyMove = (currStudyMoveIndex, studyList) => {
//     if (currStudyMoveIndex < studyList.length) {
//         studyList[currStudyMoveIndex].classList.add('show-item');
//         currStudyMoveIndex++;
// }
//     // return currStudyMoveIndex;
//     return currStudyMoveIndex;
// }
// async function study(){
//     const openingType = document.getElementById('opening-options').value;
//     const notation = opening(openingType);
    
//     const study_list = document.getElementById('study-list');

//     for (let i = 0; i < notation.length; i++) {

//         // Create input text field for guessing the next move
//         const input_guess = document.createElement('input');
//         input_guess.type = 'text';
//         input_guess.className = 'guess'
//         input_guess.id = 'guess';
//         input_guess.placeholder = 'Enter your guess';
//         // Display the input field
//         study_list.appendChild(input_guess);

//         // Create a button to check the guess
//         const check_button = document.createElement('button');
//         check_button.id = 'check-button';
//         check_button.innerHTML = 'Check';
//         // Display the button
//         study_list.appendChild(check_button);

//         check_button.addEventListener('click', () => {
//             const guess = document.getElementById('guess-${i}').value;
//             const answer = notation[i];
//             checkGuess(guess, answer);
//         });
        

//         await new Promise(resolve => {
//             const button = document.getElementById('checkButton');
//             button.addEventListener('click', resolve, { once: true });
//             });


// const checkGuess = (guess, answer) =>{
//     // If the guess is correct, display the text as green
//     // If the guess is incorrect, display the text as red and show the correct move next to it
//     if (guess == answer) {
//         document.getElementById('guess').style.color = 'green';
//     } else {
//         document.getElementById('guess').style.color = 'red';
//         const correct_move = document.createElement('p');
//         correct_move.innerHTML = `Wrong: The correct move is ${answer}`;
//         document.getElementById('study-list').appendChild(correct_move);
//     }

// }

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


// makeGrid();
