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

        expect(sut).toEqual({
            majors: [],
            minors: []
        })
    })

    test('with three majors and three minors', () => {
        const sut = new Choice([sA, sB, sC], [sD, sE, sF])

        expect(sut).toEqual({
            majors: [sA, sB, sC],
            minors: [sD, sE, sF]
        })
    })

})

describe('choice is mapped to fields correctly', () => {

    test('with no majors and minors', () => {
        const sut = new Choice([], [])

        expect(sut.asFields()).toEqual({
            majors: [],
            minors: []
        })
    })

    test('with one major and one minor', () => {
        const sut = new Choice([sA], [sB])

        expect(sut.asFields()).toEqual({
            majors: [fA],
            minors: [fA]
        })
    })

    test('with three majors and three minors', () => {
        const sut = new Choice([sA, sB, sC], [sD, sE, sF])

        expect(sut.asFields()).toEqual({
            majors: [fA, fA, fB],
            minors: [fA, fC, fB]
        })
    })

})
