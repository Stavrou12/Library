/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CheckIsbnForRev() {
    console.log("mphke sthn func");
    var mydata = $("#FormReviewBooks").serialize();
    if (mydata["isbn"] === "") {
        return 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var bookb = document.getElementById("submitreviewform");

            bookb.style.display = "block";
            document.getElementById('resultsReviewIsbn').innerText = "";

        } else if (xhr.status === 403) {
            var bookb = document.getElementById("submitreviewform");

            bookb.style.display = "none";
            document.getElementById("resultsReviewIsbn").style.color = "red";
            document.getElementById('resultsReviewIsbn').innerText =
                    'Αυτό το isbn δεν υπάρχει ήδη sta books,παρακαλώ επιλέξετε ένα άλλο';
        }
    };
    xhr.open('POST', 'ServletIsbnForReview');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);

}

document.getElementById('writeReviewButton').addEventListener('click', function () {
    document.getElementById('reviewForm').style.display = 'block';
    document.getElementById('resultsReview').innerHTML = '';
});

document.getElementById('FormReviewBooks').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const isbn = document.getElementById('isbn').value;
    const reviewText = document.getElementById('reviewText').value;
    const reviewScore = document.getElementById('reviewScore').value;

    const reviewData = {
        user_id: userId,
        isbn: isbn,
        reviewText: reviewText,
        reviewScore: reviewScore
    };

    submitReview(reviewData);
});

function submitReview(reviewData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'AddReviewServlet');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Review submitted successfully.');
                // Clear the form and hide it
                document.getElementById("FormReviewBooks").reset();
                document.getElementById("reviewForm").style.display = 'none';
                document.getElementById("resultsReview").innerHTML = "Review submitted successfully.";
            } else {
                console.error('Request failed:', xhr.status, xhr.statusText);
                document.getElementById("resultsReview").innerHTML = "Review did not submit successfully,error.";
            }
        }
    };

    xhr.send(JSON.stringify(reviewData));
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('seeReviewsButton').addEventListener('click', fetchReviews);
});
// Fetch and display reviews for all books
function fetchReviews() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'FetchReviewsServlet', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const reviewsByISBN = JSON.parse(xhr.responseText);
                displayReviews(reviewsByISBN);
            } else {
                console.error('Request failed:', xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send();
}

// Display reviews for each book
function displayReviews(reviewsByISBN) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = ''; // Clear previous results
    for (const isbn in reviewsByISBN) {
        const reviewsDiv = document.createElement('div');
        reviewsDiv.classList.add('reviews');
        const isbnHeading = document.createElement('h3');
        isbnHeading.textContent = `ISBN: ${isbn}`;
        reviewsDiv.appendChild(isbnHeading);
        const reviewsList = document.createElement('ul');
        const reviews = reviewsByISBN[isbn];
        reviews.forEach(review => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = `User: ${review.user_id}, Score: ${review.reviewScore}, Text: ${review.reviewText}`;
            reviewsList.appendChild(reviewItem);
        });
        reviewsDiv.appendChild(reviewsList);
        reviewsContainer.appendChild(reviewsDiv);
    }
}


