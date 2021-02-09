
mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: campg.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());
    

    const marker = new mapboxgl.Marker()
    .setLngLat(campg.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campg.title}</h3><p>${campg.location}</p>`
        )
    )
    .addTo(map);

    