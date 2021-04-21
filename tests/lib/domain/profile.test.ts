import Profile from '../../../lib/domain/profile';
import { UnparsedProfile } from '../../../lib/types';

test('profile structure correctly parsed', () => {
    const sut = new Profile(profile)
    expect(sut.name).toBe('Test Profile')
    expect(sut.categories.length).toBe(3)
    expect(sut.categories[0].fields.length).toBe(2)
    expect(sut.categories[1].fields.length).toBe(1)
    expect(sut.categories[2].fields.length).toBe(2)
    expect(sut.categories[0].fields[0].subjects.length).toBe(2)
    expect(sut.categories[0].fields[1].subjects.length).toBe(1)
    expect(sut.categories[1].fields[0].subjects.length).toBe(2)
    expect(sut.categories[2].fields[0].subjects.length).toBe(3)
    expect(sut.categories[2].fields[1].subjects.length).toBe(2)
    expect(sut.combinations.length).toBe(2)
    expect(sut.fields.length).toBe(5)
    expect(sut.subjects.length).toBe(10)
})

const profile: UnparsedProfile = {
    name: 'Test Profile',
    categories: [
        {
            fields: [
                {
                    abbreviation: 'F1',
                    subjects: [
                        {
                            abbreviation: 'S1',
                            asMajor: true,
                            asMinor: true
                        },
                        {
                            abbreviation: 'S2',
                            asMajor: false,
                            asMinor: true
                        }
                    ]
                },
                {
                    abbreviation: 'F2',
                    subjects: [
                        {
                            abbreviation: 'S3',
                            asMajor: true,
                            asMinor: true
                        }
                    ]
                }
            ]
        },
        {
            fields: [
                {
                    abbreviation: 'F3',
                    subjects: [
                        {
                            abbreviation: 'S4',
                            asMajor: true,
                            asMinor: false
                        },
                        {
                            abbreviation: 'S5',
                            asMajor: true,
                            asMinor: true
                        }
                    ]
                }
            ]
        },
        {
            fields: [
                {
                    abbreviation: 'F4',
                    subjects: [
                        {
                            abbreviation: 'S6',
                            asMajor: true,
                            asMinor: false
                        },
                        {
                            abbreviation: 'S7',
                            asMajor: true,
                            asMinor: true
                        },
                        {
                            abbreviation: 'S8',
                            asMajor: false,
                            asMinor: true
                        }
                    ]
                },
                {
                    abbreviation: 'F5',
                    subjects: [
                        {
                            abbreviation: 'S9',
                            asMajor: true,
                            asMinor: true
                        },
                        {
                            abbreviation: 'S10',
                            asMajor: true,
                            asMinor: true
                        }
                    ]
                }
            ]
        }
    ],
    combinations: [
        {
            id: 1,
            majors: ['F1', 'F2'],
            minors: [['F3'], ['F3', 'F4'], ['F1', 'F2', 'F5']]
        },
        {
            id: 2,
            majors: ['F4', 'F5'],
            minors: [['F1'], ['F2']]
        }
    ]
}
