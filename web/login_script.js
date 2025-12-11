/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function on_load() {
    isLoggedIn();
}

function login_post() {
    const user1 = document.querySelector("#UserTYPE").value;
    var data = $("#myForm").serialize();
    // $("#myForm")[0].reset();
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (user1 === "student") {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg-login").innerText = "Συνδεθηκατε";
            window.location.href = './user_data.html';
        } else if (xhttp.status === 401) {
            document.getElementById("msg-login").style.color = "red";
            document.getElementById("msg-login").innerText = "Λαθος στοιχεία";
            }
        }
        if (user1 === "library") {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
                document.getElementById("msg-login").innerText = "Συνδεθηκατε";
                window.location.href = './libdata.html';
            } else if (xhttp.status === 401) {

                document.getElementById("msg-login").style.color = "red";
                document.getElementById("msg-login").innerText = "Λαθος στοιχεία";
            }
        }

        if (user1 === "admin") {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
                document.getElementById("msg-login").innerText = "Συνδεθηκατε";
                window.location.href = './admindata.html';
            } else if (xhttp.status === 401) {

                document.getElementById("msg-login").style.color = "red";
                document.getElementById("msg-login").innerText = "Λαθος στοιχεία";
            }
        }

    };
    const user = document.querySelector("#UserTYPE").value;
    if (user === "student") {
    xhttp.open("POST", "servlet_login");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    }
    if (user === "library") {
        xhttp.open("POST", "servlet_lib");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }
    if (user === "admin") {
        xhttp.open("POST", "admin_login");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }



}


function gotoform() {
    window.location.href = './index.html';
}
function isLoggedIn() {
    const user = document.querySelector("#UserTYPE").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //  $("#info-user").show();
            document.getElementById("msg-login").style.color = "rgb(0, 0, 153)";
            document.getElementById("msg-login").innerText = "Ειστε συνδεδεμενος";
            if (user === "student") {
                window.location.href = './user_data.html';
            }
            if (user === "library") {
                window.location.href = './libdata.html';
            }
            if (user === "admin") {
                window.location.href = './admindata.html';
            }

        } else if (xhr.status !== 200) {
        }
    };
    xhr.open("GET", "Login");
    xhr.send();
}
function redirectToGuest() {
    window.location.href = 'guest.html';
}