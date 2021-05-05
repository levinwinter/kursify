import Field from '../../../lib/domain/field'
import { isSubarray, isEqual } from '../../../lib/utils/array'

jest.mock('../../../lib/domain/field')

const FieldMock = Field as jest.Mock<Field>
const fA = new FieldMock()
const fB = new FieldMock()
const fC = new FieldMock()

describe('isSubarray', () => {

    test('empty subarray and empty superarray', () => {
        expect(isSubarray([], [])).toBeTruthy()
    })

    test('single element subarray and empty superarray', () => {
        expect(isSubarray([fA], [])).toBeFalsy()
    })

    test('empty subarray and three element superarray', () => {
        expect(isSubarray([], [fA, fB, fC])).toBeTruthy()
    })

    test('single element subarray and three element superarray', () => {
        expect(isSubarray([fA], [fA, fB, fC])).toBeTruthy()
    })

    test('three element subarray and three element superarray', () => {
        expect(isSubarray([fA, fB, fC], [fA, fB, fC])).toBeTruthy()
    })

    test('higher multiplicity in subarray', () => {
        expect(isSubarray([fA, fA, fB], [fA, fB, fC])).toBeFalsy()
    })

})

describe('isEqual', () => {

    test('a and b are equal', () => {
        expect(isEqual([fA, fB], [fB, fA])).toBeTruthy()
    })

    test('a not subarray of b and b subarray of a', () => {
        expect(isEqual([fA, fB, fC], [fA, fB])).toBeFalsy()
    })

    test('a subarray of b and b not subarray of a', () => {
        expect(isEqual([fA, fB], [fA, fB, fC])).toBeFalsy()
    })

    test('a not subarray of b and b not subarray of a', () => {
        expect(isEqual([fA, fB], [fA, fC])).toBeFalsy()
    })

})
