$(document).ready(function () {

    addNewData();
});

function addNewData() {
        window.addData = setInterval(function() {
        $.getJSON('/api/get',
            function (data) {
                console.log(data)
                var json = JSON.parse(data).reverse()
                var tr;
                $('.box').html("");
                $(".box").remove();
                ;
                for (var i = 0; i < json.length; i++) {
                    json_data = json[i]["fields"]
                    tr = $('<fieldset/>');
                    console.log(json[i])
                    tr.addClass('box');

                    tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                    tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                    tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                    tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                    tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                    tr.append("<div class='address'>" + json_data.address + "</div>");
                    tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                    $('.openCases').append(tr);


                }
                createElements()
            });
    }, 3000);
}


// ----high: #D62828
// -----med: #F77F00
// -----low: #FCBF49

function createElements() {
    $("fieldset:contains(smoke_detector)").css("background-color", "#D62828");
    $("fieldset:contains(doorbell)").css("background-color", "#FCBF49");
    $("fieldset:contains(glass_break)").css("background-color", "#D62828");
    $("fieldset:contains(microwave)").css("background-color", "#FCBF49");
    $("fieldset:contains(emergency_broadcast_system')").css("background-color", "#D62828");
    $("fieldset:contains(baby_cry)").css("background-color", "#F77F00");
    $("fieldset:contains(dog_barking)").css("background-color", "#F77F00");
    $("fieldset").click(showDescription);
    $("fieldset").click(changeMapFocus);

}


function showDescription(event) {
    var arr = $(this).find('*')
    $('.desContainer').text(arr[1].textContent + ' located in ' + arr[5].textContent)
    $('.caseInfos').html('<br/>' + 'Event type - ' + arr[1].textContent
        + '<br/>' + 'Date & Time - ' + arr[0].textContent
        + '<br/>' + 'Cust num - ' + arr[2].textContent
        + '<br/>' + 'Case status - ' + arr[3].textContent
        + '<br/>' + 'Case number - ' + arr[4].textContent)
};

function changeMapFocus(event){
    let coordinates = JSON.parse(event.target.children[6].innerHTML);

    var precision = geolocation.getAccuracy();
    $("#precision").html(precision);

    var newPosition = ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
    
    ObjPosition.setGeometry(newPosition ? new ol.geom.Point(newPosition) : null);

    var sourceVecteur = new ol.source.Vector({
        features: [ObjPosition]
    });
    
    sourceVecteur.once('change', function (evt) {
        if (sourceVecteur.getState() === 'ready') {
            if (sourceVecteur.getFeatures().length > 0) {
                map.getView().fit(sourceVecteur.getExtent(), map.getSize());
            }
        }
    });
}

$(document).ready(function () {
    createElements()

});


function showHigh() {
    console.log('High');
    $("fieldset:contains(smoke_detector)").css("display", "block");
    $("fieldset:contains(glass_break)").css("display", "block");
    $("fieldset:contains(emergency_broadcast_system)").css("display", "block");

    $("fieldset:contains(doorbell)").css("display", "none");
    $("fieldset:contains(microwave)").css("display", "none");
    $("fieldset:contains(baby_cry)").css("display", "none");
    $("fieldset:contains(dog_barking)").css("display", "none");



    clearInterval(window.addData)
    clearInterval(window.addMedium)
    clearInterval(window.addLow)

    window.addHigh = setInterval(function () {
        $.getJSON('/api/get',
            function (data) {
                console.log(data)
                var json = JSON.parse(data).reverse()
                var tr;

                $('.box').html("");
                $(".box").remove();


                ;
                for (var i = 0; i < json.length; i++) {

                    json_data = json[i]["fields"]
                    tr = $('<fieldset/>');
                    console.log(json[i])
                    tr.addClass('box');

                    tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                    tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                    tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                    tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                    tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                    tr.append("<div class='address'>" + json_data.address + "</div>");
                    tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                    $('.openCases').append(tr);



                }
                $("fieldset:contains(smoke_detector)").css("display", "block");
                $("fieldset:contains(glass_break)").css("display", "block");
                $("fieldset:contains(emergency_broadcast_system)").css("display", "block");

                $("fieldset:contains(doorbell)").css("display", "none");
                $("fieldset:contains(microwave)").css("display", "none");
                $("fieldset:contains(baby_cry)").css("display", "none");
                $("fieldset:contains(dog_barking)").css("display", "none");
                createElements()
            });
    }, 3000);
}

function showMedium() {
    console.log('Medium');
    $("fieldset:contains(baby_cry)").css("display", "block");
    $("fieldset:contains(dog_barking)").css("display", "block");

    $("fieldset:contains(smoke_detector)").css("display", "none");
    $("fieldset:contains(doorbell)").css("display", "none");
    $("fieldset:contains(glass_break)").css("display", "none");
    $("fieldset:contains(microwave)").css("display", "none");
    $("fieldset:contains(emergency_broadcast_system)").css("display", "none");

    clearInterval(window.addData)
    clearInterval(window.addHigh)
    clearInterval(window.addLow)

    window.addMedium = setInterval(function () {
        $.getJSON('/api/get',
            function (data) {
                console.log(data)
                var json = JSON.parse(data).reverse()
                var tr;
                $('.box').html("");
                $(".box").remove();
                ;
                for (var i = 0; i < json.length; i++) {
                    json_data = json[i]["fields"]
                    tr = $('<fieldset/>');
                    console.log(json[i])
                    tr.addClass('box');

                    tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                    tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                    tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                    tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                    tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                    tr.append("<div class='address'>" + json_data.address + "</div>");
                    tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                    $('.openCases').append(tr);


                }
                $("fieldset:contains(baby_cry)").css("display", "block");
                $("fieldset:contains(dog_barking)").css("display", "block");

                $("fieldset:contains(smoke_detector)").css("display", "none");
                $("fieldset:contains(doorbell)").css("display", "none");
                $("fieldset:contains(glass_break)").css("display", "none");
                $("fieldset:contains(microwave)").css("display", "none");
                $("fieldset:contains(emergency_broadcast_system)").css("display", "none");
                createElements()
            });
    }, 3000);
}

function showLow() {
    console.log('Low');
    $("fieldset:contains(doorbell)").css("display", "block");
    $("fieldset:contains(microwave)").css("display", "block");

    $( "fieldset:contains(baby_cry)" ).css( "display", "none" );
    $( "fieldset:contains(dog_barking)" ).css( "display", "none" );
    $( "fieldset:contains(smoke_detector)" ).css( "display", "none" );
    $( "fieldset:contains(glass_break)" ).css( "display", "none" );
    $( "fieldset:contains(emergency_broadcast_system)" ).css( "display", "none" );
    $("fieldset:contains(dog_barking)").css("display", "none");

    clearInterval(window.addData)
    clearInterval(window.addMedium)
    clearInterval(window.addHigh)

    window.addLow = setInterval(function () {
        $.getJSON('/api/get',
            function (data) {
                console.log(data)
                var json = JSON.parse(data).reverse()
                var tr;
                $('.box').html("");
                $(".box").remove();
                ;
                for (var i = 0; i < json.length; i++) {
                    json_data = json[i]["fields"]
                    tr = $('<fieldset/>');
                    console.log(json[i])
                    tr.addClass('box');

                    tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                    tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                    tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                    tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                    tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                    tr.append("<div class='address'>" + json_data.address + "</div>");
                    tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                    $('.openCases').append(tr);


                }
                $("fieldset:contains(doorbell)").css("display", "block");
                $("fieldset:contains(microwave)").css("display", "block");

                $( "fieldset:contains(baby_cry)" ).css( "display", "none" );
                $( "fieldset:contains(dog_barking)" ).css( "display", "none" );
                $( "fieldset:contains(smoke_detector)" ).css( "display", "none" );
                $( "fieldset:contains(glass_break)" ).css( "display", "none" );
                $( "fieldset:contains(emergency_broadcast_system)" ).css( "display", "none" );
                $("fieldset:contains(dog_barking)").css("display", "none");
                createElements()
            });
    }, 3000);
}

function showAll() {

    $("fieldset").css("display", "block");
    clearInterval(window.addHigh);
    clearInterval(window.addMedium);
    clearInterval(window.addLow);
    addNewData();
}


var view = new ol.View({
    center: [0, 0],
    zoom: 2,
    maxZoom: 19,
});
// Carte avec un fonds de carte
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'carte',
    view: view
});
// Objet géographique de la position de géolocalisation
var ObjPosition = new ol.Feature();
// Attribution d'un style à l'objet
ObjPosition.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
            color: '#3399CC'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
        })
    })
}));
// Géolocalisation
var geolocation = new ol.Geolocation({
    // On déclenche la géolocalisation
    tracking: true,
    // Important : Projection de la carte
    projection: view.getProjection()
});






// On scrute les changements des propriétés
geolocation.on('change', function (evt) {
    var precision = geolocation.getAccuracy();
    $("#precision").html(precision);
    let position = geolocation.getPosition();
    console.log("this is position    :"+position)
    ObjPosition.setGeometry(position ? new ol.geom.Point(position) : null);
});
// On alerte si une erreur est trouvée
geolocation.on('error', function (erreur) {
    alert('Echec de la géolocalisation : ' + erreur.message);
});
// Source du vecteur contenant l'objet géographique
var sourceVecteur = new ol.source.Vector({
    features: [ObjPosition]
});
// Couche vectorielle
var vecteur = new ol.layer.Vector({
    map: map,
    source: sourceVecteur
});
// Zoom sur l'emprise du vecteur
sourceVecteur.once('change', function (evt) {
    // On vérifie que la source du vecteur sont chargés
    if (sourceVecteur.getState() === 'ready') {
        // On vérifie que le veteur contient au moins un objet géographique
        if (sourceVecteur.getFeatures().length > 0) {
            // On adapte la vue de la carte à l'emprise du vecteur
            map.getView().fit(sourceVecteur.getExtent(), map.getSize());
        }
    }
});

//video

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong: "+error);
        });
}


//micro

var startRecordingButton = document.getElementById("startRecordingButton");
var stopRecordingButton = document.getElementById("stopRecordingButton");
var playButton = document.getElementById("playButton");
var downloadButton = document.getElementById("downloadButton");
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recordingLength = 0;
var volume = null;
var mediaStream = null;
var sampleRate = 44100;
var context = null;
var blob = null;
startRecordingButton.addEventListener("click", function () {
    // Initialize recorder
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia(
        {
            audio: true
        },
        function (e) {
            console.log("user consent");
            // creates the audio context
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            context = new AudioContext();
            // creates an audio node from the microphone incoming stream
            mediaStream = context.createMediaStreamSource(e);
            // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
            // bufferSize: the onaudioprocess event is called when the buffer is full
            var bufferSize = 2048;
            var numberOfInputChannels = 2;
            var numberOfOutputChannels = 2;
            if (context.createScriptProcessor) {
                recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            } else {
                recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            }
            recorder.onaudioprocess = function (e) {
                leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
                rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
                recordingLength += bufferSize;
            }
            // we connect the recorder
            mediaStream.connect(recorder);
            recorder.connect(context.destination);
        },
        function (e) {
            console.error(e);
        });
});
stopRecordingButton.addEventListener("click", function () {
    // stop recording
    recorder.disconnect(context.destination);
    mediaStream.disconnect(recorder);
    // we flat the left and right channels down
    // Float32Array[] => Float32Array
    var leftBuffer = flattenArray(leftchannel, recordingLength);
    var rightBuffer = flattenArray(rightchannel, recordingLength);
    // we interleave both channels together
    // [left[0],right[0],left[1],right[1],...]
    var interleaved = interleave(leftBuffer, rightBuffer);
    // we create our wav file
    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);
    // RIFF chunk descriptor
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // chunkSize
    view.setUint16(20, 1, true); // wFormatTag
    view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
    view.setUint32(24, sampleRate, true); // dwSamplesPerSec
    view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
    view.setUint16(32, 4, true); // wBlockAlign
    view.setUint16(34, 16, true); // wBitsPerSample
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);
    // write the PCM samples
    var index = 44;
    var volume = 1;
    for (var i = 0; i < interleaved.length; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }
    // our final blob
    blob = new Blob([view], { type: 'audio/wav' });
});
playButton.addEventListener("click", function () {
    if (blob == null) {
        return;
    }
    var url = window.URL.createObjectURL(blob);
    var audio = new Audio(url);
    audio.play();
});
downloadButton.addEventListener("click", function () {
    if (blob == null) {
        return;
    }
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "sample.wav";
    a.click();
    window.URL.revokeObjectURL(url);
});
function flattenArray(channelBuffer, recordingLength) {
    var result = new Float32Array(recordingLength);
    var offset = 0;
    for (var i = 0; i < channelBuffer.length; i++) {
        var buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
    }
    return result;
}
function interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);
    var inputIndex = 0;
    for (var index = 0; index < length;) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
    }
    return result;
}
function writeUTFBytes(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function handleDateFormatting(jsonDate) {
    let json_date = new Date(jsonDate);
    var monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = json_date.getDate();
    var month = json_date.getMonth();
    var year = json_date.getFullYear();
    var hour = json_date.getHours();
    var mins = json_date.getMinutes();
    
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    function hourUSStyle(h) {
        if (h > 12) {
            return h - 12
        } else {
            return h
        }
    }

    function getAmPm(h) {
        if (h >= 12) {
            return "p.m."
        } else {
            return "a.m."
        }
    }

    var dateWithFullMonthName = monthNames[month] + ". " + pad(date) + ", " + year + ", " + hourUSStyle(hour) + ":" + pad(mins) + " " + getAmPm(hour);
    return dateWithFullMonthName;
}

//https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm


