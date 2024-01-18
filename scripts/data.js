const fiberAttenuation = 0.25; // dB/km
const fiberDispersion = 0.092; // ps/(nm^2 * km)
const marginPowerLossDb = 6;
const repeaterBoosterInputDbm = -10;
const repeaterBoosterAmplificationDb = 20;
const repeaterBoosterOutputDbm = repeaterBoosterInputDbm + repeaterBoosterAmplificationDb;
const repeaterInLineInputDbm = -20;
const repeaterInLineAmplificationDb = 25;
const repeaterInLineOutputDbm = repeaterInLineInputDbm + repeaterInLineAmplificationDb;
const connectorPowerDropDb = 0.15;
const weldPowerDropDb = 0.15;
const cableLength = 1; // km


const cities = [
    {
        name: "Des Moines",
        people: 212031,
        positionString: "41°35′27″N 93°37′15″W"
    },
    {
        name: "Cedar Rapids",
        people: 136467,
        positionString: "41°58′59″N 91°40′07″W"
    },
    {
        name: "Deavenport",
        people: 101009,
        positionString: "41°32′35″N 90°35′27″W"
    },
    {
        name: "Sioux City",
        people: 85617,
        positionString: "42°29′53″N 96°23′44″W"
    },
    {
        name: "Iowa City",
        people: 74596,
        positionString: "41°39′21″N 91°31′30″W"
    },
    {
        name: "Ankeny",
        people: 70287,
        positionString: "41°35′27″N 93°37′15″W"
    },
    {
        name: "West Des Moines",
        people: 69792,
        positionString: "41°35′27″N 93°37′15″W"
    },
    {
        name: "Waterloo",
        people: 66941,
        positionString: "42°29′33″N 92°20′46″W"
    },
    {
        name: "Ames",
        people: 66424,
        positionString: "42°02′05″N 93°37′12″W"
    },
    {
        name: "Council Bluffs",
        people: 62415,
        positionString: "41°15′13″N 95°51′45″W"
    },
    {
        name: "Dubuque",
        people: 59119,
        positionString: "42°30′16″N 90°41′13″W"
    },
    {
        name: "Marshalltown",
        people: 27388,
        positionString: "42°02′30″N 92°54′52″W"
    },
    {
        name: "Mason City",
        people: 27138,
        positionString: "43°08′55″N 93°12′07″W"
    },
    {
        name: "Ottumwa",
        people: 25350,
        positionString: "41°00′47″N 92°24′53″W"
    },
    {
        name: "Fort Dodge",
        people: 24912,
        positionString: "42°30′24″N 94°10′49″W"
    },
    {
        name: "Burlington",
        people: 23713,
        positionString: "40°48′29″N 91°06′57″W"
    },
    {
        name: "Clinton",
        people: 24434,
        positionString: "41°50′49″N 90°12′26″W"
    },
    {
        name: "Decorah",
        people: 7747,
        positionString: "43°18′06″N 91°47′25″W"
    },
    {
        name: "Spirit Lake",
        people: 5420,
        positionString: "43°25′23″N 96°06′15″W"
    },
    {
        name: "Clarinda",
        people: 5690,
        positionString: "40°44′15″N 95°02′09″W"
    },
].map((city) => ({...city, position: getPositionByString(city.positionString)}));

const lines = [
    {positionsString: ["41°35′27″N 93°37′15″W", "42°02′05″N 93°37′12″W"]},
    {positionsString: ["41°35′27″N 93°37′15″W", "41°15′13″N 95°51′45″W"]},
    {positionsString: ["41°35′27″N 93°37′15″W", "41°00′47″N 92°24′53″W"]},
    {positionsString: ["41°35′27″N 93°37′15″W", "42°02′30″N 92°54′52″W"]},
    {positionsString: ["42°02′05″N 93°37′12″W", "42°30′24″N 94°10′49″W"]},
    {positionsString: ["42°30′24″N 94°10′49″W", "42°29′53″N 96°23′44″W"]},
    {positionsString: ["42°29′53″N 96°23′44″W", "41°15′13″N 95°51′45″W"]},
    {positionsString: ["42°30′24″N 94°10′49″W", "43°08′55″N 93°12′07″W"]},
    {positionsString: ["42°02′05″N 93°37′12″W", "43°08′55″N 93°12′07″W"]},
    {positionsString: ["43°08′55″N 93°12′07″W", "42°29′33″N 92°20′46″W"]},
    {positionsString: ["42°29′33″N 92°20′46″W", "42°30′16″N 90°41′13″W"]},
    {positionsString: ["42°29′33″N 92°20′46″W", "41°58′59″N 91°40′07″W"]},
    {positionsString: ["42°30′16″N 90°41′13″W", "41°58′59″N 91°40′07″W"]},
    {positionsString: ["42°02′30″N 92°54′52″W", "41°58′59″N 91°40′07″W"]},
    {positionsString: ["41°00′47″N 92°24′53″W", "40°48′29″N 91°06′57″W"]},
    {positionsString: ["41°58′59″N 91°40′07″W", "41°39′21″N 91°31′30″W"]},
    {positionsString: ["41°39′21″N 91°31′30″W", "41°32′35″N 90°35′27″W"]},
    {positionsString: ["41°32′35″N 90°35′27″W", "41°50′49″N 90°12′26″W"]},
    {positionsString: ["42°30′16″N 90°41′13″W", "41°50′49″N 90°12′26″W"]},
    {positionsString: ["41°15′13″N 95°51′45″W", "40°44′15″N 95°02′09″W"]},
    {positionsString: ["40°44′15″N 95°02′09″W", "40°48′29″N 91°06′57″W"]},
    {positionsString: ["42°29′53″N 96°23′44″W", "43°25′23″N 96°06′15″W"]},
    {positionsString: ["43°25′23″N 96°06′15″W", "43°08′55″N 93°12′07″W"]},
    {positionsString: ["43°08′55″N 93°12′07″W", "43°18′06″N 91°47′25″W"]},
    {positionsString: ["43°18′06″N 91°47′25″W", "42°30′16″N 90°41′13″W"]},
]
    .map((line) => ({...line, positions: getPositionsByString(line.positionsString) }))
    .map((line) => ({...line, ...getRepeaters(line) }))
    .map((line) => ({...line, cities: getCitiesByPositions(line.positions) }));


let result = '';
lines
    .forEach((line) => {
        const lineString = turf.lineString(line.positions);
        const lineLength = turf.length(lineString, 200, {units: 'kilometers'});

        result += ([
            line.cities.map(city => city.name).join(' - '),
            lineLength.toFixed(2).replace('.', ','),
            line.repeaterPositions.length,
            line.welds,
            line.totalPower.toFixed(1).replace('.', ','),
        ].join('\t')) + '\n'
    })
console.log(result)
