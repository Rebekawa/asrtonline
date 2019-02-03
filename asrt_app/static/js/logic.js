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
    console.log('hey')
    navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(err0r) {
    console.log("Something went wrong!");
  });
}

//https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm