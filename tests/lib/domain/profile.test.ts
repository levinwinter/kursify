import Profile from '../../../lib/domain/profile'
import emptyProfile from '../../profiles/empty-profile'
import tinyProfile from '../../profiles/tiny-profile'
import mediumProfile from '../../profiles/medium-profile'

describe('profile parsed correctly', () => {

    test('with zero categories, fields, subjects, and combinations', () => {
        const sut = new Profile(emptyProfile)
        expect(sut.name).toBe('Empty Profile')
        expect(sut.categories).toStrictEqual([])
        expect(sut.fields).toStrictEqual([])
        expect(sut.subjects).toStrictEqual([])
        expect(sut.combinations).toStrictEqual([])
    })

    test('with one category, field, subject, and combination', () => {
        const sut = new Profile(tinyProfile)
        expect(sut.name).toBe('Tiny Profile')
        expect(sut.categories.length).toBe(1)
        expect(sut.fields.length).toBe(1)
        expect(sut.fields[0].abbreviation).toBe('field-1')
        expect(sut.subjects.length).toBe(1)
        expect(sut.subjects[0].abbreviation).toBe('subject-1')
        expect(sut.combinations.length).toBe(1)
        expect(sut.combinations[0].id).toBe(1)
    })

    test('with two categories, four fields, eight subjects, and two combinations', () => {
        const sut = new Profile(mediumProfile)
        expect(sut.name).toBe('Medium Profile')
        expect(sut.categories.length).toBe(2)
        expect(sut.fields.length).toBe(4)
        expect(sut.fields[0].abbreviation).toBe('field-1')
        expect(sut.fields[1].abbreviation).toBe('field-2')
        expect(sut.fields[2].abbreviation).toBe('field-3')
        expect(sut.fields[3].abbreviation).toBe('field-4')
        expect(sut.subjects.length).toBe(8)
        expect(sut.subjects[0].abbreviation).toBe('subject-1')
        expect(sut.subjects[1].abbreviation).toBe('subject-2')
        expect(sut.subjects[2].abbreviation).toBe('subject-3')
        expect(sut.subjects[3].abbreviation).toBe('subject-4')
        expect(sut.subjects[4].abbreviation).toBe('subject-5')
        expect(sut.subjects[5].abbreviation).toBe('subject-6')
        expect(sut.subjects[6].abbreviation).toBe('subject-7')
        expect(sut.subjects[7].abbreviation).toBe('subject-8')
        expect(sut.combinations.length).toBe(2)
        expect(sut.combinations[0].id).toBe(1)
        expect(sut.combinations[1].id).toBe(2)
    })

})
