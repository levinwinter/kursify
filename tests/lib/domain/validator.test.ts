import Choice from '../../../lib/domain/choice'
import Profile from '../../../lib/domain/profile'
import Validator from '../../../lib/domain/validator'
import emptyProfile from '../../profiles/empty-profile'
import mediumProfile from '../../profiles/medium-profile'

describe('finds matching combination', () => {

    test('with empty profile', () => {
        const sut = new Validator(new Profile(emptyProfile))
        const choice = new Choice([], [])
        expect(sut.findMatchingCombination(choice)).toBeFalsy()
    })

    test('with valid choice', () => {
        const profile = new Profile(mediumProfile)
        const sut = new Validator(profile)
        const choice = new Choice([profile.subjects[4], profile.subjects[6]],
            [profile.subjects[0], profile.subjects[5], profile.subjects[7]])
        expect(sut.findMatchingCombination(choice)).toBe(profile.combinations[1])
    })

    test('with invalid choice', () => {
        const profile = new Profile(mediumProfile)
        const sut = new Validator(profile)
        const choice = new Choice([profile.subjects[1], profile.subjects[7]],
            [profile.subjects[2], profile.subjects[2], profile.subjects[3]])
        expect(sut.findMatchingCombination(choice)).toBeUndefined()
    })

})

describe('finds available subjects', () => {

    test('no subjects with empty profile', () => {
        const sut = new Validator(new Profile(emptyProfile))
        const choice = new Choice([], [])
        expect(sut.availableSubjects(choice)).toStrictEqual({
            majors: [],
            minors: []
        })
    })

    test('for no matching combination', () => {
        const profile = new Profile(mediumProfile)
        const sut = new Validator(profile)
        const choice = new Choice([profile.subjects[1], profile.subjects[7]], [])
        expect(sut.availableSubjects(choice)).toStrictEqual({
            majors: [],
            minors: []
        })
    })

    test('for one matching combination', () => {
        const profile = new Profile(mediumProfile)
        const sut = new Validator(profile)
        const choice = new Choice([profile.subjects[0], profile.subjects[2]], [])
        expect(sut.availableSubjects(choice)).toStrictEqual({
            majors: [profile.subjects[0], profile.subjects[1], profile.subjects[2], profile.subjects[3]],
            minors: [profile.subjects[0], profile.subjects[1], profile.subjects[2], profile.subjects[3],
                profile.subjects[4], profile.subjects[5], profile.subjects[6], profile.subjects[7]]
        })
    })

    test('for two matching combinations', () => {
        const profile = new Profile(mediumProfile)
        const sut = new Validator(profile)
        const choice = new Choice([], [profile.subjects[0]])
        expect(sut.availableSubjects(choice)).toStrictEqual({
            majors: [profile.subjects[0], profile.subjects[1], profile.subjects[2], profile.subjects[3],
            profile.subjects[4], profile.subjects[5], profile.subjects[6], profile.subjects[7]],
            minors: [profile.subjects[0], profile.subjects[1], profile.subjects[2], profile.subjects[3],
                profile.subjects[4], profile.subjects[5], profile.subjects[6], profile.subjects[7]]
        })
    })

})
