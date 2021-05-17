  // Your web app's Firebase configuration

  var firebaseConfig = {
    apiKey: "AIzaSyBYfqYMtDXFQwUOVOQQkkdJua9pr5WnUZE",
    authDomain: "todo-list-8a6e1.firebaseapp.com",
    projectId: "todo-list-8a6e1",
    storageBucket: "todo-list-8a6e1.appspot.com",
    messagingSenderId: "562054752866",
    appId: "1:562054752866:web:20c336c97eec297cbfff3b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


//functions for cross hover state
function showCross(selectedCross) {
    var cross = selectedCross.lastElementChild;
    cross.style.display = "block";
}
function hideCross(selectedCross) {
    var cross = selectedCross.lastElementChild;
    cross.style.display = "none";
}
//functions for creating new tasks
const container = document.getElementById("main-container");
const input = document.getElementById("userInput");

function newTaskEntered() {
  storeData();

}
function storeData() {
    db.collection("tasks").add({
        taskName: input.value
    });
    restrieveItems()
    container.innerHTML = ""
}


// Retrieving and returning firebase data
function restrieveItems(){
    db.collection('tasks').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            returnRetrievedItems(doc)
        })
    })
}
function returnRetrievedItems(doc) {
    tasksFromDB = doc.data().taskName;
    container.innerHTML += `    
    <div class="flex items-center item" onmouseover="showCross(this)" onmouseout="hideCross(this)" data-id="${doc.id}">
    <div class="w-6 h-6 m-4 rounded-full border-black border-solid border-2 hover:border-green-300" onclick="taskCompleted(this)">
      <img src="images/icon-check.svg" alt="" class="mx-auto my-1.5">
    </div>
    <h2 class="text-green-400">${tasksFromDB}</h2>
    <img src="images/icon-cross.svg" alt="" class="ml-auto mr-6 hidden"  onclick="deleteItem(this)">
  </div>
  `;
    input.value = "";
    itemLeft();
}

//Deleting items locally and firebase 
function deleteItem(elementToBeDeleted) {
    let documentsID = elementToBeDeleted.parentElement.getAttribute('data-id')
    db.collection('tasks').doc(documentsID).delete();
    elementToBeDeleted.parentElement.remove();
    itemLeft() 
}



function taskCompleted(completedTask) {
    completedTask.classList.toggle("bg-purple-400");
    completedTask.classList.toggle("border-purple-400");

    completedTask.nextElementSibling.classList.toggle("line-through");
    itemLeft()
}

function itemLeft() {
    var itemsLeft = document.getElementById("itemsLeft");
    var itemCount = document.getElementById("main-container").childElementCount +1;
    var container = document.getElementById("main-container");
    var i;
    var x = container.getElementsByClassName("bg-purple-400").length;
    for (i = 0; i < itemCount; i++) {
    itemsLeft.innerText = `Tasks left: ${i-x}`;
    };
}
