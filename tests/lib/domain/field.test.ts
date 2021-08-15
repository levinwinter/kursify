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

        expect(sut).toEqual({
            abbreviation: 'field-1',
            subjects: [],
            category: category
        })
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

        expect(sut).toEqual({
            abbreviation: 'field-1',
            subjects: [
                {
                    abbreviation: 'subject-1',
                    asMajor: true,
                    asMinor: true,
                    field: sut
                }
            ],
            category: category
        })
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

        expect(sut).toEqual({
            abbreviation: 'field-1',
            subjects: [
                {
                    abbreviation: 'subject-1',
                    asMajor: true,
                    asMinor: true,
                    field: sut
                },
                {
                    abbreviation: 'subject-2',
                    asMajor: true,
                    asMinor: false,
                    field: sut
                },
                {
                    abbreviation: 'subject-3',
                    asMajor: false,
                    asMinor: true,
                    field: sut
                }
            ],
            category: category
        })
    })

})
