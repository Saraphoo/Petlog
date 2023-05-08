//Function to get json
async function fetchFunction(){
    // Fetch the JSON 
    const response = api.GET(quotes.documentID, async function(response) { 
        const petID = getAllUrlParams().petid;
        //Create an Array containting the medication object with the matching ID
        let responseUser = await axios.get('http://localhost:3000/api/user/info',
        { headers: { Authorization: `Bearer ${api.token}` } });
        
        //Set the only element in created array to a constant
        
        writeForm(petID);
       }); 
       
  }
  
  function writeForm(petID){
  document.getElementById('formDiv').innerHTML +=`
  <div id="BackToPet">
  <a href="userDetail.html?petID=${petID}">Back to User Details</a>
  </div>
  <form>
  <div class="mb-3">
  <label for="medNameFeild" class="form-label">Medication Name</label>
  <input type="medName" class="form-control" id="medNameFeild" name="medName">
  </div>
  <div class="mb-3">
  <label for="medTypeFeild" class="form-label">Medicaiton Type</label>
  <input type="medType" class="form-control" id="medTypeFeild" name="medType">
  </div>
  <div class="mb-3">
  <label for="medDosageFeild" class="form-label">Medication Dosage</label>
  <input type="medDosage" class="form-control" id="medDosageFeild" name="medDosage">
  </div>
  <div class="mb-3">
  <label for="numberOfDailyDosesFeild" class="form-label">Number of Daily Doses</label>
  <input type="numberOfDailyDoses" class="form-control" id="numberOfDailyDosesFeild" name="numberOfDailyDoses">
  </div>
  <div class="col-auto">
  <button type="submit" class="btn btn-primary mb-3">Add Medicaiton</button>
  </div></div>
  </form>`
  createMed();
  };
  
  const createMed = function(){
    document.querySelector('form').addEventListener('submit',function(e){
        e.preventDefault();
        api.GET(quotes.documentID, async function (response) {
        const petID = getAllUrlParams().petid;
        let medName=document.querySelector('form input[name=medName]');
        let medType=document.querySelector('form input[name=medType]');
        let medDosage=document.querySelector('form input[name=medDosage]');
        let numberOfDailyDoses=document.querySelector('form input[name=numberOfDailyDoses]');
        let newMed={
            medID: Math.floor(Math.random() * 1000000),
            petID: petID,
            medName: medName.value,
            medType: medType.value,
            medDosage: medDosage.value,
            numberOfDailyDoses: numberOfDailyDoses.value,
        }
        response.data.medications.push(newMed);
        const data = response.data;
        api.PUT(quotes.documentID, data , function(response){
          console.log(response);
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);