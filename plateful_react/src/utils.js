function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function isValidUPC(upc) {
    if (
        upc.length !== 8 &&
        upc.length !== 12 &&
        upc.length !== 13 &&
        upc.length !== 14 &&
        upc.length !== 18
    ) {
        return false;
    }

    var arr = upc.split("").reverse();
    var oddTotal = 0;
    var evenTotal = 0;

    for (let i = 0; i < arr.length; i++) {
        if (isNaN(arr[i])) {
            return false;
        }

        if (i % 2 === 0) {
            evenTotal += Number(arr[i]);
        } else {
            oddTotal += Number(arr[i]);
        }
    }

    var check = (evenTotal + 3 * oddTotal) % 10;

    return check === 0;
}

export function getRandomSubset(array, subsetLength, condition) {
    shuffleArray(array);

    let subset = [];

    let i = 0;

    while (subset.length < subsetLength && i < array.length) {
        if (condition && condition(array[i])) {
            subset.push(array[i]);
        } else {
            subset.push(array[i]);
        }
        i++;
    }

    return subset;
}
