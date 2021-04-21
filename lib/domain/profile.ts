import { UnparsedProfile } from "../types";
import Category from "./category";
import Combination from "./combination";
import Field from "./field";
import Subject from "./subject";

/**
 * A profile accurately describes the entire domain of a school. It can be used
 * to dynamically configure the verifier.
 */
export default class Profile {

    readonly name: string

    readonly categories: readonly Category[]
    readonly fields: readonly Field[]
    readonly subjects: readonly Subject[]

    readonly combinations: readonly Combination[]

    /**
     * Parses the profile into an instance and extracts all fields and subjects.
     * @param unparsedProfile The unparsed profile
     */
    public constructor(unparsedProfile: UnparsedProfile) {
        this.name = unparsedProfile.name
        this.categories = unparsedProfile.categories.map(x => new Category(x))
        this.fields = this.categories.map(category => category.fields).flat()
        this.subjects = this.fields.map(field => field.subjects).flat()
        this.combinations = unparsedProfile.combinations
            .map(combination => new Combination(combination, this.fields))
    }

}
