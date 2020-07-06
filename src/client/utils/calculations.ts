export function findWithId(array: any[], value: number) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['id'] === value) {
            return i;
        }
    }
    return -1;
}

export function calculateDiff(score: number, courseRating: number, slope: number) {
    return Math.round((113 / slope) * (score - courseRating) * 10) / 10;
}

export function calculateIndex(diffs: number[]) {
    diffs.sort((a, b) => a - b);
    switch (diffs.length) {
        case 0:
        case 1:
        case 2:
            return 'NI';
        case 3:
            return diffs[0] - 2;
        case 4:
            return diffs[0] - 1;
        case 5:
            return diffs[0];
        case 6:
            return ((diffs[0] + diffs[1]) / 2) - 1;
        case 7:
        case 8:
            return (diffs[0] + diffs[1]) / 2;
        case 9: 
        case 10:
        case 11:
            return (diffs[0] + diffs[1] + diffs[2]) / 3;
        case 12: 
        case 13:
        case 14:
            return (diffs[0] + diffs[1] + diffs[2] + diffs[3]) / 4;
        case 15:
        case 16:
            return (diffs[0] + diffs[1] + diffs[2] + diffs[3] + diffs[4]) / 5;
        case 17: 
        case 18:
            return (diffs[0] + diffs[1] + diffs[2] + diffs[3] + diffs[4] + diffs[5]) / 6;
        case 19:
            return (diffs[0] + diffs[1] + diffs[2] + diffs[3] + diffs[4] + diffs[5] + diffs[6]) / 7;
        default:
            return (diffs[0] + diffs[1] + diffs[2] + diffs[3] + diffs[4] + diffs[5] + diffs[6] + diffs[7]) / 8;
    }
}
