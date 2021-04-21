import Category from '../../../lib/domain/category'
import { UnparsedCategory } from '../../../lib/types'

test('category is parsed correctly', () => {
    const unparsedCategory: UnparsedCategory = {
        fields: [
            {
                abbreviation: 'XYZ',
                subjects: []
            }
        ]
    }
    const sut = new Category(unparsedCategory)
    expect(sut.fields.length).toBe(1)
})
