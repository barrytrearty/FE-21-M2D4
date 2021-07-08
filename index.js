const body = document.getElementsByTagName("body")[0];
const firstButton = document.getElementById("first-button");
const firstPage = document.getElementById("first-page");
const listTextArea = document.getElementById("list-text-area");
const teamsInput = document.getElementById("teams-input");
let listSect;
let teamSect;

let listArray;
let nameContainer;
let teamContainer;

const getListArray = function (value) {
  nameContainer = document.createElement("div");
  nameContainer.innerHTML = "<h2>Name List</h2>";
  nameContainer.classList.add("container");
  listArray = value.split(",");
  let nameRow = document.createElement("div");

  nameRow.classList.add("row");
  for (i = 0; i < listArray.length; i++) {
    let nameItem = document.createElement("div");
    nameItem.innerText = listArray[i];
    nameItem.classList.add(
      "col-6",
      "col-xs-4",
      "col-sm-3",
      "col-md-2",
      "name-square"
    );
    nameRow.appendChild(nameItem);
  }
  nameContainer.appendChild(nameRow);
  //   console.log(array);
  body.appendChild(nameContainer);
};

const createTeams = function (value) {
  teamContainer = document.createElement("div");
  teamContainer.innerHTML = "<h2>Teams</h2>";
  teamContainer.classList.add("container");
  let teamRow = document.createElement("div");
  teamRow.classList.add("row");
  for (j = 0; j < value; j++) {
    let newTeam = document.createElement("div");
    newTeam.innerHTML = `Team ${j + 1}<ul id="team${j + 1}"></ul>`;
    newTeam.classList.add(
      "col-6",
      "col-xs-4",
      "col-sm-3",
      "col-md-2",
      "team-square"
    );
    teamRow.appendChild(newTeam);
  }
  teamContainer.appendChild(teamRow);
  body.appendChild(teamContainer);
};
// let x = 0;

const moveToTeam = function () {
  let nameSquares = document.getElementsByClassName("name-square");

  if (nameSquares.length > 0) {
    let lastName = listArray.shift();
    let randomNumber = Math.floor(Math.random() * teamsInput.value + 1);
    let selectedTeam = document.getElementById(`team${randomNumber}`);
    let newTeamMember = document.createElement("div");
    newTeamMember.innerHTML = `<li>${lastName}</li>`;
    selectedTeam.appendChild(newTeamMember);
    nameSquares[0].remove();
    // x++;
    // console.log(x);
    //   console.log(randomNumber);
  } else {
    let assignButton = document.getElementById("assign-btn");
    assignButton.remove();
    assignButtonContainer.innerHTML = `<h1>All Allocated</h1><button onClick="window.location.reload();">Assign New Teams</button>`;
  }
};

// moveToTeam();
let assignButtonContainer;

const generateAssignButton = function () {
  assignButtonContainer = document.createElement("div");
  assignButtonContainer.innerHTML = `<div id="assign-btn" class="col text-center">
  <button class="btn btn-dark btn-lg mt-5">
    ASSIGN
  </button>
</div>`;
  body.appendChild(assignButtonContainer);
  assignButtonContainer.addEventListener("click", moveToTeam);
};

const generateTeamSect = function () {
  firstPage.remove();
  getListArray(listTextArea.value);
  createTeams(teamsInput.value);
  generateAssignButton();
};
