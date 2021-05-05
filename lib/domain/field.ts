import { UnparsedField } from "./unparsedTypes"
import Category from "./category"
import Subject from "./subject"

/**
 * The field class provides a logical group for a list of subjects which all
 * belong to the same field.
 */
export default class Field {

    readonly abbreviation: string
    readonly category: Category
    readonly subjects: readonly Subject[]

    /**
     * Parses the given field and links it to its category.
     * @param unparsedField The unparsed representation of the field
     * @param category The category it belongs to
     */
    public constructor(unparsedField: UnparsedField, category: Category) {
        this.abbreviation = unparsedField.abbreviation
        this.category = category
        this.subjects = unparsedField.subjects.map(x => new Subject(x, this))
    }

}
