const stateInputField = document.getElementById("stateInputField");
const lgaInputField = document.getElementById("lgaInputField");

const state = document.getElementById("state");
const lga = document.getElementById("lga");

const lga_name = document.getElementById("lga_name");
const lga_description = document.getElementById("lga_description");
const overall_total = document.getElementById("overall_total");
const state_name = document.getElementById("state_name");
const total_polling_units_count = document.getElementById("total_polling_units_count");

const entered_by_user = document.getElementById("entered_by_user");
const date_entered = document.getElementById("date_entered");
const user_ip_address = document.getElementById("user_ip_address");

const parties_score_view = document.getElementById("parties_score_view");

const getAllStateUrl = "http://18.130.90.129:9000/states";
const getAllLgaUrl = "http://18.130.90.129:9000/lga";
const getAllTotalResultUrl = "http://18.130.90.129:9000/total-polling-unit";


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

function onLgaChange(lga_value) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${getAllWardUrl}/${lga_value}`);
    xhr.onload = function() {
        if(xhr.status == 200) {

            let data = JSON.parse(this.response);

            lga_name.innerHTML = data.lga_name;
            lga_description.innerHTML = data.lga_description;
            state_name.innerHTML = data.state.state_name;
            total_polling_units_count.innerHTML = data.total_polling_units_count;
            overall_total.innerHTML = data.overall_total;

            entered_by_user.innerHTML = data.entered_by_user;
            date_entered.innerHTML = data.date_entered;
            user_ip_address.innerHTML = data.user_ip_address;

            const {parties_score} = data;
            if(parties_score.length > 0) {
                let scores = ``;
                for (let i = 0; i<parties_score.length; i++){
                    let opt = document.createElement('option');
                    opt.value = data[i].ward_id;
                    opt.innerHTML = data[i].ward_name;
                    wardInputField.appendChild(opt);
                    scores += `
                    <span>${parties_score[i].party_abbreviation} - ${parties_score[i].total_party_score}</span>
                    `
                }
                parties_score_view.innerHTML = scores;
            }
        }
    };
    xhr.send();
}