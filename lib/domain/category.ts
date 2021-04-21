import { UnparsedCategory } from "../types";
import Field from "./field";

/**
 * The Category class represents a group of fields. Its purpose is to create sets of
 * fields that all contain similar subjects. Categories are used in the frontend to
 * visually separate and group different subjects.
 */
export default class Category {

    readonly fields: readonly Field[]

    /**
     * Parses an unparsed category into a domain object.
     * @param unparsedCategory The unparsed representation of this category
     */
    public constructor(unparsedCategory: UnparsedCategory) {
        this.fields = unparsedCategory.fields.map(x => new Field(x, this))
    }

}
