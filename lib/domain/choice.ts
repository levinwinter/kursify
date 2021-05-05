import Field from './field';
import Subject from './subject';

/**
 * The Choice class is a container for a list of major and minor subjects. It represents
 * a possible choice that a student has made. A validator can be used to determine its
 * validity by checking it against a profile.
 */
export default class Choice {

    public majors: readonly Subject[]
    public minors: readonly Subject[]

    /**
     * Instantiates a new choice with the given subjects.
     * @param majors A list of majors the student selected
     * @param minors A list of minors the student selected
     */
    public constructor(majors: Subject[], minors: Subject[]) {
        this.majors = majors.slice()
        this.minors = minors.slice()
    }

    /**
     * Maps the choice to an object containing the chosen fields.
     * @returns An object that contains the fields of the chosen subjects
     */
    public asFields(): ({ majors: Field[], minors: Field[] }) {
        return {
            majors: this.majors.map(major => major.field),
            minors: this.minors.map(minors => minors.field)
        }
    }

}
