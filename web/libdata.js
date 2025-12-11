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

let loginstatus = false;
let loginstatus2 = false;
let lon = undefined;
let lat = undefined;
var time = 0;
var st;
var clicked = false;
var string1 = "";
var string2 = "";

var current_email;
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
function HideView() {
    let getlogininput = document.getElementById("p1");
    if (loginstatus === false) {
        getlogininput.setAttribute("type", "text");
        loginstatus = true;
    } else if (loginstatus === true) {
        getlogininput.setAttribute("type", "password");
        loginstatus = false;
    }
}

function HideView2() {
    let getlogininput2 = document.getElementById("p2");
    if (loginstatus2 === false) {
        getlogininput2.setAttribute("type", "text");
        loginstatus2 = true;
    } else if (loginstatus2 === true) {
        getlogininput2.setAttribute("type", "password");
        loginstatus2 = false;
    }
}

function checkPass() {
    let pass1 = document.getElementById("p1").value;
    let pass2 = document.getElementById("p2").value;
    let result = document.getElementById("message");
    if (pass1.length !== 0) {
        if (pass1 === pass2) {
            result.textContent = "Passwords match";
            result.style.backgroundColor = "#3ae374";
            return true;
        } else {
            result.textContent = "Passwords do not match";
            result.style.backgroundColor = "#ff4d4d";
            return false;
        }
    }
}

function checkStrength() {
    let pass1 = document.getElementById("p1").value;
    let mes = document.getElementById("strengthmes");
    let count = pass1.match(/\d/g)?.length;
    const regexp = /[A-Z]/gi;
    const regexp2 = /[a-z]/gi;
    const matches = pass1.match(regexp);
    const matches2 = pass1.match(regexp);
    var times = pass1.match(/[@$!%*#?&]/g).length;
    var logical = false;
    var logical2 = false;
    var logical3 = false;
    var logical4 = false;
    if (pass1.includes("uoc") || pass1.includes("helmepa") || pass1.includes("tuc")) {
        mes.innerHTML = "Απαγορεύονται οι εξής λέξεις: uoc , helmepa , tuc";
        mes.style.color = "#ff4d4d";
        logical = true;
    } else if ((count > ((pass1.length) / 2)) && logical === false) {
        mes.innerHTML = "Password is weak";
        mes.style.color = "yellow";
        mes.style.backgroundColor = "transparent";
        logical2 = true;
    } else if (((times >= 2) && (matches.length >= 1) && (matches2.length >= 1)) && (logical2 === false) && (logical === false)) {
        mes.innerHTML = "Password is strong";
        mes.style.color = "#3ae374";
        mes.style.backgroundColor = "transparent";
        logical3 = true;
    } else if ((logical3 === false) && (logical2 === false) && (logical === false)) {
        mes.innerHTML = "Password is medium";
        mes.style.color = "orange";
        mes.style.backgroundColor = "transparent";
        logical4 = true;
    }
    if ((logical === true) || (logical2 === true)) {
        return false;
    } else if ((logical3 === true) || (logical4 === true)) {
        return true;
    }
}
function req_show_data2() {
    if (document.getElementById("formlib").hidden === false) {
        $('#formlib').hide();
        document.getElementById("formlib").hidden = true;
        $('#save-butt2').hide();
        return 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

            var gender = data.gender;
            current_email = data.email;
            document.getElementById("txtUserName").value = data.username;
            document.getElementById("txtEmail").value = data.email;
            document.getElementById("p1").value = data.password;
            document.getElementById("txtName").value = data.firstname;
            document.getElementById("txtName1").value = data.lastname;
            document.getElementById("txtDate").value = data.birthdate;
            document.getElementById("country").value = data.country;
            document.getElementById("txtCity").value = data.city;
            document.getElementById("txtCityNumber").value = data.address;
            document.getElementById("txtTel").value = data.telephone;
            document.getElementById("txtUrl").value = data.personalpage;
            document.getElementById("lon").value = data.lon;
            document.getElementById("lat").value = data.lat;
            //    data.libraryname;
            //document.getElementById("txtbiblonomar").value = data.libraryname;
            // document.getElementById("wrariobibl").value = data.libraryinfo;


        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    $('#formlib').show();
    document.getElementById("formlib").hidden = false;
    $('#save-butt2').show();
    xhr.open('GET', 'servletlibdata');
    xhr.send();

}

function update1() {
    let myForm = document.getElementById("formlib");
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(jsonData);
            document.getElementById("msg").innerHTML = "Οι αλλαγές αποθηκεύτηκαν επιτυχώς";
            setTimeout(function () {
                document.getElementById("msg").innerHTML = '';
            }, 1500);
        } else if (xhr.status !== 200) {
            console.log("Request failed. Returned status of " + xhr.status + "<br>");
        }
    };

    xhr.open("PUT", "update_library_data");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function reqListener() {
    console.log("mphje sto req list");
    if (time === 0) {
        map = new OpenLayers.Map("Map");
        time = 1;
    }
    var mapnik = new OpenLayers.Layer.OSM();
    var el = document.getElementById("map");
    el.innerHTML = this.responseText;
    el.style.display = "none";
    var p = el.innerHTML.indexOf('lon') + 6;
    var p2 = el.innerHTML.indexOf('place_id') - 4;

    for (i = p; i <= p2; i++) {
        string1 = string1 + el.innerHTML.charAt(i);
    }

    var poslon = document.getElementById("lon");
    poslon.innerHTML = string1;
    poslon.style.display = "none";

    var p3 = el.innerHTML.indexOf('lat') + 6;
    var p4 = el.innerHTML.indexOf(',"type":"') - 2;

    for (i = p3; i <= p4; i++) {
        string2 = string2 + el.innerHTML.charAt(i);
    }

    var poslat = document.getElementById("lat");
    poslat.innerHTML = string2;
    poslat.style.display = "none";

    let timhlon = parseFloat(string1);
    let timhlat = parseFloat(string2);
    lon = timhlon;
    lat = timhlat;
    map.addLayer(mapnik);
    document.getElementById("lon").value = lon;
    document.getElementById("lat").value = lat;
    document.getElementById("showlonlat").style.display = "none";
    document.getElementById("lon").style.display = "none";
    document.getElementById("lat").style.display = "none";


    //Orismos Thesis
    function setPosition(lat, lon) {
        var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
        var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
        return position;
    }

    //Orismos Handler

    function handler(position, message) {
        var popup = new OpenLayers.Popup.FramedCloud("Popup",
                position, null,
                message, null,
                true // <-- true if we want a close (X) button, false otherwise
                );
        map.addPopup(popup);
        var div = document.getElementById('divID');
        div.innerHTML += 'Energopoitihike o Handler<br>';

    }
    //Markers
    //  var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    var position = setPosition(timhlat, timhlon);
    var mar = new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function (evt) {
        handler(position, 'Τοποθεσία');
    });

    //Orismos zoom
    const zoom = 10;
    map.setCenter(position, zoom);
}


function loadDoc() {
    clicked = true;
    var addressName = document.getElementById("txtCityNumber").value;
    var city = document.getElementById("txtCity").value;
    var country = document.getElementById("country").value;
    var address = addressName + " " + city + " " + country;
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            if (this.readyState === 4 && this.status === 200) {
                var myArr = JSON.parse(this.responseText);
            }
            var per = myArr[0].display_name;
            if (per.includes("Crete")) {
                flag = true;
            } else {
                flag = false;
            }
        }
    });

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("X-RapidAPI-Key", "96b69f5fb8msh18cfcaf05f06a99p11c03bjsn18886441835f");
    xhr.setRequestHeader("X-RapidAPI-Host", "forward-reverse-geocoding.p.rapidapi.com");
    document.getElementById("lon").value = lon;
    document.getElementById("lat").value = lat;
    document.getElementById("lon").style.display = "none";
    document.getElementById("lat").style.display = "none";
    string1 = "";
    string2 = "";
    xhr.addEventListener("load", reqListener);
    xhr.send(data);
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