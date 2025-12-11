
document.addEventListener("DOMContentLoaded", function () {
    console.log("dom");

    document.getElementById("BookBtn").addEventListener("click", function () {
        // Fetch data from the servlet using AJAX
        console.log("event");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "LibraryBookCountsServlet", true);
        xhr.onreadystatechange = function () {
            console.log("ready");
            if (xhr.readyState === 4 && xhr.status === 200) {
                var bookCounts = JSON.parse(xhr.responseText);
                displayBookCounts(bookCounts);
            }
        };
        xhr.send();
    });

    function displayBookCounts(bookCounts) {
        var individualTableHtml = "<table><tr><th>Library ID</th><th>ISBN</th><th>Book Count</th></tr>";
        var libraries = {};
        for (var i = 0; i < bookCounts.length; i++) {
            var libraryId = bookCounts[i].library_id;
            var isbn = bookCounts[i].isbn;
            var bookCount = bookCounts[i].book_count;

            if (!libraries[libraryId]) {
                libraries[libraryId] = {
                    isbnList: [],
                    totalBooks: 0
                };
            }
            libraries[libraryId].isbnList.push(isbn);
            libraries[libraryId].totalBooks += bookCount;
        }
        for (var libraryId in libraries) {
            individualTableHtml += "<tr><td>" + libraryId + "</td>";
            individualTableHtml += "<td>" + libraries[libraryId].isbnList.join(", ") + "</td>";
            individualTableHtml += "<td>" + libraries[libraryId].totalBooks + "</td></tr>";
        }
        individualTableHtml += "</table>";
        document.getElementById("individualBookCountsTable").style.display = "block";
        document.getElementById("individualBookCountsTable").innerHTML = individualTableHtml;
    }
});
