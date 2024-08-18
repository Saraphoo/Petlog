async function fetchFunction() {
    try {
        // First API call to get the user's data, including pets
        let responseUserData = await axios.get('http://localhost:3000/api/user/info', {
            headers: { Authorization: `Bearer ${api.token}` }
        });

        // Save the document ID
        sessionStorage.setItem('documentId', responseUserData.data._id);
        console.log(responseUserData.data._id);

        // Extract user and pets data
        let user = responseUserData.data;
        let userPets = user.pets || []; // Assuming `pets` is an array

        // Display the data in the HTML
        writeToDiv(user, userPets);

        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Error fetching user details:', error);
        document.getElementById('loading').textContent = 'Failed to load user details.';
    }
}

function writeToDiv(user, pets) {
    // Display user information
    document.getElementById('nameOfUser').innerHTML = `<h5 class="card-title" id="nameOfUser">${user.firstName} ${user.lastName}</h5>`;
    document.getElementById('userEmail').innerHTML = `<p class="card-text" id="userEmail" style="font-size:0.775em;">${user.email}</p>`;

    // Display all pets
    if (pets.length > 0) {
        let petsHTML = '';
        pets.forEach(pet => {
            petsHTML += `
                <p class="card-text" id="listOfUserPets">
                    <a style="text-decoration:none;" class="link-dark" href="petDetail.html?petID=${pet._id}">
                        <mark style="border-radius: 10px;">${pet.petName} (${pet.petType})</mark>
                    </a>
                </p>`;
        });
        document.getElementById('listOfUserPets').innerHTML = petsHTML;
    } else {
        document.getElementById('listOfUserPets').innerHTML = '<p>No pets found for this user.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchFunction, false);
