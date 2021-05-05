import Field from '../../../lib/domain/field'
import Subject from '../../../lib/domain/subject'

jest.mock('../../../lib/domain/field');

const FieldMock = Field as jest.Mock<Field>

describe('subject is parsed correctly', () => {
    
    const field = new FieldMock()

    test('from regular unparsed subject', () => {
        const sut = new Subject({
            abbreviation: 'subject-1',
            asMajor: false,
            asMinor: true
        }, field)
        expect(sut.abbreviation).toBe('subject-1')
        expect(sut.asMajor).toBeFalsy()
        expect(sut.asMinor).toBeTruthy()
        expect(sut.field).toBe(field)
    })

})
