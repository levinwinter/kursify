/**
 * Returns the difference between two arrays. It respects multiplicities and
 * does not mutate the original input.
 * @param minuend The array to subtract from
 * @param subtrahend The array to subtract
 * @returns The difference between the minuend and the subtrahend
 */
export function minus(minuend: string[], subtrahend: string[]): string[]  {
    const difference = minuend.slice()
    subtrahend.forEach(value => {
        const index = difference.indexOf(value)
        if (index != -1) difference.splice(index, 1)
    })
    return difference
}

/**
 * Determines whether an array is a subarray of another array. It respects
 * multiplicities and does not mutate the input.
 * @param subarray The subarray to check
 * @param superarray The superarray to check
 * @returns A boolean indicating whether the first argument is a subarray of the
 * second argument.
 */
export function isSubarray(subarray: string[], superarray: string[]): boolean {
    for (const index in subarray) {
        const value = subarray[index]
        const valueMultiplicity = subarray.filter(x => value === x).length
        const superMultiplicity = superarray.filter(x => value === x).length
        if (superMultiplicity < valueMultiplicity) return false
    }
    return true
}
