document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("NewBookBtn").addEventListener("click", function () {
        var addBookBtn = document.getElementById("NewBookBtn");
        var bookForm = document.getElementById("NewBookForm");
        bookForm.style.display = "block";
        addBookBtn.style.display = "none";
    });

    document.getElementById("NewBookForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var isbn = document.getElementById("isbn").value;
        var title = document.getElementById("title").value;
        var authors = document.getElementById("authors").value;
        var genre = document.getElementById("genre").value;
        var pages = parseInt(document.getElementById("pages").value);
        var publicationyear = parseInt(document.getElementById("publicationyear").value);
        var url = document.getElementById("url").value;
        var photo = document.getElementById("photo").value;

        var bookData = {
            isbn: isbn,
            title: title,
            authors: authors,
            genre: genre,
            pages: pages,
            publicationyear: publicationyear,
            url: url,
            photo: photo
        };

        // Send the book data to the server using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "AddBookServlet", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("mes").textContent = response.message;
            }
        };
        xhr.send(JSON.stringify(bookData));
    });
});



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("NewBookInLibBtn").addEventListener("click", function () {
        var addBookBtn = document.getElementById("NewBookInLibBtn");
        var bookForm = document.getElementById("NewBookLibForm");

        bookForm.style.display = "block";
        addBookBtn.style.display = "none";

    });

    document.getElementById("NewBookLibForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var isbn = document.getElementById("isbn").value;
        var library_id = document.getElementById("library_id").value;
        var available = document.getElementById("available").value;

        var bookData = {
            isbn: isbn,
            library_id: library_id,
            available: available
        };

        // Send the book data to the server using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "booksinlibraries", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("mes2").textContent = response.message;
            }
        };
        xhr.send(JSON.stringify(bookData));
    });
});

function ISBN() {
    console.log("mphke sthn func");
    var mydata = $("#NewBookForm").serialize();
    if (mydata["isbn"] === "") {
        return 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var bookb = document.getElementById("submitbook");

            bookb.style.display = "block";
            document.getElementById('reqisbn').innerText = "";

        } else if (xhr.status === 403) {
            var bookb = document.getElementById("submitbook");

            bookb.style.display = "none";
            document.getElementById("reqisbn").style.color = "red";
            document.getElementById('reqisbn').innerText =
                    'Αυτό το isbn υπάρχει ήδη sta books,παρακαλώ επιλέξετε ένα άλλο';
        }
    };
    xhr.open('POST', 'ServletIsbn');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);

}


function ISBN2() {
    console.log("mphke sthn func");
    var mydata = $("#NewBookLibForm").serialize();
    if (mydata["isbn"] === "") {
        return 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var bookb = document.getElementById("submitbook2");

            bookb.style.display = "block";
            document.getElementById('reqisbn2').innerText = "";
        } else if (xhr.status === 403) {
            var bookb = document.getElementById("submitbook2");

            bookb.style.display = "none";
            document.getElementById("reqisbn2").style.color = "red";
            document.getElementById('reqisbn2').innerText =
                    'Αυτό το isbn υπάρχει ήδη,παρακαλώ επιλέξετε ένα άλλο';
        }
    };
    xhr.open('POST', 'ServletIsbn2');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);
}