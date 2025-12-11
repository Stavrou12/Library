/* global OpenLayers, map, markers */

let but = document.getElementById("eggrafh");
let input = document.getElementById("strengthmes");
let loginstatus = false;
let loginstatus2 = false;
var string1 = "";
var string2 = "";
var flag = false;
var clicked = false;
var time = 0;
let lon = undefined;
let lat = undefined;
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

function checkUserFields() {
    const user = document.getElementById("txtTypeUser").value;
    var newElement = document.createElement("div");
    newElement.setAttribute("id", "Div1");
    var newElement2 = document.createElement("div");
    newElement2.setAttribute("id", "Div2");
    if (user === "student") {
        const id = document.querySelector('#field2');
        const start = document.querySelector("#txtDatePasoStart");
        const end = document.querySelector("#txtDatePasoEnd");
        const propt = document.querySelector("#txtTypeUserStudent");
        const e = document.querySelector("#typeofstudent");
        const e2 = document.querySelector("#passonum");
        const e3 = document.querySelector("#passostart");
        const e4 = document.querySelector("#passoend");
        const e5 = document.querySelector("#studenttmhma");
        const el = document.querySelector('#Div1');
        const el2 = document.querySelector('#Div2');
        el.style.display = 'none';
        el2.style.display = 'none';
        e.style.display = 'block';
        e2.style.display = 'block';
        e3.style.display = 'block';
        e4.style.display = 'block';
        e5.style.display = 'block';
        const textc = document.querySelector("#textCity");
        textc.textContent = "Διεύθυνση Κατοικίας:";
    } else if (user === "library") {
        const id = document.querySelector('#field2');
        const e = document.querySelector("#typeofstudent");
        const e2 = document.querySelector("#passonum");
        const e3 = document.querySelector("#passostart");
        const e4 = document.querySelector("#passoend");
        const e5 = document.querySelector("#studenttmhma");
        const textc = document.querySelector("#textCity");
        textc.textContent = "Διεύθυνση Βιβλιοθήκης:";
        e.style.display = 'none';
        e2.style.display = 'none';
        e3.style.display = 'none';
        e4.style.display = 'none';
        e5.style.display = 'none';
        newElement.innerHTML = ` <label id = "onomabibl" for="txtbiblonoma">Όνομα Βιβλιοθήκης:</label><input type="text" required="required" id="txtbiblonomar" name="libraryname" minlength="5" maxlength="30" size="40"> `;
        id.appendChild(newElement);
        newElement2.innerHTML = `<br><label for="wrariobibl" >Πληροφορίες και ωράριο βιβλιοθήκης:  </label><textarea id="wrariobibl" row="3" required="required" column="7" name="libraryinfo"></textarea> `;
        id.appendChild(newElement2);
    }
}

function isChecked() {
    if (document.getElementById("check").checked) {
        return true;
    } else {
        alert("Παρακαλώ πατήστε:Συμφωνία με όρους χρήσης");
        return false;
    }
}

function checkStudentInfo() {
    let person = document.getElementById("txtTypeUser").value;
    if (person === "student") {
        console.log(clicked);
        if (clicked === true) {
            console.log(flag);
            let var1 = isChecked();
            let var2 = checkDate();
            let var3 = (checkEmail() && checkPass() && checkStrength() && (flag === true));
            if (var3 && var1) {
                if (var2) {
                    let but = document.getElementById("eggrafh");
                    but.disabled = false;
                    setTimeout(function () {
                        but.disabled = true;
                    }, 5000);
                } else {
                    let but = document.getElementById("eggrafh");
                    but.disabled = true;
                }
            } else {
                let but = document.getElementById("eggrafh");
                but.disabled = true;
            }
        } else {
            clicked = false;
            let var1 = isChecked();
            let var2 = checkDate();
            let var3 = (checkEmail() && checkPass() && checkStrength());
            if (var3 && var1) {
                if (var2) {
                    let but = document.getElementById("eggrafh");
                    but.disabled = false;
                    setTimeout(function () {
                        but.disabled = true;
                    }, 5000);
                } else {
                    let but = document.getElementById("eggrafh");
                    but.disabled = true;
                }
            } else {
                let but = document.getElementById("eggrafh");
                but.disabled = true;
            }
        }
    } else if (person === "library") {
        let but = document.getElementById("eggrafh");
        but.disabled = false;
        setTimeout(function () {
            but.disabled = true;
        }, 5000);
    }
}

function checkEmail() {
    const e = document.querySelector("#txtEmail").value;
    let string = "";
    for (i = 0; i < e.length; i++) {
        if (e.charAt(i) === "@") {
            for (j = ++i; j < e.length; j++) {
                string = string + e.charAt(j);
            }
        }
    }
    const user = document.querySelector("#txtTypeUserUni").value;
    if (user === "uoc") {
        if (string === "uoc.gr") {
            return true;
        } else {
            return false;
        }
    }
    if (user === "helmepa") {
        if (string === "helmepa.gr") {
            return true;
        } else {
            return false;
        }
    }
    if (user === "tuc") {
        if (string === "tuc.gr") {
            return true;
        } else {
            return false;
        }
    }
}

function checkDate() {
    var date = new Date(document.getElementById('txtDatePasoStart').value);
    var date2 = new Date(document.getElementById('txtDatePasoEnd').value);
    if (date === "Invalid Date" || date2 === "Invalid Date") {
        return false;
    }
    if (date2 > date) {
        const person = document.querySelector("#txtTypeUserStudent").value;
        if (person === "pregrad") {
            if ((Number(date2.getFullYear()) - Number(date.getFullYear())) === 6) {
                return true;
            } else {
                return false;
            }
        }
        if (person === "master") {
            if ((Number(date2.getFullYear()) - Number(date.getFullYear())) === 2) {
                return true;
            } else {
                return false;
            }
        }
        if (person === "phd") {
            if ((Number(date2.getFullYear()) - Number(date.getFullYear())) === 5) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

function reqListener() {
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
    string1 = "";
    string2 = "";
    xhr.addEventListener("load", reqListener);
    xhr.send(data);
}


function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}



function RegisterPOST() {
    let myForm = document.getElementById('reg');
    let formData = new FormData(myForm);
    const data = {};
    formData.append("lon", lon);
    formData.append("lat", lat);
    formData.forEach((value, key) => (data[key] = value));
    var jsonData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    if (document.getElementById("txtTypeUser").value === "student") {
        if (pasoflag === 0 || usernameflag === 0 || emailflag === 0) {
            $('#ajaxContent').html("REQUEST FAILED.");
            document.getElementById("ajaxContent").style.color = "red";
            return 0;
        }
    }
    if (document.getElementById("txtTypeUser").value === "library") {
        if (usernameflag === 0 || emailflag === 0) {
            $('#ajaxContent').html("REQUEST FAILED.");
            document.getElementById("ajaxContent").style.color = "red";
            return 0;
        }
    }


    pasoflag = 0;
    usernameflag = 0;
    emailflag = 0;
    xhr.onload = function () {
        console.log(xhr.readyState);
        console.log(xhr.status);
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.readyState);
            console.log(xhr.status);
            var responseData = JSON.parse(jsonData);
            if (document.getElementById("txtTypeUser").value === "student") {
                $('#ajaxContent').html("Successful Student Registration.");
            } else if (document.getElementById("txtTypeUser").value === "library") {
                $('#ajaxContent').html("Successful Librarian Registration.");
            }
            // $('#ajaxContent').html("Successful Registration.");
            $('#reg')[0].reset();
            $('#ajaxContent').append(createTableFromJSON(responseData));
            document.getElementById("ajaxContent").style.color = "white";
            //document.getElementById('ajaxContent').innerHTML = xhr.responseText;


        } else if (xhr.status !== 200) {
            document.getElementById("ajaxContent").style.color = "red";
            document.getElementById('ajaxContent').innerHTML =
                    'Request failed. Returned status of ' + xhr.status + "<br>";
        }
    };
    if (document.getElementById("txtTypeUser").value === "student") {
        xhr.open('POST', 'GetStudent');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonData);
        // xhr.send(JSON.stringify(data));
        //console.log(jsonData);
    } else {
        xhr.open('POST', 'GetLibrarian');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonData);
    }

}
var usernameflag = 0;

function USERNAME() {
    var mydata = $("#reg").serialize();
    if (mydata["username"] === "") {
        return 0;
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            usernameflag = 1;


            document.getElementById('requsername').innerText = "";


        } else if (xhr.status === 403) {
            usernameflag = 0;
            document.getElementById("requsername").style.color = "red";
            document.getElementById('requsername').innerText =
                    'Αυτό το username υπάρχει ήδη,παρακαλώ επιλέξετε ένα άλλο';
            console.log("mphke sthn else username");
        }
    };

    xhr.open('POST', 'ServletUsername');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);
    // xhr.send(JSON.stringify(data));
    //console.log(jsonData);

}

var emailflag = 0;
function EMAIL() {
    console.log("mphke sthn func");
    var mydata = $("#reg").serialize();
    if (mydata["email"] === "") {
        console.log("mphke edw");
        return 0;
    }

    var xhr = new XMLHttpRequest();
    console.log("proxwrhse thn if return 0");
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            emailflag = 1;

            console.log("mphke sto email if");
            document.getElementById('reqemail').innerText = "";
        } else if (xhr.status === 403) {
            console.log("mphke sto email else");
            emailflag = 0;
            document.getElementById("reqemail").style.color = "red";
            document.getElementById('reqemail').innerText =
                    'Αυτό το email υπάρχει ήδη,παρακαλώ επιλέξετε ένα άλλο';
        }
    };
    xhr.open('POST', 'ServletEmail');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);

}
var pasoflag = 0;
function PASO() {
    var mydata = $("#reg").serialize();
    if (mydata["student_id"] === "") {
        return 0;
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            pasoflag = 1;



            document.getElementById('reqpaso').innerText = "";


        } else if (xhr.status === 403) {
            usernameflag = 0;
            document.getElementById("reqpaso").style.color = "red";
            document.getElementById('reqpaso').innerText =
                    'Αυτό το student_id υπάρχει ήδη,παρακαλώ επιλέξετε ένα άλλο';
        }
    };

    xhr.open('POST', 'ServletPaso');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(mydata);

}

