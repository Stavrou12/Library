document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const genre = document.getElementById("genre").value;
        const fromYear = document.getElementById("fromYear").value;
        const toYear = document.getElementById("toYear").value;

        const url = "/A3_4363/search"; // Change this URL if needed
        const params = new URLSearchParams({
            genre: genre
        });
        if (fromYear.trim() !== "") {
            params.append("fromYear", fromYear);
        }

        if (toYear.trim() !== "") {
            params.append("toYear", toYear);
        }
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url + "?" + params, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                // Handle the received JSON data here
                // For example, update a <div> with the results
                const resultsDiv = document.getElementById("results");
                resultsDiv.innerHTML = JSON.stringify(responseData, null, 2);
            } else {
                console.error("Request failed with status:", xhr.status);
            }
        };
        xhr.onerror = function () {
            console.error("Request failed");
        };
        xhr.send();
    });
});

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