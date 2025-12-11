/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var i = 0;
var j = 0;


function removestudent() {

    if (i === 0) {
    document.getElementById("st1").style.display = "flex";
        document.getElementById("lib1").style.display = "none";
        i = 1;
    } else if (i === 1) {
        document.getElementById("st1").style.display = "none";
        i = 0;
    }
}

function removelib() {
    if (j === 0) {
    document.getElementById("lib1").style.display = "flex";
        document.getElementById("st1").style.display = "none";
        j = 1;
    } else if (j === 1) {
        document.getElementById("lib1").style.display = "none";
        j = 0;
    }

}

function remove() {
    var data = $("#dels").serialize();
    console.log(data);
    if (data["user_id"] === "") {
        console.log("wiuhe");
        return 0;
    }
    //var data = document.getElementById("stid").value;
    // let myForm = document.getElementById('dels');
    //  let formData = new FormData(myForm);
    // const data = {};
    // formData.forEach((value, key) => (data[key] = value));
    // console.log(jsonData);
    //var jsonData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("msg").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg").innerText = "Διαγραφηκε επιτυχως";

        } else if (xhr.status === 401) {
            document.getElementById("msg").style.color = "red";
            document.getElementById("msg").innerText = "Αδυναμια διαγραφης";
        } /*else if (xhr.status === 403) {
            document.getElementById("msg").style.color = "red";
            document.getElementById("msg").innerText = "Αδυναμια διαγραφης, student is borrowing";
        } */
    };

    xhr.open('POST', 'admin_deletestudent');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function remove2() {
    var data = $("#dell").serialize();
    console.log(data);
    if (data["library_id"] === "") {
        console.log("wiuhe");
        return 0;
    }
    //var data = document.getElementById("stid").value;
    // let myForm = document.getElementById('dels');
    //  let formData = new FormData(myForm);
    // const data = {};
    // formData.forEach((value, key) => (data[key] = value));
    // console.log(jsonData);
    //var jsonData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("msg2").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg2").innerText = "Διαγραφηκε επιτυχως";

        } else if (xhr.status === 401) {
            document.getElementById("msg2").style.color = "red";
            document.getElementById("msg2").innerText = "Αδυναμια διαγραφης";
        } /*else if (xhr.status === 403) {
            document.getElementById("msg2").style.color = "red";
            document.getElementById("msg2").innerText = "Αδυναμια διαγραφης, librarian has at booksinlibraries table";
        }*/
    };

    xhr.open('POST', 'admin_deletelib');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = "./login_form.html";
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'servlet_Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}
const usernamesContainer = document.getElementById("usernamesContainer");

function fetchUsernames() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "FetchUsernamesServlet", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const usernames = JSON.parse(xhr.responseText);
                displayUsernames(usernames);
            } else {
                console.error("Request failed:", xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send();
}
function displayUsernames(usernames) {
    const usernamesContainer = document.getElementById("usernamesContainer");
    usernamesContainer.innerHTML = ""; // Clear previous results

    usernames.forEach(username => {
        const usernameDiv = document.createElement("div");
        usernameDiv.textContent = username;
        usernamesContainer.appendChild(usernameDiv);
    });
}


// Fetch usernames when the page loads
fetchUsernames();