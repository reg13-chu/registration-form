// Fetch users from the JSON file using AJAX
async function fetchUsersFromJSON() {
    try {
        const response = await fetch('http://localhost:3000/users'); // Use JSON Server endpoint
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        console.log('Users loaded from JSON:', users);
        // You can then use `users` data here
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

$(document).ready(function() {
    // Fetch users when the page loads
    fetchUsersFromJSON();

    // Handle form submission
    $('#regForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        var formData = new FormData(this); // Collect form data
        var dataObject = {};
    
        // Convert FormData to JSON
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });
    
        // Send data via AJAX
        $.ajax({
            url: 'http://localhost:3000/users', // Server-side URL where form data will be submitted
            type: 'POST',
            data: JSON.stringify(dataObject),
            contentType: 'application/json', // Send JSON data
            success: function(response) {
                alert('Form submitted successfully!');
                console.log(response); // Server response (could be a JSON message)
            },
            error: function(xhr, status, error) {
                alert('Error submitting form: ' + error);
            }
        });
    });    
});

// Call updateCities when the province dropdown changes
document.getElementById("province").addEventListener("change", updateCities);

// Call updateBarangays when the city dropdown changes
document.getElementById("city").addEventListener("change", updateBarangays);

const data = {
    "Laguna": {
        "Santa Rosa": ["Biga", "Dita", "Ibaba", "Pook", "Tagapo"],
        "San Pedro": ["Cuyab", "San Vicente", "Longos"],
        "Biñan": ["Bucao", "Langkiwa", "Dela Paz"],
        "Calamba": ["Bañadero", "Pansol", "Lumbang"]
    },
    "Pampanga": {
        "Angeles City": ["Amsic", "Balibago", "Cutud"],
        "San Fernando": ["San Agustin", "Dolores", "San Isidro"],
        "Mabalacat": ["Bical", "Dau", "San Joaquin"]
    },
    "Batangas": {
        "Batangas City": ["Buhangin", "Alangilan", "San Isidro"],
        "Lipa": ["Banay-Banay", "Cumba", "Talisay"],
        "Tanauan": ["Poblacion", "San Juan", "Mataas Na Bayan"]
    },
    "Rizal": {
        "Antipolo": ["Dela Paz", "Cupang", "San Juan"],
        "Cainta": ["San Isidro", "San Juan", "San Andres"],
        "Rodriguez": ["San Jose", "Wawa", "San Juan"]
    },
    "Bulacan": {
        "Malolos": ["Longos", "Barasoain", "Mundol"],
        "Meycauayan": ["Bungahan", "Malhacan", "Langka"],
        "Santa Maria": ["Pinagbarilan", "Tungko", "San Jose"]
    }
};

// Function to update cities based on selected province
function updateCities() {
    const provinceSelect = document.getElementById("province");
    const citySelect = document.getElementById("city");
    const barangaySelect = document.getElementById("barangay");
    const selectedProvince = provinceSelect.value;

    // Reset city and barangay dropdowns
    citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
    barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

    if (selectedProvince && data[selectedProvince]) {
        Object.keys(data[selectedProvince]).forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.text = city;
            citySelect.appendChild(option);
        });
    }
}

// Function to update barangays based on selected city
function updateBarangays() {
    const provinceSelect = document.getElementById("province");
    const citySelect = document.getElementById("city");
    const barangaySelect = document.getElementById("barangay");
    const selectedProvince = provinceSelect.value;
    const selectedCity = citySelect.value;

    // Reset barangay dropdown
    barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

    if (selectedProvince && selectedCity && data[selectedProvince][selectedCity]) {
        data[selectedProvince][selectedCity].forEach(barangay => {
            const option = document.createElement("option");
            option.value = barangay;
            option.text = barangay;
            barangaySelect.appendChild(option);
        });
    }
}
