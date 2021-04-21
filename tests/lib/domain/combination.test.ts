import Combination from "../../../lib/domain/combination"
import Field from "../../../lib/domain/field"
import { UnparsedCombination } from "../../../lib/types"

jest.mock('../../../lib/domain/field', () => {
    return function(abbreviation: string) {
        return {
            abbreviation: abbreviation
        }
    }
})

const fieldMock = Field as jest.Mock<Field>
const fA = new fieldMock('A')
const fB = new fieldMock('B')
const fV = new fieldMock('V')
const fW = new fieldMock('W')
const fX = new fieldMock('X')
const fY = new fieldMock('Y')
const fZ = new fieldMock('Z')
const fields: Field[] = [fA, fB, fV, fW, fX, fY, fZ]

test('combination is parsed correctly', () => {
    const unparsedCombination: UnparsedCombination = {
        id: 0,
        majors: ['A', 'B'],
        minors: [['V'], ['W', 'X'], ['Y', 'Z']]
    }
    const sut: Combination = new Combination(unparsedCombination, fields)
    expect(sut.id).toBe(0)
    expect(sut.majors).toStrictEqual([fA, fB])
    expect(sut.minors).toStrictEqual([
        [fV, fW, fY],
        [fV, fW, fZ],
        [fV, fX, fY],
        [fV, fX, fZ]
    ])
})

test('combination with no majors and minors', () => {
    const unparsedCombination: UnparsedCombination = {
        id: 0,
        majors: [],
        minors: []
    }
    const sut: Combination = new Combination(unparsedCombination, fields)
    expect(sut.id).toBe(0)
    expect(sut.majors).toStrictEqual([])
    expect(sut.minors).toStrictEqual([])
})

test('combination with no majors and an empty array as minors', () => {
    const unparsedCombination: UnparsedCombination = {
        id: 0,
        majors: [],
        minors: [[]]
    }
    const sut: Combination = new Combination(unparsedCombination, fields)
    expect(sut.id).toBe(0)
    expect(sut.majors).toStrictEqual([])
    expect(sut.minors).toStrictEqual([])
})

test('unknown field throws', () => {
    const unparsedCombination: UnparsedCombination = {
        id: 0,
        majors: ['UNKNOWN'],
        minors: []
    }
    expect(() => new Combination(unparsedCombination, []))
        .toThrowError(`The field 'UNKNOWN' could not be found`)
})
