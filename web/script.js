/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userListForm").addEventListener("submit", function (event) {
        event.preventDefault();
        fetchUserData();
    });
});

function fetchUserData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "UserListServlet", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var userListDiv = document.getElementById("userList");
            userListDiv.style.display = "block";
            userListDiv.innerHTML = "";

            data.forEach(function (user) {
                var userDiv = document.createElement("div");
                userDiv.textContent = "User ID: " + user.user_id +
                        ", Username: " + user.username +
                        ", Password: " + user.password;
                userListDiv.appendChild(userDiv);

            });
        }
    };

    xhr.send();
}