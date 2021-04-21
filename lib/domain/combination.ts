import { UnparsedCombination } from "../types";
import Field from "./field";

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
    
}
