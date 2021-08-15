import Category from '../../../lib/domain/category'

describe('category is parsed correctly', () => {

    test('with zero fields', () => {
        const sut = new Category({
            fields: []
        })

        expect(sut).toEqual({
            fields: []
        })
    })

    test('with one field', () => {
        const sut = new Category({
            fields: [
                {
                    abbreviation: 'field-1',
                    subjects: []
                }
            ]
        })

        expect(sut).toEqual({
            fields: [
                {
                    category: sut,
                    abbreviation: 'field-1',
                    subjects: []
                }
            ]
        })
    })

    test('with three fields', () => {
        const sut = new Category({
            fields: [
                {
                    abbreviation: 'field-1',
                    subjects: []
                },
                {
                    abbreviation: 'field-2',
                    subjects: []
                },
                {
                    abbreviation: 'field-3',
                    subjects: []
                }
            ]
        })

        expect(sut).toEqual({
            fields: [
                {
                    category: sut,
                    abbreviation: 'field-1',
                    subjects: []
                },
                {
                    category: sut,
                    abbreviation: 'field-2',
                    subjects: []
                },
                {
                    category: sut,
                    abbreviation: 'field-3',
                    subjects: []
                }
            ]
        })
    })

})
