function convertCoordinates(coord) {
    const regex = /(\d+)°(\d+)′(\d+)″([NSWE])/g;
    return Array.from(coord.matchAll(regex))
        .map(match => {
            if (!match || match.length !== 5) {
                console.error('Wrong coordinate format.');
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