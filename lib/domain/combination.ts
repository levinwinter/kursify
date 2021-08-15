import { UnparsedCombination } from './unparsedTypes';
import { isEqual, isSubarray } from '../utils/array';
import Choice from './choice';
import Field from './field';
import Subject from "./subject";
import {difference, uniq} from "lodash";

/**
 * A combination contains a predefined set of fields for majors and minors each. The
 * validity of a the choice of a student can be guaranteed if it matches a combination.
 */
export default class Combination {
    
    readonly id: number
    readonly majors: readonly Field[]
    readonly minors: readonly Field[][]
    
    /**
     * Parses a combination by mapping the strings to actual fields and expanding all
     * possible combinations of minors.
     * @param unparsedCombination An unparsed representation of the combination
     * @param fields A list of all field instances
     */
    public constructor(unparsedCombination: UnparsedCombination, fields: readonly Field[]) {
        this.id = unparsedCombination.id
        this.majors = unparsedCombination.majors.map(major => {
            return this.abbreviationToField(major, fields)
        })
        let unfolded: string[][] = unparsedCombination.minors.length === 0 ? [] : [[]]
        unparsedCombination.minors.forEach(minorField => {
            unfolded = unfolded.flatMap(x => minorField.map(field => [...x, field]))
        })
        this.minors = unfolded.map(x => x.map(v => this.abbreviationToField(v, fields)))
    }
    
    /**
     * The matches method determines wether a given choice matches all the constraints imposed
     * by this combination.
     * @param choice The choice to match against this combination
     * @returns A boolean indicating wether the choice satisfies this combination
     */
    public matches(choice: Choice): boolean {
        return isEqual(choice.asFields().majors, this.majors)
            && this.minors.some(variation => isEqual(choice.asFields().minors, variation))
    }

    /**
     * The matchesPartially method indicates whether a given choice could potentially match this
     * combination. To partially match, it must be a subset of a valid choice.
     * @param choice The choice to partially match against this combination
     * @returns A boolean indicating whether the choice satisfies this combination
     */
    public matchesPartially(choice: Choice): boolean {
        return isSubarray(choice.asFields().majors, this.majors)
            && this.minors.some(variation => isSubarray(choice.asFields().minors, variation))

    }

    public availableSubjects(choice: Choice): { majors: Subject[], minors: Subject[] } {
        return {
            majors: difference(this.majors, choice.asFields().majors).flatMap(field => field.subjects),
            minors: uniq(this.minors.filter(minors => {
                return isSubarray(choice.asFields().minors, minors)
            }).map(minors => {
                return difference(minors, choice.asFields().minors)
            })).flatMap(minors => {
                return minors.flatMap(minor => minor.subjects)
            })
        }
    }
    
    /**
     * Maps the string representation of a field to its instance.
     * @param abbreviation The string abbreviation of the field
     * @param fields A list of all parsed fields
     * @returns The field instance corresponding to the given abbreviation
     */
    private abbreviationToField(abbreviation: string, fields: readonly Field[]): Field {
        const foundField = fields.find(field => field.abbreviation === abbreviation)
        if (foundField === undefined) {
            throw new Error(`The field '${abbreviation}' could not be found`)
        }
        return foundField
    }

    //TODO maybe remove or integrate into constructor
    private unfoldedMinors(): Field[][] {
        return this.minors.reduce((previousValue, currentValue) => {
            return currentValue.flatMap(field => previousValue.map(y => [...y, field]))
        }, [[]] as Field[][])
    }
    
}
