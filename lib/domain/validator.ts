import { uniq } from 'lodash';
import Combination from './combination';
import Profile from './profile';
import Choice from './choice';
import Subject from './subject';

/**
 * The Validator class provides a way to check to which combination a choice corresponds.
 * Furthermore, it generates a list of subjects that can be chosen.
 */
export default class Validator {

    private profile: Profile

    /**
     * Instantiates the validator with the given profile.
     * @param profile The profile to use for validation
     */
    public constructor(profile: Profile) {
        this.profile = profile
    }

    /**
     * Checks all the combinations in the profile whether they match the given choice.
     * @param choice The choice to match against the profile
     * @returns The combination it matches or undefined if it does not match a combination
     */
    public findMatchingCombination(choice: Choice): (Combination | undefined) {
        return this.profile.combinations.find(combination => combination.matches(choice))
    }

    /**
     * Find all available subjects given some choice that will eventually match a valid
     * combination.
     * @param choice The choice to get the available subjects for
     * @returns An object containing a list of available majors and minors
     */
    public availableSubjects(choice: Choice): { majors: Subject[], minors: Subject[] } {
        return this.profile.combinations.filter(combination => {
            return combination.matchesPartially(choice)
        }).map(combination => {
            return {
                majors: combination.majors.flatMap(major => major.subjects),
                minors: combination.minors.flatMap(minor => minor.flatMap(x => x.subjects))
            }
        }).reduce((previous, current) => {
            current.majors = uniq([...previous.majors, ...current.majors])
            current.minors = uniq([...previous.minors, ...current.minors])
            return current
        }, { majors: [], minors: [] })
    }

}
