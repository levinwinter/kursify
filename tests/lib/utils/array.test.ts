import { minus, isSubarray } from '../../../lib/utils/array'

test('the arguments are not changed by the method', () => {
    const minuend = ['A', 'B', 'C']
    const subtrahend = ['A', 'B']
    minus(minuend, subtrahend)
    expect(minuend).toStrictEqual(['A', 'B', 'C'])
    expect(subtrahend).toStrictEqual(['A', 'B'])
})

test('x - x = []', () => {
    expect(minus(['A', 'B', 'C'], ['A', 'B', 'C'])).toStrictEqual([])
})

test('duplicates get removed once', () => {
    expect(minus(['A', 'B', 'B', 'C'], ['A', 'B', 'C'])).toStrictEqual(['B'])
})

test('x - empty = x', () => {
    expect(minus(['A', 'B', 'C'], [])).toStrictEqual(['A', 'B', 'C'])
})

test('x - y where x and y disjoint = x', () => {
    expect(minus(['A', 'B', 'C'], ['D', 'E', 'F'])).toStrictEqual(['A', 'B', 'C'])
})

test('x in x = true', () => {
    expect(isSubarray(['A', 'B', 'C'], ['A', 'B', 'C'])).toBe(true)
})

test('empty in x = true', () => {
    expect(isSubarray([], ['A', 'B', 'C'])).toBe(true)
})

test('subarray in superarray = true', () => {
    expect(isSubarray(['A', 'C'], ['A', 'B', 'C'])).toBe(true)
})

test('accounts for multiplicity in subarray', () => {
    expect(isSubarray(['A', 'B', 'B', 'C'], ['A', 'B', 'C'])).toBe(false)
})

test('accounts for multiplicity in superarray', () => {
    expect(isSubarray(['A', 'B', 'C'], ['A', 'B', 'B', 'C'])).toBe(true)
})

test('accounts for multiplicity in both arrays', () => {
    expect(isSubarray(['A', 'B', 'B', 'C'], ['A', 'B', 'B', 'C'])).toBe(true)
})
