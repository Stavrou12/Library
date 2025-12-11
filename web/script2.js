/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("LibrarianListForm").addEventListener("submit", function (event) {
        event.preventDefault();
        fetchLibData();
    });
});

function fetchLibData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "LibListServlet", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var LibListDiv = document.getElementById("LibList");
            LibListDiv.style.display = "block";
            LibListDiv.innerHTML = "";

            data.forEach(function (user) {
                var LibDiv = document.createElement("div");
                LibDiv.textContent = "Librarian ID: " + user.library_id +
                        ", Username: " + user.username +
                        ", Password: " + user.password; // Not recommended for production use
                LibListDiv.appendChild(LibDiv);
            });
        }
    };

    xhr.send();
}