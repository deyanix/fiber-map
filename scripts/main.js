mapboxgl.accessToken = 'pk.eyJ1IjoiZGV5YW5peCIsImEiOiJjbHJnaWtnajQwZ3R3MmtwYjQ4Nmc1ZGgxIn0.bUMY5T2H61hxw8lVT8Hshw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    zoom: 7,
    center: [-93.6403354, 41.9040034]
});

const cities = [
    {
        name: "Des Moines",
        people: 212031,
        coordinates: "41°35′27″N 93°37′15″W"
    },
    {
        name: "Cedar Rapids",
        people: 136467,
        coordinates: "41°58′59″N 91°40′07″W"
    },
    {
        name: "Deavenport",
        people: 101009,
        coordinates: "41°32′35″N 90°35′27″W"
    },
    {
        name: "Sioux City",
        people: 85617,
        coordinates: "42°29′53″N 96°23′44″W"
    },
    {
        name: "Iowa City",
        people: 74596,
        coordinates: "41°39′21″N 91°31′30″W"
    },
    {
        name: "Ankeny",
        people: 70287,
        coordinates: "41°43′36″N 93°36′15″W"
    },
    {
        name: "West Des Moines",
        people: 69792,
        coordinates: "41°34′30″N 93°42′33″W"
    },
    {
        name: "Waterloo",
        people: 66941,
        coordinates: "42°29′33″N 92°20′46″W"
    },
    {
        name: "Ames",
        people: 66424,
        coordinates: "42°02′05″N 93°37′12″W"
    },
    {
        name: "Council Bluffs",
        people: 62415,
        coordinates: "41°15′13″N 95°51′45″W"
    },
    {
        name: "Dubuque",
        people: 59119,
        coordinates: "42°30′16″N 90°41′13″W"
    },
    {
        name: "Urbandale",
        people: 45923,
        coordinates: "41°38′11″N 93°44′10″W"
    },
    {
        name: "Marion",
        people: 41703,
        coordinates: "42°02′16″N 91°45′35″W"
    },
    {
        name: "Cedar Falls",
        people: 40388,
        coordinates: "42°31′25″N 92°26′47″W"
    },
    {
        name: "Battendorf",
        people: 39327,
        coordinates: "41°33′00″N 90°29′37″W"
    },
    {
        name: "Marshalltown",
        people: 27388,
        coordinates: "42°02′30″N 92°54′52″W"
    },
    {
        name: "Mason City",
        people: 27138,
        coordinates: "43°08′55″N 93°12′07″W"
    },
    {
        name: "Waukee",
        people: 26495,
        coordinates: "41°36′32″N 93°51′55″W"
    },
    {
        name: "Ottumwa",
        people: 25350,
        coordinates: "41°00′47″N 92°24′53″W"
    },
    {
        name: "Fort Dodge",
        people: 24912,
        coordinates: "42°30′24″N 94°10′49″W"
    },
    {
        name: "Burlington",
        people: 23713,
        coordinates: "40°48′29″N 91°06′57″W"
    },
    {
        name: "Clinton",
        people: 24434,
        coordinates: "41°50′49″N 90°12′26″W"
    },
    {
        name: "Decorah",
        people: 7747,
        coordinates: "43°18′06″N 91°47′25″W"
    },
    {
        name: "Spirit Lake",
        people: 5420,
        coordinates: "43°25′23″N 96°06′15″W"
    },
    {
        name: "Clarinda",
        people: 5690,
        coordinates: "40°44′15″N 95°02′09″W"
    },
].map((city) => ({...city, position: convertCoordinates(city.coordinates)}));
const lines = [
    ["41°43′36″N 93°36′15″W", "42°02′05″N 93°37′12″W"],
    ["41°34′30″N 93°42′33″W", "41°15′13″N 95°51′45″W"],
    ["41°35′27″N 93°37′15″W", "41°00′47″N 92°24′53″W"],
    ["41°35′27″N 93°37′15″W", "42°02′30″N 92°54′52″W"],
    ["42°02′05″N 93°37′12″W", "42°30′24″N 94°10′49″W"],
    ["42°30′24″N 94°10′49″W", "42°29′53″N 96°23′44″W"],
    ["42°29′53″N 96°23′44″W", "41°15′13″N 95°51′45″W"],
    ["42°30′24″N 94°10′49″W", "43°08′55″N 93°12′07″W"],
    ["42°02′05″N 93°37′12″W", "43°08′55″N 93°12′07″W"],
    ["43°08′55″N 93°12′07″W", "42°31′25″N 92°26′47″W"],
    ["42°31′25″N 92°26′47″W", "42°30′16″N 90°41′13″W"],
    ["42°29′33″N 92°20′46″W", "42°02′16″N 91°45′35″W"],
    ["42°30′16″N 90°41′13″W", "42°02′16″N 91°45′35″W"],
    ["42°02′30″N 92°54′52″W", "41°58′59″N 91°40′07″W"],
    ["41°00′47″N 92°24′53″W", "40°48′29″N 91°06′57″W"],
    ["41°58′59″N 91°40′07″W", "41°39′21″N 91°31′30″W"],
    ["41°39′21″N 91°31′30″W", "41°32′35″N 90°35′27″W"],
    ["41°32′35″N 90°35′27″W", "41°50′49″N 90°12′26″W"],
    ["42°30′16″N 90°41′13″W", "41°50′49″N 90°12′26″W"],
    ["41°15′13″N 95°51′45″W", "40°44′15″N 95°02′09″W"],
    ["40°44′15″N 95°02′09″W", "40°48′29″N 91°06′57″W"],
    ["42°29′53″N 96°23′44″W", "43°25′23″N 96°06′15″W"],
    ["43°25′23″N 96°06′15″W", "43°08′55″N 93°12′07″W"],
    ["43°08′55″N 93°12′07″W", "43°18′06″N 91°47′25″W"],
    ["43°18′06″N 91°47′25″W", "42°30′16″N 90°41′13″W"],
]
    .map((points) => points.map(point => cities.findIndex(city => _.isEqual(city.position, convertCoordinates(point)))))
    .map((cityIndex) => cities[cityIndex])

lines.forEach((line) => {
    // const lineString = turf.lineString(line);
    // const along = turf.length(lineString, 200, {units: 'kilometers'});
})

map.on('load', () => {
    lines
        .forEach((line, index) => {
            const citiesLine = line.map((cityIndex) => cities[cityIndex]);
            console.log(citiesLine)
            const name = `route-${index}`;
            map.addSource(name, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': line.map(cityIndex => cities[cityIndex].position)
                    }
                }
            });

            map.addLayer({
                'id': name,
                'type': 'line',
                'source': name,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#888',
                    'line-width': 4
                }
            });

            console
        })

    cities``
        .forEach(city => {
            // const size = Math.max((people/pointsMax) * 64, 16)
            // const el = document.createElement('div');
            // el.className = 'marker';
            // el.style.width = `${size}px`;
            // el.style.height = `${size}px`;
            // el.style.backgroundSize = '100%';

            new mapboxgl.Marker()
                .setLngLat(city.position)
                .addTo(map)
        })


});