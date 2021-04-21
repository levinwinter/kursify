import Category from '../../../lib/domain/category'
import Field from '../../../lib/domain/field'
import { UnparsedField } from '../../../lib/types'

jest.mock('../../../lib/domain/category')

test('field is parsed correctly', () => {
    const category = new (Category as jest.Mock<Category>)()
    const unparsedField: UnparsedField = {
        abbreviation: 'XYZ',
        subjects: [
            {
                abbreviation: 'ABC',
                asMajor: true,
                asMinor: true
            }
        ]
    }
    const sut = new Field(unparsedField, category)
    expect(sut.abbreviation).toBe('XYZ')
    expect(sut.category).toBe(category)
    expect(sut.subjects.length).toBe(1)
})
