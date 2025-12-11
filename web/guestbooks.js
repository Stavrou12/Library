
let clickCount = 0;


document.addEventListener("DOMContentLoaded", function () {
    const fetchAvailableBooksButton = document.getElementById('seeBooksButtonGuest');
    const booksContainer = document.getElementById('booksContainerGuest');

    fetchAvailableBooksButton.addEventListener('click', function () {
        // fetchAvailableBooks();
        if (clickCount === 0) {
            booksContainer.style.display = "block";
            // First click, fetch the books
            fetchAvailableBooks();
        } else if (clickCount === 1) {
            // Second click, clear the container
            booksContainer.style.display = "none";
            document.getElementById('booksContainerGuest').innerHTML = '';
        } else if (clickCount === 2) {
            // Third click, reset the click count and start from the beginning
            clickCount = 0; // Reset to -1 so it becomes 0 on the next click
            document.getElementById('booksContainerGuest').innerHTML = '';
            booksContainer.style.display = "block";
            fetchAvailableBooks();
        }

        clickCount++; // Increment the click count   
    });

    function fetchAvailableBooks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'GuestBooksServlet', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    displayBooks(response);
                } else {
                    console.error('Request failed:', xhr.status, xhr.statusText);
                }
            }
        };

        xhr.send();

    }

    function displayBooks(books) {
        booksContainer.innerHTML = '';
        books.forEach(book => {
            if (book.available === "true") {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <h3> ${book.title} </h3>
                    <p>ISBN: ${book.isbn}</p>
                    <p>Library ID: ${book.library_id}</p>
                    <p>Available: ${book.available}</p>
                `;
                booksContainer.appendChild(bookDiv);
            }
        });
    }
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
