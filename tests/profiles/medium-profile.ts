import { UnparsedProfile } from '../../lib/domain/unparsedTypes'

const profile: UnparsedProfile = {
    name: 'Medium Profile',
    categories: [
        {
            fields: [
                {
                    abbreviation: 'field-1',
                    subjects: [
                        {
                            abbreviation: 'subject-1',
                            asMajor: true,
                            asMinor: true
                        },
                        {
                            abbreviation: 'subject-2',
                            asMajor: true,
                            asMinor: true
                        }
                    ]
                },
                {
                    abbreviation: 'field-2',
                    subjects: [
                        {
                            abbreviation: 'subject-3',
                            asMajor: true,
                            asMinor: false
                        },
                        {
                            abbreviation: 'subject-4',
                            asMajor: false,
                            asMinor: true
                        }
                    ]
                }
            ]
        },
        {
            fields: [
                {
                    abbreviation: 'field-3',
                    subjects: [
                        {
                            abbreviation: 'subject-5',
                            asMajor: true,
                            asMinor: true
                        },
                        {
                            abbreviation: 'subject-6',
                            asMajor: true,
                            asMinor: true
                        }
                    ]
                },
                {
                    abbreviation: 'field-4',
                    subjects: [
                        {
                            abbreviation: 'subject-7',
                            asMajor: true,
                            asMinor: false
                        },
                        {
                            abbreviation: 'subject-8',
                            asMajor: false,
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
            majors: ['field-1', 'field-2'],
            minors: [['field-1'], ['field-2', 'field-3'], ['field-3', 'field-4']]
        },
        {
            id: 2,
            majors: ['field-3', 'field-4'],
            minors: [['field-4'], ['field-1', 'field-3'], ['field-3', 'field-4']]
        }
    ]
}

export default profile
