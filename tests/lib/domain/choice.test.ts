import Choice from '../../../lib/domain/choice'
import Field from '../../../lib/domain/field'
import Subject from '../../../lib/domain/subject'

jest.mock('../../../lib/domain/field')
jest.mock('../../../lib/domain/subject', () => {
    return function(field: Field) {
        return {
            field: field
        }
    }
})

const FieldMock = Field as jest.Mock<Field>
const fA = new FieldMock()
const fB = new FieldMock()
const fC = new FieldMock()
const SubjectMock = Subject as jest.Mock<Subject>
const sA = new SubjectMock(fA)
const sB = new SubjectMock(fA)
const sC = new SubjectMock(fB)
const sD = new SubjectMock(fA)
const sE = new SubjectMock(fC)
const sF = new SubjectMock(fB)

describe('choice is parsed correctly', () => {

    test('with no majors and minors', () => {
        const sut = new Choice([], [])
        expect(sut.majors).toStrictEqual([])
        expect(sut.minors).toStrictEqual([])
    })

    test('with three majors and three minors', () => {
        const sut = new Choice([sA, sB, sC], [sD, sE, sF])
        expect(sut.majors).toStrictEqual([sA, sB, sC])
        expect(sut.minors).toStrictEqual([sD, sE, sF])
    })

})

describe('choice is mapped to fields correctly', () => {

    test('with no majors and minors', () => {
        const sut = new Choice([], [])
        expect(sut.asFields().majors).toStrictEqual([])
        expect(sut.asFields().minors).toStrictEqual([])
    })

    test('with one major and one minor', () => {
        const sut = new Choice([sA], [sB])
        expect(sut.asFields().majors).toStrictEqual([fA])
        expect(sut.asFields().minors).toStrictEqual([fA])
    })

    test('with three majors and three minors', () => {
        const sut = new Choice([sA, sB, sC], [sD, sE, sF])
        expect(sut.asFields().majors).toStrictEqual([fA, fA, fB])
        expect(sut.asFields().minors).toStrictEqual([fA, fC, fB])
    })

})
