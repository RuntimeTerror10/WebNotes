const noContentDiv = document.querySelector(".no-content");
const notesContainer = document.querySelector(".notes-container");
const textBox = document.getElementById("notes");
var showCheckBox = document.querySelector("#all-notes");
const allNotes = document.querySelector(".show-all-notes");
const allNotesContainer = document.querySelector(".all-notes-container");
const noNotesText = document.querySelector(".no-notes");

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  var currentUrl = tabs[0].url;

  if (localStorage.getItem(currentUrl) === null) {
    window.addEventListener("keydown", (e) => {
      if ((e.key = "Enter")) {
        hideNoContentDiv();
        displayNotesContaniner();
        textBox.focus();
      }
    });
  } else {
    /*
     */
    hideNoContentDiv();
    displayNotesContaniner();
    let str = JSON.parse(window.localStorage.getItem(currentUrl));
    textBox.value = str;
    allNotes.style.display = "block";
  }
  textBox.addEventListener("blur", () => {
    var userNotes = textBox.value;
    if (userNotes.length >= 2) {
      storeNotes(currentUrl, userNotes);
    } else {
      showNoContenDiv();
      hideDisplayNotes();
    }
  });
  showCheckBox.addEventListener("change", () => {
    if (showCheckBox.checked === true) {
      hideDisplayNotes();
      hideNoContentDiv();
      allNotesContainer.style.display = "block";
      var urlKeys = [];
      for (let key in localStorage) {
        urlKeys.push(key);
      }
      var currentOpenedSite = new URL(currentUrl);
      var currentHostName = currentOpenedSite.hostname;
      for (let i = 0; i < urlKeys.length; i++) {
        var tempUrl = new URL(urlKeys[i]);
        var tempHostName = tempUrl.hostname;
        var dispUrl = tempUrl.href.replace(/(^\w+:|^)\/\//, "");

        if (currentHostName == tempHostName) {
          /**/
          var pageNotes = JSON.parse(window.localStorage.getItem(tempUrl));
          var noteTab = document.createElement("details");
          noteTab.innerHTML = `<summary>${dispUrl}</summary><p>${pageNotes}</p>`;
          allNotesContainer.appendChild(noteTab);
        } else {
          console.log("not a match");
        }
      }
    } else {
      if (localStorage.getItem(currentUrl) === null) {
        showNoContenDiv();
      } else {
        displayNotesContaniner();
      }
      hideNresetAllNotes();
    }
  });
});
function showNoContenDiv() {
  noContentDiv.style.display = "block";
}
function hideNoContentDiv() {
  noContentDiv.style.display = "none";
}
function storeNotes(url, notes) {
  window.localStorage.setItem(url, JSON.stringify(notes));
}
function displayNotesContaniner() {
  notesContainer.style.display = "block";
}
function hideDisplayNotes() {
  notesContainer.style.display = "none";
}
function hideNresetAllNotes() {
  allNotesContainer.style.display = "none";
  allNotesContainer.innerText = "";
  allNotesContainer.innerHTML = "";
}
