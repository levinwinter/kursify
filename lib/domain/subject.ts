import { UnparsedSubject } from "./unparsedTypes"
import Field from "./field"

/**
 * A subject is the most specific entity in the domain and stores various
 * attributes.
 */
export default class Subject {

    readonly abbreviation: string
    readonly asMajor: boolean
    readonly asMinor: boolean

    readonly field: Field

    /**
     * Parses the representation of the subject and creates a corresponding
     * instance.
     * @param unparsedSubject The unparsed representation of the subject
     * @param field The field the subject belongs to
     */
    public constructor(unparsedSubject: UnparsedSubject, field: Field) {
        this.abbreviation = unparsedSubject.abbreviation
        this.asMajor = unparsedSubject.asMajor
        this.asMinor = unparsedSubject.asMinor
        this.field = field
    }

}
