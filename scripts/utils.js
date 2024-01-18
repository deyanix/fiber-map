function getPositionByString(position) {
    const regex = /(\d+)°(\d+)′(\d+)″([NSWE])/g;
    return Array.from(position.matchAll(regex))
        .map(match => {
            if (!match || match.length !== 5) {
                console.error('Wrong position format.');
                return null;
            }

            const degrees = parseFloat(match[1]);
            const minutes = parseFloat(match[2]);
            const seconds = parseFloat(match[3]);
            const direction = match[4];

            const result = degrees + (minutes / 60) + (seconds / 3600);
            if (direction === 'S' || direction === 'W') {
                return -result;
            }
            return result;
        })
        .reverse();
}

function getPositionsByString(points) {
    return points.map(point => getPositionByString(point));
}

function getRepeaters(line) {
    const lineString = turf.lineString(line.positions);
    const lineLength = turf.length(lineString, 200, {units: 'kilometers'});
    const attenuation = lineLength * fiberAttenuation;

    let totalPowerDbm = repeaterBoosterOutputDbm - attenuation - 2*connectorPowerDropDb - marginPowerLossDb;
    let repeaters = 0;
    while (totalPowerDbm < repeaterInLineInputDbm) {
        repeaters++;
        totalPowerDbm += repeaterInLineAmplificationDb;
        totalPowerDbm -= 2*connectorPowerDropDb;
    }

    const cableFragmentsBeforeWeld = repeaters+1;
    const repeatersDistanceBeforeWeld = lineLength / cableFragmentsBeforeWeld;
    const welds = Math.floor(repeatersDistanceBeforeWeld / cableLength);
    totalPowerDbm -= welds * weldPowerDropDb * cableFragmentsBeforeWeld;

    while (totalPowerDbm < repeaterInLineInputDbm) {
        repeaters++;
        totalPowerDbm += repeaterInLineAmplificationDb;
        totalPowerDbm -= 2*connectorPowerDropDb;
    }

    const cableFragments = repeaters+1;
    const repeatersDistance = lineLength / cableFragments;

    return {
        welds,
        totalPower: totalPowerDbm,
        repeaterPositions: Array.from(Array(repeaters).keys())
            .map((i) =>
                turf.getCoord(turf.along(lineString, (i+1) * repeatersDistance, {units: 'kilometers'})))
    }
}

function getCitiesByPositions(positions) {
    return positions.map(position => cities.find(city => _.isEqual(city.position, position)))
}
