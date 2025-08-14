// Get references to DOM elements
const userDataContainer = document.getElementById('userDataContainer');
const reloadButton = document.getElementById('reloadButton');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessageDiv = document.getElementById('errorMessage');

/**
 * Hides the error message div.
 */
function hideErrorMessage() {
    errorMessageDiv.classList.add('hidden');
    errorMessageDiv.textContent = '';
}

/**
 * Displays an error message in the error message div.
 * @param {string} message - The error message to display.
 */
function showErrorMessage(message) {
    errorMessageDiv.textContent = `Error: ${message}. Please check your internet connection or try again.`;
    errorMessageDiv.classList.remove('hidden');
}

/**
 * Fetches user data from the API and displays it on the page.
 */
async function fetchUsers() {
    userDataContainer.innerHTML = ''; // Clear previous data
    loadingMessage.classList.remove('hidden'); // Show loading message
    hideErrorMessage(); // Hide any existing error messages

    try {
        // Fetch data from the public API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const users = await response.json();

        // Loop through users and display their information
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card p-6 flex flex-col items-start space-y-2'; // Tailwind classes for card styling

            const userName = document.createElement('h2');
            userName.className = 'text-xl font-semibold text-gray-900'; // Tailwind for name
            userName.textContent = user.name;

            const userEmail = document.createElement('p');
            userEmail.className = 'text-gray-700 text-sm'; // Tailwind for email
            userEmail.innerHTML = `<strong>Email:</strong> <a href="mailto:${user.email}" class="text-blue-600 hover:underline">${user.email}</a>`;

            const userAddress = document.createElement('p');
            userAddress.className = 'text-gray-700 text-sm'; // Tailwind for address
            const address = user.address;
            userAddress.innerHTML = `<strong>Address:</strong> ${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;

            // Append elements to the user card
            userCard.appendChild(userName);
            userCard.appendChild(userEmail);
            userCard.appendChild(userAddress);

            // Append the user card to the main container
            userDataContainer.appendChild(userCard);
        });
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching user data:', error);
        showErrorMessage(error.message); // Display a user-friendly error
    } finally {
        loadingMessage.classList.add('hidden'); // Hide loading message regardless of outcome
    }
}

// Add event listener to the reload button
reloadButton.addEventListener('click', fetchUsers);

// Fetch users when the page loads
window.onload = fetchUsers;
