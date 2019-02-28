$(document).ready(function () {

    var state = 0;
    var intensity = 0;

    states();
    showOpenCases();
    createElements();
    analyzePosts();
    initializeClicks();

    function initializeClicks(){
        $("#cancelDesFormBtn").click(cancelDescriptionForm);
        $("#closeDesFormBtn").click(closeDescriptionForm);
        $("#openCaseButton").click(showOpenCases);
        $("#closeCaseButton").click(showCloseCases);
        $("#high").click(showHigh);
        $("#medium").click(showMedium);
        $("#low").click(showLow);
        $("#all").click(showAll);
        $(".box").click(showDescription)
    }

    function states() {

        $("fieldset:contains('open')").addClass("open").removeClass('close');

        $("fieldset:contains('close')").addClass("close").removeClass('open');

    }

    function createElements() {
        $("fieldset:contains(smoke_detector)").addClass("high");
        $("fieldset:contains(doorbell)").addClass("low");
        $("fieldset:contains(glass_break)").addClass("high");
        $("fieldset:contains(microwave)").addClass("low");
        $("fieldset:contains(emergency_broadcast_system)").addClass("high");
        $("fieldset:contains(baby_cry)").addClass("medium");
        $("fieldset:contains(dog_barking)").addClass("medium");
        $("fieldset").click(showDescription);
        $("fieldset").click(changeMapFocus);
        $("fieldset").click(setUpdateFormAction);
        $("fieldset").click(setChangeStatusFormAction);

    }

    function showOpenCases() {
        $("#openCaseButton").css("font-weight","bold");
        $("#closeCaseButton").css("font-weight","100");
        $("#openCaseButton").css("text-decoration","underline");
        $("#closeCaseButton").css("text-decoration","none");

        clearInterval(window.showCloseCase)

        state = 0;
        intensity = 0;
        states();

        $('.open').css('display', 'block');
        $('.close').css('display', 'none');




        window.showOpenCase = setInterval(function () {
            $.getJSON('/api/get',
                function (data) {
                    var json = JSON.parse(data).reverse()
                    var tr;

                    $('.box').html("");
                    $(".box").remove();

                    for (var i = 0; i < json.length; i++) {

                        json_data = json[i]["fields"]
                        tr = $('<fieldset/>');
                        tr.addClass('box');
                        tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                        tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                        tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                        tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                        tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                        tr.append("<div class='address'>" + json_data.address + "</div>");
                        tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                        tr.append("<div class='case_description'>" + json_data.case_description + "</div>");
                        tr.append("<div class='jsonDate'>" + json_data.date + "</div>");
                        $('.openCases').append(tr);


                    }
                    createElements();
                    states();
                    analyzePosts();
                    $(".open").css("display", "block");
                    $(".close").css("display", "none");


                    if (intensity === 3) {
                        showHigh()
                    }

                    else if (intensity === 2) {
                        showMedium()
                    }
                    else if (intensity === 1) {
                        showLow()
                    }
                    else {
                        showAll()
                    }


                });
        }, 3000);
    }


    function showCloseCases() {
        $("#openCaseButton").css("font-weight","100");
        $("#closeCaseButton").css("font-weight","bold");
        $("#openCaseButton").css("text-decoration","none");
        $("#closeCaseButton").css("text-decoration","underline");
        clearInterval(window.showOpenCase)

        state = 1;
        intensity = 0;
        states();

        $('.close').css('display', 'block');
        $('.open').css('display', 'none');



        window.showCloseCase = setInterval(function () {
            $.getJSON('/api/get',
                function (data) {
                    var json = JSON.parse(data).reverse()
                    var tr;

                    $('.box').html("");
                    $(".box").remove();


                    ;
                    for (var i = 0; i < json.length; i++) {
                        json_data = json[i]["fields"]




                        tr = $('<fieldset/>');
                        tr.addClass('box');
                        tr.append("<legend class='date'>" + handleDateFormatting(json_data.date) + "</legend>");
                        tr.append("<span class='event_type'>" + json_data.event_type + "</span>");
                        tr.append("<div class='cust_num'>" + json_data.cust_num + "</div>");
                        tr.append("<div class='case_stat'>" + json_data.case_stat + "</div>");
                        tr.append("<div class='case_num'>" + json[i]["pk"] + "</div>");
                        tr.append("<div class='address'>" + json_data.address + "</div>");
                        tr.append("<div class='coordinates'>" + json_data.coordinates + "</div>");
                        tr.append("<div class='case_description'>" + json_data.case_description + "</div>");
                        tr.append("<div class='jsonDate'>" + json_data.date + "</div>");
                        $('.openCases').append(tr);



                    }
                    createElements();
                    states();
                    analyzePosts();
                    $(".close").css("display", "block");
                    $(".open").css("display", "none");


                    if (intensity === 3) {
                        showHigh()
                    }

                    else if (intensity === 2) {
                        showMedium()
                    }
                    else if (intensity === 1) {
                        showLow()
                    }
                    else {
                        showAll()
                    }


                });
        }, 3000);

    }

    function showHigh() {

        intensity = 3

        if (state === 0) {
            $('.open.high').css('display', 'block');
            $('.close.high').css('display', 'none');
        }
        else {
            $('.close.high').css('display', 'block');
            $('.open.high').css('display', 'none');

        }
        $('.medium').css('display', 'none');
        $('.low').css('display', 'none');

    }

    function showMedium() {

        intensity = 2

        if (state === 0) {
            $('.open.medium').css('display', 'block');
            $('.close.medium').css('display', 'none');
        }
        else {
            $('.close.medium').css('display', 'block');
            $('.open.medium').css('display', 'none');

        }
        $('.high').css('display', 'none');
        $('.low').css('display', 'none');

    }

    function showLow() {

        intensity = 1

        if (state === 0) {
            $('.open.low').css('display', 'block');
            $('.close.low').css('display', 'none');
        }
        else {
            $('.close.low').css('display', 'block');
            $('.open.low').css('display', 'none');

        }
        $('.high').css('display', 'none');
        $('.medium').css('display', 'none');

    }

    function showAll() {

        intensity = 0;
        if (state === 0) {
            $('.open').css('display', 'block');
            $('.close').css('display', 'none');
        }
        else {
            $('.close').css('display', 'block');
            $('.open').css('display', 'none');
        }
    }


    function showDescription() {
        var arr = $(this).find('*')
        $('.desContainer').text(arr[1].textContent + ' located in ' + arr[5].textContent)
        $('.caseInfos').html('Event type - ' + arr[1].textContent
            + '<br/>' + 'Date & Time - ' + arr[0].textContent
            + '<br/>' + 'Cust num - ' + arr[2].textContent
            + '<br/>' + 'Case number - ' + arr[4].textContent
            + '<br/>' + 'Case status - ' + arr[3].textContent
            + '<form id="changeEventStatusForm" method="post" action="#"><button id="closeCaseBtn">Close Case</button>'
            + '<button id="openCaseBtn">Open Case</button></form>')
        if (arr[3].textContent == "open") {
            $("#closeCaseBtn").css("display", "block");
            $("#openCaseBtn").css("display", "none");
        } else {
            $("#closeCaseBtn").css("display", "none");
            $("#openCaseBtn").css("display", "block");
        }

    };

    function switchDisplay(event) {
        let currentDisplay = event.target.style.display;
        let newDisplay = "";
        currentDisplay == "block" ? newDisplay = "none" : newDisplay = "block";
        event.target.style.display = newDisplay;
    }

    window.checkForEmegencies = setInterval(function () {
        let timeNow = + new Date();
        const minutesSpan = 320;
        let minTimeRange = substractMinutes(timeNow, minutesSpan / 2);
        let maxTimeRange = addMinutes(timeNow, minutesSpan / 2);
        let postsArray = $(".open");
        if (state == 1) {
            postsArray = $(".close");
        }
        let postsWithinMinutesSpan = [];
        for (var i = 0; i < postsArray.length - 1; i++) {
            let postTime = convertJsonDateToNumOfSecs(postsArray[i].childNodes[8].innerHTML) * 1000;
            if (minTimeRange < postTime && postTime < maxTimeRange) {
                postsWithinMinutesSpan.push(postsArray[i]);
            }
        }
    }, 3350);

    function addMinutes(date, minutes) {
        return date + minutes * 60000;
    }
    function substractMinutes(date, minutes) {
        return date - minutes * 60000;
    }


    function analyzePosts() {
        let postsArray = $(".open");
        if (state == 1) {
            postsArray = $(".close");
        }

        const sensitivityFactor = 1.02;

        function checkPosts(n) {
            if ((n + 1) >= postsArray.length) {
                return;
            }
            let focusPost = convertJsonDateToNumOfSecs(postsArray[n].childNodes[8].innerHTML);
            let neighborPost = convertJsonDateToNumOfSecs(postsArray[n + 1].childNodes[8].innerHTML);
            if (focusPost / neighborPost < sensitivityFactor) {
                checkConsequtiveEvents(postsArray[n], postsArray[n + 1]);
            }
            checkPosts(n + 1);

        }
        checkPosts(0);

    };



    function convertJsonDateToNumOfSecs(jsonDate) {
        return Math.round(new Date(jsonDate).getTime() / 1000);
    }

    function checkConsequtiveEvents(focusPost, neighborPost) {
        if (focusPost.childNodes[6].innerHTML == neighborPost.childNodes[6].innerHTML) {
            checkConsequtiveEvent("baby_cry", focusPost, neighborPost);
        }
    }

    function checkConsequtiveEvent(eventType, focusPost, neighborPost) {
        if (focusPost.childNodes[1].innerHTML == eventType && neighborPost.childNodes[1].innerHTML == eventType) {
            focusPost.remove();
        }
    }



    //Map Handling-------------
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

    geolocation.on('change', function () {
        var precision = geolocation.getAccuracy();
        $("#precision").html(precision);
        let position = geolocation.getPosition();
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

    function changeMapFocus(event) {
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

    function setChangeStatusFormAction() {
        const changeStatusForm = $("#changeEventStatusForm");
        let case_num = event.target.children[4].innerHTML;
        let case_stat = event.target.children[3].innerHTML;
        changeStatusForm.attr("action", "api/changeEventStatus/" + case_num + "/" + case_stat);
    }

    //handle form action url change based on case_num that was clicked on --------------
    let currentDescription = ""

    function setUpdateFormAction(event) {
        const updateForm = $("#updatePostForm");
        let case_num = event.target.children[4].innerHTML;
        $("#desContainer")[0].value = event.target.children[7].innerHTML;
        $(".caseDescription").css("display", "flex");
        updateForm.attr("action", "api/update/" + case_num);
        currentDescription = event.target.children[7].innerHTML;
    }



    function cancelDescriptionForm() {
        $("#desContainer")[0].value = currentDescription;
    }

    function closeDescriptionForm() {
        $(".caseDescription").css("display", "none");
    }


    //video handling -----------

    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong: " + error);
            });
    }


    //microphone handling -------------

    var startRecordingButton = document.getElementById("startRecordingButton");
    var stopRecordingButton = document.getElementById("stopRecordingButton");
    // var playButton = document.getElementById("playButton");
    // var downloadButton = document.getElementById("downloadButton");
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
        startRecordingButton.style.display = "none";
        stopRecordingButton.style.display = "block";
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia(
            {
                audio: true
            },
            function (e) {
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
        startRecordingButton.style.display = "block";
        stopRecordingButton.style.display = "none";
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
    // playButton.addEventListener("click", function () {
    //     if (blob == null) {
    //         return;
    //     }
    //     var url = window.URL.createObjectURL(blob);
    //     var audio = new Audio(url);
    //     audio.play();
    // });
    // downloadButton.addEventListener("click", function () {
    //     if (blob == null) {
    //         return;
    //     }
    //     var url = URL.createObjectURL(blob);
    //     var a = document.createElement("a");
    //     document.body.appendChild(a);
    //     a.style = "display: none";
    //     a.href = url;
    //     a.download = "sample.wav";
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    // });
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


});