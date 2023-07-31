
let imageNum = 1;

let currentImage = 'france.png';
let score = 0;

var socket = io();

socket.on('rightMove', (isRightMove) => {
    console.log(isRightMove);
    console.log(isRightMove.NextContryToGuess)
})

const imageNames = [
    'usa.png',
    'france.png',
    'germany.png',
    'spain.png',
    'uk.png'
    // Add more image names here as needed
];
/*
function changeImage() {
    const textInput = document.getElementById('textInput').value.trim().toLowerCase();
    const imageElement = document.getElementById('image');

    if (textInput === currentImage.replace('.png', '')) {
        if(imageNum<imageNames.length){
            currentImage = currentImage === imageNames[imageNum] ? imageNames[imageNum+1] : imageNames[imageNum];
            imageNum++;
            imageElement.src = `../resources/${currentImage}`;
        }
    }
}*/
let currentImageIndex = 0;

function changeImage() {
    const textInput = document.getElementById('textInput').value.trim().toLowerCase();
    const imageElement = document.getElementById('image');
    console.log("input text: "+textInput);
    console.log("image name: "+imageNames[currentImageIndex].replace('.png', ''));

    socket.emit('played',textInput)

    if (textInput === imageNames[currentImageIndex].replace('.png', '')) {
        //currentImageIndex = (currentImageIndex + 1) % imageNames.length;
        if(currentImageIndex<imageNames.length-1){
            score++;
            currentImageIndex = (currentImageIndex + 1);
            imageElement.src = `../resources/${imageNames[currentImageIndex]}`;
            textInput.value = "";
            updateScoreDisplay()
            totalScore
        }else{
            console.log("FINISHED")
            window.location.href = "losepage.html";
        }
    }else{

        //outputDiv.textContent = "WRONG you entered: " + imageNames[currentImageIndex];
        console.log("WRONG");
    }
    console.log("CHANGED: "+currentImageIndex);
}

function updateScoreDisplay() {
    const scoreValueElement = document.getElementById('scoreValue');
    const currentScore = score; // Get the current score using the getScore() function
    scoreValueElement.textContent = currentScore;
}

function totalScore() {
    const scoreValueElement = document.getElementById('total');
    const totalScore = imageNames.length;
    console.log("total score: "+totalScore)
    scoreValueElement.textContent = totalScore;
}

// Call the function to update the score display when the page loads
updateScoreDisplay();