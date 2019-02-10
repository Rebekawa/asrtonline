// Vue
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
			geolocation.on('change', function(evt) {
				var precision = geolocation.getAccuracy();
				$("#precision").html(precision);
				var position = geolocation.getPosition();
				// On transforme la projection des coordonnées
				var newPosition=ol.proj.transform(position, 'EPSG:3857','EPSG:4326');
				$("#latitude").html(newPosition[1]);
				$("#longitude").html(newPosition[0]);
				// Attribution de la géométrie de ObjPosition avec les coordonnées de la position
				ObjPosition.setGeometry( position ? new ol.geom.Point(position) : null );
			});
			// On alerte si une erreur est trouvée
			geolocation.on('error', function(erreur) {
				alert('Echec de la géolocalisation : ' +erreur.message);
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
			sourceVecteur.once('change', function(evt){
				// On vérifie que la source du vecteur sont chargés
				if (sourceVecteur.getState() === 'ready') {
					// On vérifie que le veteur contient au moins un objet géographique
					if (sourceVecteur.getFeatures().length >0) {
						// On adapte la vue de la carte à l'emprise du vecteur
						map.getView().fit(sourceVecteur.getExtent(), map.getSize());
					}
				}
			});


var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log("Something went wrong!");
  });
}


//micro

//document.getElementById("check").addEventListener("click", displayDate);

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
        startRecordingButton.addEventListener("click", setTimeout( function () {
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
        }, 5000));
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


//https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm



function showDescription() {
    $( ".description" ).remove();
    var description = $('<div/>')
    description.addClass('description')
    $('.desContainer').prepend(description)

}