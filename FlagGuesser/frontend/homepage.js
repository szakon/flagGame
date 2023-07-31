
function handleStartButtonClick() {
    // Redirect the user to the new page (newpage.html)
    window.location.href = "./gamePage/game.html";
}

// Add event listener to the "Start" button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", handleStartButtonClick);

fetchAPI()
function fetchAPI() {
    // Replace 'your-api-endpoint' with the actual URL of your backend API
    const apiUrl = 'http://localhost:3000/randomBotMove';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Return the response.json() promise to the next .then()
            return response.json();
        })
        .then(data => {
            // Process the API response data
            console.log(data);
            // Call the displayData function here if you want to process the data further
            // displayData(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the API call
            console.error('Error:', error);
        });
}
