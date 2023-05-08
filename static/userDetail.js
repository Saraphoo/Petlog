
// 
//Function to get json
async function fetchFunction() {
    let responseUserData = await axios.get('http://localhost:3000/api/blob/user',
        { headers: { Authorization: `Bearer ${api.token}` } }
    );

    sessionStorage.setItem('documentId', responseUserData.data.id);
    const response = api.GET(responseUserData.data.id, async function (response) {
        //get user's ID
        const userID = getAllUrlParams().userid;
        //Create an Array containting the user object with the matching ID
        let responseUser = await axios.get('http://localhost:3000/api/user/info',
        { headers: { Authorization: `Bearer ${api.token}` } });
        let user = responseUser.data;
        //Set the only element in created array to a constant
    
        console.log(user,response.data.pets);
        //Create an Array containting the pet object with the matching ID
        let pets = response.data.pets;
        //Set the only element in created array to a constant
        const pet = pets[0];
        writeToDiv(user, pet);
    });
}
// write information to html divs passing in pet const
function writeToDiv(user, pet) {
    document.getElementById('loading').style.display = 'none';

    document.getElementById('nameOfUser').innerHTML = `<h5 class="card-title" id="nameOfUser">${user.firstName} ${user.lastName}`;
    document.getElementById('userEmail').innerHTML = `<h5 class="card-title" id="nameOfUser" style="font-size:0.775em;">${user.email}`;
    document.getElementById('listOfUserPets').innerHTML = `<p class="card-text" id="listOfUserPets">
        <a style="text-decoration:none;" class="link-dark" href="petDetail.html?petID=${pet.petID}"><mark style="border-radius: 10px;">${pet.petName}</a></mark>`;

};




document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);