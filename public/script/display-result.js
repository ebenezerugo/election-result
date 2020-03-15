const stateInputField = document.getElementById("stateInputField");
const lgaInputField = document.getElementById("lgaInputField");
const wardInputField = document.getElementById("wardInputField");
const pollingUnitInputField = document.getElementById("pollingUnitInputField");
const result = document.getElementById("result");

const state = document.getElementById("state");
const lga = document.getElementById("lga");
const ward = document.getElementById("ward");
const pollingUnit = document.getElementById("pollingUnit");

// Initially do not display this elements.
// lga.parentNode.removeChild(lga); 
// ward.parentNode.removeChild(ward); 
// pollingUnit.parentNode.removeChild(pollingUnit); 
result.parentNode.removeChild(result); 

// if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }

const getAllStateUrl = "http://18.130.90.129:9000/states";
const getAllLgaUrl = "http://18.130.90.129:9000/lga";
const getAllWardUrl = "http://18.130.90.129:9000/wards";
const getAllPuUrl = "http://18.130.90.129:9000/polling-units";


(function fetchStates () {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", getAllStateUrl);
    xhr.onload = function() {
        if(xhr.status == 200) {
            let data = JSON.parse(this.response);

            // Load the state into the select options
            for (let i = 0; i<data.length; i++){
                let opt = document.createElement('option');
                opt.value = data[i].state_id;
                opt.innerHTML = data[i].state_name;
                stateInputField.appendChild(opt);
            }
        }
    };
    xhr.send();
})();
// fetchStates();

// When state changes load lga
function onStateChange(state_value) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${getAllLgaUrl}/${state_value}`);
    xhr.onload = function() {
        if(xhr.status == 200) {
        
            let data = JSON.parse(this.response);
            console.log(data);

            if(data.length > 0) {
                // Load the state into the select options
                for (let i = 0; i<data.length; i++){
                    let opt = document.createElement('option');
                    opt.value = data[i].lga_id;
                    opt.innerHTML = data[i].lga_name;
                    lgaInputField.appendChild(opt);
                }
            }
        }
    };
    xhr.send();
}

// When lga changes load wards
function onLgaChange(lga_value) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${getAllWardUrl}/${lga_value}`);
    xhr.onload = function() {
        if(xhr.status == 200) {
        
            let data = JSON.parse(this.response);
            console.log(data);

            if(data.length > 0) {
                // Load the state into the select options
                for (let i = 0; i<data.length; i++){
                    let opt = document.createElement('option');
                    opt.value = data[i].ward_id;
                    opt.innerHTML = data[i].ward_name;
                    wardInputField.appendChild(opt);
                }
            }
        }
    };
    xhr.send();
}

// When wards changes load pu.
function onLgaChange(ward_value) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${getAllPuUrl}/${ward_value}`);
    xhr.onload = function() {
        if(xhr.status == 200) {
        
            let data = JSON.parse(this.response);
            console.log(data);

            if(data.length > 0) {
                // Load the state into the select options
                for (let i = 0; i<data.length; i++){
                    let opt = document.createElement('option');
                    opt.value = data[i].uniqueid;
                    opt.innerHTML = data[i].polling_unit_name;
                    pollingUnitInputField.appendChild(opt);
                }
            }
        }
    };
    xhr.send();
}

  function login() {
    
    const json = {
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
        phone: null
    };

    let data = JSON.stringify(json);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (xhr.status == 200) {
        let response = JSON.parse(this.response);
        // VALID
        
        if (response.status) {
            localStorage.setItem('key', response.token);
            buttonStatus(false);
            // @TODO - WHERE TO REDIRECT THE USER ON SIGN IN?
            location.href = `${appUrl}/auth/${response.token}`;
        }
        // INVALID EMAIL/PASSWORD
        else {
          $('.response-message').html(`${response.message}`);
            buttonStatus(false);
        }
      } else {
          let response = JSON.parse(xhr.response);
          console.log(response);
        alert("SERVER ERROR!");
        buttonStatus(false)
      }
    };
    xhr.onprogress = (event) => {
        // event.loaded returns how many bytes are downloaded
        // event.total returns the total number of bytes
        // event.total is only available if server sends `Content-Length` header

        // console.log(`Downloaded ${event.loaded} of ${event.total}`);
        buttonStatus(true);
    }

    xhr.send(data);
    return false;
  }