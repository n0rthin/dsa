export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    while (low < high) {
        const middle = low + Math.floor((high - low) / 2);
        const value = haystack[middle];

        if (value === needle) {
            return true;
        } else if (needle > value) {
            low = middle + 1;
        } else {
            high = middle;
        }
    }

    return false;
}

