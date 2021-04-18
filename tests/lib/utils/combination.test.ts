import { unfold } from "../../../lib/utils/combination"

test('empty input', () => {
    expect(unfold({
        id: 1,
        majors: [],
        minors: []
    })).toStrictEqual([
        {
            id: 1,
            majors: [],
            minors: []
        }
    ])
})

test('nothing to unfold', () => {
    expect(unfold({
        id: 1,
        majors: ['A', 'B'],
        minors: ['X', 'Y']
    })).toStrictEqual([
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y']
        }
    ])
})

test('single array to unfold', () => {
    expect(unfold({
        id: 1,
        majors: ['A', 'B'],
        minors: ['X', ['Y', 'Z']]
    })).toStrictEqual([
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z']
        }
    ])
})

test('two arrays to unfold', () => {
    expect(unfold({
        id: 1,
        majors: ['A', 'B'],
        minors: ['X', ['Y', 'Z'], ['G', 'H']]
    })).toStrictEqual([
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y', 'G']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y', 'H']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z', 'G']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z', 'H']
        }
    ])
})

test('unfold big array', () => {
    expect(unfold({
        id: 1,
        majors: ['A', 'B'],
        minors: ['X', ['Y', 'Z'], ['G', 'H', 'I']]
    })).toStrictEqual([
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y', 'G']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y', 'H']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Y', 'I']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z', 'G']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z', 'H']
        },
        {
            id: 1,
            majors: ['A', 'B'],
            minors: ['X', 'Z', 'I']
        }
    ])
})
