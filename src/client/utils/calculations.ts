export function findWithId(array: any[], value: number) {
    for (let i = 0; i < array.length; i ++) {
        if (array[i]['id'] === value) {
            return i;
        }
    }
    return -1;
}

export function calculateDiff(score: number, courseRating: number, slope: number) {
    return Math.round((113 / slope) * (score - courseRating) * 10) / 10;
}
