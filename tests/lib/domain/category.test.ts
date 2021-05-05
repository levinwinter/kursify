import Category from '../../../lib/domain/category'

describe('category is parsed correctly', () => {

    test('with zero fields', () => {
        const sut = new Category({
            fields: []
        })
        expect(sut.fields.length).toBe(0)
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
        expect(sut.fields.length).toBe(1)
        expect(sut.fields[0].category).toBe(sut)
        expect(sut.fields[0].abbreviation).toBe('field-1')
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
        expect(sut.fields.length).toBe(3)
        expect(sut.fields[0].category).toBe(sut)
        expect(sut.fields[0].abbreviation).toBe('field-1')
        expect(sut.fields[1].category).toBe(sut)
        expect(sut.fields[1].abbreviation).toBe('field-2')
        expect(sut.fields[2].category).toBe(sut)
        expect(sut.fields[2].abbreviation).toBe('field-3')
    })

})
