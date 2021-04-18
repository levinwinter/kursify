import { clone, cloneDeep } from 'lodash'
import { Combination, UnfoldedCombination } from "../types";

/**
 * This method unfolds the given combination by calculating all permutations
 * of the given minors.
 * @param combination The combination to unfold
 * @returns An unfolded version of the provided combination
 */
export function unfold(combination: Combination): UnfoldedCombination[] {
    let unfolded = [cloneDeep(combination.minors)]
    combination.minors.forEach((minor, index) => {
        unfolded = unfolded.map(value => unfoldPosition(value, index)).flat()
    })
    return unfolded.map(unfoldedMinors => ({
        id: combination.id,
        majors: clone(combination.majors),
        minors: unfoldedMinors as string[]
    }))
}

/**
 * It unfolds a specific position in a given array while not modifying the input.
 * @param input The array to unfold
 * @param position The position to unfold in the given array
 * @returns An array containing all unfolded versions of the input
 */
function unfoldPosition(input: Combination["minors"], position: number): Combination["minors"][] {
    const unfolded: Combination["minors"][] = []
    const template = cloneDeep(input)
    const element = input[position]
    if (!Array.isArray(element)) return [template]
    element.forEach(value => {
        template[position] = value
        unfolded.push(cloneDeep(template))
    })
    return unfolded
}
