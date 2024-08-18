
function writeForm() {
  document.getElementById('formDiv').innerHTML = `
<div id="BackToUser">
<button onclick="window.location.href='userDetail.html'">Back to User Details</button>
</div>
<form id='addPetForm'>
  <div class="mb-3">
    <label for="petNameField" class="form-label">Pet Name</label>
    <input type="text" class="form-control" id="petNameField" name="petName">
  </div>
  <div class="mb-3">
    <label for="petTypeField" class="form-label">Pet Type</label>
    <input type="text" class="form-control" id="petTypeField" name="petType">
  </div>
  <div class="mb-3">
    <label for="petBreedField" class="form-label">Pet Breed</label>
    <input type="text" class="form-control" id="petBreedField" name="petBreed">
  </div>
  <div class="mb-3">
    <label for="petSexField" class="form-label">Pet Gender</label>
    <input type="text" class="form-control" id="petSexField" name="petSex">
  </div>
  <div class="mb-3">
    <label for="petWeightField" class="form-label">Pet Weight</label>
    <input type="text" class="form-control" id="petWeightField" name="petWeight">
  </div>
  <div class="mb-3">
    <label for="petDoBField" class="form-label">Pet Date of Birth</label>
    <input type="date" class="form-control" id="petDoBField" name="petDoB">
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3">Add Pet</button>
  </div>
</form>`;

  createPet();
}

const createPet = function () {
  document.getElementById('addPetForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    let petName = document.getElementById('petNameField').value;
    let petType = document.getElementById('petTypeField').value;
    let petSex = document.getElementById('petSexField').value;
    let petBreed = document.getElementById('petBreedField').value;
    let petWeight = document.getElementById('petWeightField').value;
    let petDOB = document.getElementById('petDoBField').value;

    let newPet = {
      petName: petName,
      petType: petType,
      petSex: petSex,
      petBreed: petBreed,
      petWeight: petWeight,
      petDOB: petDOB,  
      user: userID,
      medications : []
    };

    try {
      const response = await axios.post('http://localhost:3000/api/pet', newPet, {
        headers: { Authorization: `Bearer ${api.token}` }  // Ensure correct string interpolation for Authorization
      });

      if (response.status === 200) {
        alert('Pet added successfully');
        window.location.href = 'userDetail.html';
      } 
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the pet. Please try again.');
    }
  });
}

// Ensure the form is written before trying to attach event listeners
document.addEventListener('DOMContentLoaded', writeForm, false);
