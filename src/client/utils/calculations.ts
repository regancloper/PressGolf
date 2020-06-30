export function findWithId(array: any[], value: number) {
    for (let i = 0; i < array.length; i ++) {
        if (array[i]['id'] === value) {
            return i;
        }
    }
    return -1;
}
