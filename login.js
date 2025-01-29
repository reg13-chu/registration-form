// Fetch users from the JSON file using AJAX
async function fetchUsersFromJSON() {
    try {
        const response = await fetch('http://localhost:3000/users'); // JSON Server endpoint
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        return users; // Return users data for comparison
    } catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

// Login function
async function loginUser(email, password) {
    const users = await fetchUsersFromJSON();

    // Search for the user with the matching email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Successfully logged in!');
        console.log('User logged in:', user); // For debugging purposes
    } else {
        alert('Invalid email or password!');
    }
}

// Handle form submission for login
$('#logIn').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const email = $('#email').val();
    const password = $('#password').val();

    // Call the login function
    loginUser(email, password);
});
