mapboxgl.accessToken = 'pk.eyJ1IjoiZGV5YW5peCIsImEiOiJjbHJnaWtnajQwZ3R3MmtwYjQ4Nmc1ZGgxIn0.bUMY5T2H61hxw8lVT8Hshw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    zoom: 7.5,
    center: [-93.6403354, 41.9040034]
});

map.on('load', async () => {
    map.addLayer({
        'id': 'fibers',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': turf.featureCollection(
                lines.map((line, index) => turf.lineString([
                    line.positions[0],
                    ...line.repeaterPositions,
                    line.positions[1],
                ]))
            )
        },
        'paint': {
            'line-color': '#888',
            'line-width': 4
        }
    });

    map.loadImage('imgs/marker-server.png', (error, image) => {
        map.addImage('marker-server', image);
        map.addLayer({
            'id': 'cities',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': turf.featureCollection(
                    cities.map(city => turf.point(city.position, {description: city.name}))
                )
            },
            'layout': {
                'icon-image': 'marker-server',
                'icon-anchor': 'bottom',
                'icon-size': 0.2,
                'icon-allow-overlap': true,
            }
        });
    })
    map.loadImage('imgs/marker-amplifier.png', (error, image) => {
        map.addImage('marker-amplifier', image);
        map.addLayer({
            'id': 'amplifiers',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': turf.featureCollection(
                    lines.map((line) => turf.multiPoint(line.repeaterPositions))
                )
            },
            'layout': {
                'icon-image': 'marker-amplifier',
                'icon-anchor': 'bottom',
                'icon-size': 0.2,
                "icon-allow-overlap": true,
            }
        });

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
        map.on('click', 'cities', (e) => {
// Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

// Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'cities', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

// Change it back to a pointer when it leaves.
        map.on('mouseleave', 'cities', () => {
            map.getCanvas().style.cursor = '';
        });
    })
});
