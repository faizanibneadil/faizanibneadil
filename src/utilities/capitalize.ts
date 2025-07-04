export function capitalize(str:string) {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected string but received ${typeof str}`);
    }
    if (!str.trim()) {
        throw new TypeError('Input string cannot be empty');
    }

    return str
        .split('_')
        .map(word => {
            if (!word) return ''; // Handle empty segments
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}