//getting all required elements

const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todo-class-list")
const deleteAllBtn = document.querySelector(".footer button")


inputBox.onkeyup = ( ) => {

    let userData = inputBox.value;    //getting user entered value

    if(userData.trim( ) != 0) {  //if user values aren't only spaces

        addBtn.classList.add("active"); // active the button color

    }else{
        addBtn.classList.remove("active"); // remove the button color
    }
}

  showTasks();   //calling showTasks function

//if user click on the add button

addBtn.onclick = ( ) => {
    let userData =  inputBox.value;    //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting the localstroage
    if(getLocalStorage == null) { //if localstroage is null

        listArr =[ ]; // creating blank array

    } else{
        listArr = JSON.parse(getLocalStorage);   //transforing json  string into a js object

    }

    listArr.push(userData);  //pushing or adding user  data
    localStorage.setItem("New Todo",  JSON.stringify(listArr));     //transforing js object into a json string
     showTasks();   //calling showTasks function
     addBtn.classList.remove("active"); // remove the button color
}

//function to add task list inside ul

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting the localstroage
    
    if(getLocalStorage == null) { //if localstroage is null

        listArr =[ ]; // creating blank array

    } else{
        listArr = JSON.parse(getLocalStorage);   //transforing json  string into a js object

    }

    const pendingNub = document.querySelector(".pendingNub");
    pendingNub.textContent = listArr.length;    //passing the length value in pending

    if(listArr.length > 0) { //if array length is greater then is 0

        deleteAllBtn.classList.add("active"); //unactive the clear all button

    }else{

        deleteAllBtn.classList.remove("active");
        
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
          
    newLiTag += ` <li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;

    });


    todoList.innerHTML = newLiTag; //adding new tag inside ul tag

    inputBox.value = ""; //once task added leave the input field blank
}


//delete task function

 function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); 
   
    listArr = JSON.parse(getLocalStorage); 

    listArr.splice(index, 1);  //delete or remove the particular index li   
    
    // after remove the li again update the localStorage
    localStorage.setItem("New Todo",  JSON.stringify(listArr));     //transforing js object into a json string
   
    showTasks();   //calling showTasks function
}



//delete all tasks function

deleteAllBtn.onclick = () => {
    listArr = []; //empty an array

        // after delete all task again update the localStorage
        localStorage.setItem("New Todo",  JSON.stringify(listArr));     //transforing js object into a json string
   
        showTasks();   //calling showTasks function
}