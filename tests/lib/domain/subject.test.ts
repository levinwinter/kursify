import Field from '../../../lib/domain/field';
import Subject from '../../../lib/domain/subject';
import { UnparsedSubject } from '../../../lib/types';

jest.mock('../../../lib/domain/field');

test('subject is parsed correctly', () => {
    const field = new (Field as jest.Mock<Field>)()
    const unparsedSubject: UnparsedSubject = {
        abbreviation: 'XYZ',
        asMajor: false,
        asMinor: true
    }
    const sut = new Subject(unparsedSubject, field)
    expect(sut.abbreviation).toBe('XYZ')
    expect(sut.asMajor).toBeFalsy()
    expect(sut.asMinor).toBeTruthy()
    expect(sut.field).toBe(field)
})
