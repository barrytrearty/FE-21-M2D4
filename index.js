const body = document.getElementsByTagName("body")[0];
const firstPage = document.getElementById("first-page");
const listTextArea = document.getElementById("list-text-area");
const teamsInput = document.getElementById("teams-input");

let listArray;
let nameContainer;
let teamContainer;
let assignButtonContainer;
let undoButtonContainer;
let undoArray = [];
let maxPerTeam;
let nameRow;

const createListArray = function (value) {
  listArray = value.split(",");
  return listArray;
};

const displayListArray = function (array) {
  nameContainer = document.createElement("div");
  nameContainer.innerHTML = "<h2>Name List</h2>";
  nameContainer.classList.add("container");
  nameRow = document.createElement("div");
  nameRow.classList.add("row");
  for (i = 0; i < array.length; i++) {
    let nameItem = document.createElement("div");
    nameItem.innerText = array[i];
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
      //   "col-md-2",
      "team-square"
    );
    teamRow.appendChild(newTeam);
  }
  teamContainer.appendChild(teamRow);
  body.appendChild(teamContainer);
};

const selectNextTeam = function () {
  let randomNumber = Math.floor(Math.random() * teamsInput.value + 1);
  let selectedTeam1 = document.getElementById(`team${randomNumber}`);
  let selectedTeamLength = document.querySelectorAll(
    `#team${randomNumber} div`
  ).length;
  console.log(selectedTeam1);
  console.log(
    `randomNumber: ${randomNumber}, selectedTeamLength: ${selectedTeamLength}, maxPerTeam: ${maxPerTeam}`
  );
  while (selectedTeamLength >= maxPerTeam) {
    randomNumber = Math.floor(Math.random() * teamsInput.value + 1);
    selectedTeam1 = document.getElementById(`team${randomNumber}`);
    selectedTeamLength = document.querySelectorAll(
      `#team${randomNumber} div`
    ).length;
  }
  return selectedTeam1;
};

const moveNameFromListToTeam = function () {
  let nameSquares = document.getElementsByClassName("name-square");

  if (nameSquares.length > 0) {
    let lastName = listArray.shift();
    undoArray.push(lastName);
    console.log(undoArray);
    let selectedTeam = selectNextTeam();
    let newTeamMember = document.createElement("div");
    newTeamMember.innerHTML = `<li>${lastName}</li>`;
    newTeamMember.id = `${lastName}`;
    selectedTeam.appendChild(newTeamMember);
    nameSquares[0].remove();
  } else {
    let assignButton = document.getElementById("assign-btn");
    let undoButton = document.getElementById("undo-btn");
    assignButton.remove();
    undoButton.remove();
    assignButtonContainer.innerHTML = `<h1>All Allocated</h1><div class="row">
    <div class="col text-center">
      <button class="btn btn-dark btn-lg" onclick="window.location.reload()">
        Assign New Teams
      </button>
    </div>
  </div>`;
  }

  if (document.getElementById("undo-btn")) {
    document.getElementById("undo-btn").remove();
  }
  generateUndoButton();
};

const returnNameToList = function (name) {
  listArray.push(`${name}`);
  let returnedNameDiv = document.createElement("div");
  returnedNameDiv.classList.add(
    "col-6",
    "col-xs-4",
    "col-sm-3",
    "col-md-2",
    "name-square"
  );
  returnedNameDiv.innerHTML = `${name}`;
  nameRow.appendChild(returnedNameDiv);
};

const removeNameFromTeam = function () {
  let nameToBeRemoved = undoArray.pop(-1);
  let nameToBeRemovedDiv = document.getElementById(`${nameToBeRemoved}`);
  nameToBeRemovedDiv.remove();
  returnNameToList(nameToBeRemoved);
  console.log(undoArray);
};

// <------------------------------------------------------------------->

const generateAssignButton = function () {
  assignButtonContainer = document.createElement("div");
  assignButtonContainer.innerHTML = `<div id="assign-btn" class="col text-center">
  <button class="btn btn-dark btn-lg mt-5">
    ASSIGN
  </button>
</div>`;
  body.appendChild(assignButtonContainer);
  assignButtonContainer.addEventListener("click", moveNameFromListToTeam);
};

const generateUndoButton = function () {
  undoButtonContainer = document.createElement("div");
  undoButtonContainer.innerHTML = `<div id="undo-btn" class="col text-center">
  <button class="btn btn-dark btn-lg mt-5">
    UNDO
  </button>
</div>`;
  body.appendChild(undoButtonContainer);
  undoButtonContainer.addEventListener("click", removeNameFromTeam);
};

const generateTeamSect = function () {
  firstPage.remove();
  let currentArray = createListArray(listTextArea.value);

  maxPerTeam = listArray.length / teamsInput.value;

  displayListArray(currentArray);
  createTeams(teamsInput.value);
  generateAssignButton();
};

//TO DO: Set undo to reassign someone to different team
//Could do this byfirst slicing the first item of the array before shifting it.
//Store this sliced item in a variable
//Generate a button undo
//If pressed this unshifts the sliced item onto the array and removes it from the team list

//TO DO: Move the Assign button to a more practical place so that it won't move down the page as the teams get made
//TO DO: Use row-cols to make it more even when theres less than 4 teams
