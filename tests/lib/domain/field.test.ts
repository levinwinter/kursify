import Category from '../../../lib/domain/category'
import Field from '../../../lib/domain/field'

jest.mock('../../../lib/domain/category')

const CategoryMock = Category as jest.Mock<Category>

describe('field is parsed correctly', () => {

    const category = new CategoryMock()

    test('with zero subjects', () => {
        const sut = new Field({
            abbreviation: 'field-1',
            subjects: []
        }, category)
        expect(sut.abbreviation).toBe('field-1')
        expect(sut.subjects).toStrictEqual([])
        expect(sut.category).toBe(category)
    })

    test('with one subject', () => {
        const sut = new Field({
            abbreviation: 'field-1',
            subjects: [
                {
                    abbreviation: 'subject-1',
                    asMajor: true,
                    asMinor: true
                }
            ]
        }, category)
        expect(sut.abbreviation).toBe('field-1')
        expect(sut.subjects[0].abbreviation).toStrictEqual('subject-1')
        expect(sut.subjects[0].asMajor).toBeTruthy()
        expect(sut.subjects[0].asMinor).toBeTruthy()
        expect(sut.category).toBe(category)
    })

    test('with three subjects', () => {
        const sut = new Field({
            abbreviation: 'field-1',
            subjects: [
                {
                    abbreviation: 'subject-1',
                    asMajor: true,
                    asMinor: true
                },
                {
                    abbreviation: 'subject-2',
                    asMajor: true,
                    asMinor: false
                },
                {
                    abbreviation: 'subject-3',
                    asMajor: false,
                    asMinor: true
                }
            ]
        }, category)
        expect(sut.abbreviation).toBe('field-1')
        expect(sut.subjects[0].abbreviation).toStrictEqual('subject-1')
        expect(sut.subjects[0].asMajor).toBeTruthy()
        expect(sut.subjects[0].asMinor).toBeTruthy()
        expect(sut.subjects[1].abbreviation).toStrictEqual('subject-2')
        expect(sut.subjects[1].asMajor).toBeTruthy()
        expect(sut.subjects[1].asMinor).toBeFalsy()
        expect(sut.subjects[2].abbreviation).toStrictEqual('subject-3')
        expect(sut.subjects[2].asMajor).toBeFalsy()
        expect(sut.subjects[2].asMinor).toBeTruthy()
        expect(sut.category).toBe(category)
    })


})
