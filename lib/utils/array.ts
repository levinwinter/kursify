import Field from '../domain/field'

/**
 * Determines whether an array is a subarray of another array. It respects
 * multiplicities and does not mutate the input.
 * @param subarray The subarray to check
 * @param superarray The superarray to check
 * @returns A boolean indicating whether the first argument is a subarray of the
 * second argument.
 */
export function isSubarray(subarray: readonly Field[], superarray: readonly Field[]): boolean {
    for (const index in subarray) {
        const value = subarray[index]
        const valueMultiplicity = subarray.filter(x => value === x).length
        const superMultiplicity = superarray.filter(x => value === x).length
        if (superMultiplicity < valueMultiplicity) return false
    }
    return true
}

/**
 * Checks whether two arrays are equal by determining whether they have the same
 * contents. The order of the elements is irrelevant, multiplicities matter.
 * @param a The first array to check
 * @param b The second array to check
 * @returns A boolean indicating whether the two arrays have the same elements.
 */
export function isEqual(a: readonly Field[], b: readonly Field[]): boolean {
    return isSubarray(a, b) && isSubarray(b, a)
}
