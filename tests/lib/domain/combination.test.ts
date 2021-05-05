import Choice from '../../../lib/domain/choice'
import Combination from '../../../lib/domain/combination'
import Field from '../../../lib/domain/field'
import Subject from '../../../lib/domain/subject'

jest.mock('../../../lib/domain/subject', () => {
    return function(field: Field) {
        return {
            field: field
        }
    }
})

jest.mock('../../../lib/domain/field', () => {
    return function(abbreviation: string) {
        return {
            abbreviation: abbreviation
        }
    }
})

const FieldMock = Field as jest.Mock<Field>
const SubjectMock = Subject as jest.Mock<Subject>
const fA = new FieldMock('A')
const s1A = new SubjectMock(fA)
const s2A = new SubjectMock(fA)
const fB = new FieldMock('B')
const s1B = new SubjectMock(fB)
const s2B = new SubjectMock(fB)
const fC = new FieldMock('C')
const s1C = new SubjectMock(fC)
const s2C = new SubjectMock(fC)
const fD = new FieldMock('D')
const s1D = new SubjectMock(fD)
const fE = new FieldMock('E')
const fF = new FieldMock('F')
const fG = new FieldMock('G')
const fields: Field[] = [fA, fB, fC, fD, fE, fF, fG]

describe('combination is parsed correctly', () => {

    test('with no majors and minors', () => {
        const sut = new Combination({
            id: 1,
            majors: [],
            minors: []
        }, fields)
        expect(sut.id).toBe(1)
        expect(sut.majors).toStrictEqual([])
        expect(sut.minors).toStrictEqual([])
    })

    test('with one major and one simple minor', () => {
        const sut = new Combination({
            id: 2,
            majors: ['A'],
            minors: [['B']]
        }, fields)
        expect(sut.id).toBe(2)
        expect(sut.majors).toStrictEqual([fA])
        expect(sut.minors).toStrictEqual([[fB]])
    })

    test('with three majors and three simple minors', () => {
        const sut = new Combination({
            id: 3,
            majors: ['A', 'B', 'C'],
            minors: [['D'], ['E'], ['F']]
        }, fields)
        expect(sut.id).toBe(3)
        expect(sut.majors).toStrictEqual([fA, fB, fC])
        expect(sut.minors).toStrictEqual([[fD, fE, fF]])
    })

    test('with three majors and one simple and two complex minors', () => {
        const sut = new Combination({
            id: 4,
            majors: ['A', 'B', 'C'],
            minors: [['D', 'E', 'G'], ['B'], ['A', 'C']]
        }, fields)
        expect(sut.id).toBe(4)
        expect(sut.majors).toStrictEqual([fA, fB, fC])
        expect(sut.minors).toStrictEqual([
            [fD, fB, fA], [fD, fB, fC],
            [fE, fB, fA], [fE, fB, fC],
            [fG, fB, fA], [fG, fB, fC]
        ])
    })

    test('with unknown field throws error', () => {
        expect(() => new Combination({
            id: -1,
            majors: ['A'],
            minors: [['A']]
        }, [])).toThrowError('The field \'A\' could not be found')
    })

})

describe('combination matches', () => {

    const combination = new Combination({
        id: 4,
        majors: ['A', 'B', 'C'],
        minors: [['D', 'E', 'G'], ['B'], ['A', 'C']]
    }, fields)

    test('not with wrong majors and minors', () => {
        const choice = new Choice([s1A, s2A, s1C], [s1B, s2C, s2B])
        expect(combination.matches(choice)).toBeFalsy()
    })

    test('not with wrong majors and correct minors', () => {
        const choice = new Choice([s1A, s2A, s1C], [s1D, s1B, s2C])
        expect(combination.matches(choice)).toBeFalsy()
    })

    test('not with correct majors and wrong minors', () => {
        const choice = new Choice([s1A, s1B, s1C], [s1B, s2C, s2A])
        expect(combination.matches(choice)).toBeFalsy()
    })

    test('with correct majors and minors', () => {
        const choice = new Choice([s1A, s1B, s1C], [s1D, s2B, s2A])
        expect(combination.matches(choice)).toBeTruthy()
    })

    test('not with correct majors and empty minors in combination', () => {
        const emptyCombination = new Combination({
            id: 4,
            majors: ['A', 'B', 'C'],
            minors: []
        }, fields)
        const choice = new Choice([s1A, s1B, s1C], [s1D, s2B, s2A])
        expect(emptyCombination.matches(choice)).toBeFalsy()
    })

})

describe('combination matches partially', () => {

    const combination = new Combination({
        id: 4,
        majors: ['A', 'B', 'C'],
        minors: [['D', 'E', 'G'], ['B'], ['A', 'C']]
    }, fields)

    test('not with wrong majors and minors', () => {
        const choice = new Choice([s1D, s1A, s1B], [s2A, s2B, s2C])
        expect(combination.matchesPartially(choice)).toBeFalsy()
    })

    test('not with too many majors and a subset of minors', () => {
        const choice = new Choice([s1D, s1A, s1B, s1C], [s2A, s2B])
        expect(combination.matchesPartially(choice)).toBeFalsy()
    })

    test('not with a subset of majors and too many minors', () => {
        const choice = new Choice([s1A, s1B], [s2A, s2B, s2C, s1D])
        expect(combination.matchesPartially(choice)).toBeFalsy()
    })

    test('with a subset of majors and minors', () => {
        const choice = new Choice([s1A, s1B], [s2B, s2C])
        expect(combination.matchesPartially(choice)).toBeTruthy()
    })

    test('with exactly the majors and minors', () => {
        const choice = new Choice([s1A, s1B, s1C], [s1D, s2B, s2C])
        expect(combination.matchesPartially(choice)).toBeTruthy()
    })

    test('not with a subset of majors and empty minors in combination', () => {
        const emptyCombination = new Combination({
            id: 4,
            majors: ['A', 'B', 'C'],
            minors: []
        }, fields)
        const choice = new Choice([s1A, s1B], [s1D, s2B, s2A])
        expect(emptyCombination.matchesPartially(choice)).toBeFalsy()
    })

})
