import { UnparsedProfile } from '../../lib/domain/unparsedTypes'

const profile: UnparsedProfile = {
    name: 'Tiny Profile',
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
                        }
                    ]
                }
            ]
        }
    ],
    combinations: [
        {
            id: 1,
            majors: ['field-1'],
            minors: [['field-1']]
        }
    ]
}

export default profile
