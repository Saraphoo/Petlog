//Function to get json
async function fetchFunction(){
  // Fetch the JSON 
  const response = api.GET(quotes.documentID, async function(response) { 
      const userID = getAllUrlParams().userid;
      //Create an Array containting the medication object with the matching ID
      let responseUser = await axios.get('http://localhost:3000/api/user/info',
      { headers: { Authorization: `Bearer ${api.token}` } });
      let user = responseUser.data;
      
      //Set the only element in created array to a constant
      
      writeForm(user);
     }); 
     
}

function writeForm(user){
document.getElementById('formDiv').innerHTML +=`
<div id="BackToUser">
<a href="userDetail.html?userID=${user.userID}">Back to User Details</a>
</div>
<form>
<div class="mb-3">
<label for="petNameFeild" class="form-label">Pet Name</label>
<input type="petName" class="form-control" id="petNameFeild" name="petName">
</div>
<div class="mb-3">
<label for="petTypeFeild" class="form-label">Pet Type</label>
<input type="petType" class="form-control" id="petTypeFeild" name="petType">
</div>
<div class="mb-3">
<label for="petBreedFeild" class="form-label">Pet Breed</label>
<input type="petBreed" class="form-control" id="petBreedFeild" name="petBreed">
</div>
<div class="mb-3">
<label for="petSexFeild" class="form-label">Pet Gender</label>
<input type="petSex" class="form-control" id="petSexFeild" name="petSex">
</div>
<div class="mb-3">
<label for="petWeightFeild" class="form-label">Pet Weight</label>
<input type="petWeight" class="form-control" id="petWeightFeild" name="petWeight">
</div>
<div class="mb-3">
<label for="petDoBFeild" class="form-label">Pet Date of Birth</label>
<input type="petDoB" class="form-control" id="petDoBFeild" name="petDoB">
</div>
<div class="col-auto">
<button type="submit" class="btn btn-primary mb-3">Add Pet</button>
</div></div>
</form>`
createPet();
};

const createPet = function(){
  document.querySelector('form').addEventListener('submit',function(e){
      e.preventDefault();
      api.GET(quotes.documentID, async function (response) {
      let petName=document.querySelector('form input[name=petName]');
      let petType=document.querySelector('form input[name=petType]');
      let petSex=document.querySelector('form input[name=petSex]');
      let petBreed=document.querySelector('form input[name=petBreed]');
      let petWeight=document.querySelector('form input[name=petWeight]');
      let petDoB=document.querySelector('form input[name=petDoB]');
      let newPet={
          //Add Pet ID
          petID: Math.floor(Math.random() * 1000000),
          petName: petName.value,
          petType: petType.value,
          petSex: petSex.value,
          petBreed: petBreed.value,
          petWeight: petWeight.value,
          petDoB: petDoB.value
      }
      response.data.pets.push(newPet);
      const data = response.data;
      api.PUT(quotes.documentID, data , function(response){
        console.log(response);
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);