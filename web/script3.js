/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("DOMContentLoaded", function () {
    var bookStatsTable = document.getElementById("BookstatisticsTable");
    var studentStatsTable = document.getElementById("StudentstatisticsTable");

    document.getElementById("getStatsBookBtn").addEventListener("click", function () {
        var selectedGenre = document.getElementById("genre").value;
        // studentStatsTable.style.display = "none";
        //bookStatsTable.style.display = "block";
        document.getElementById("BookstatisticsTable").style.display = "block";
        fetchStatistics(selectedGenre);
    });
});

function fetchStatistics(selectedGenre) {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "StatisticsServlet?genre=" + selectedGenre, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var statisticsTable = document.getElementById("BookstatisticsTable");
            statisticsTable.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getStudentStatisticsBtn").addEventListener("click", function () {
        //bookStatsTable.style.display = "none";
        //studentStatsTable.style.display = "block";
        document.getElementById("StudentstatisticsTable").style.display = "block";
        fetchStatistics2();

    });
});

function fetchStatistics2() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "StudentStatisticsServlet", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var statisticsTable2 = document.getElementById("StudentstatisticsTable");
            statisticsTable2.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}



