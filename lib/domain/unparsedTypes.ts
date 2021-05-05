export type UnparsedProfile = {
    name: string,
    categories: UnparsedCategory[],
    combinations: UnparsedCombination[]
}

export type UnparsedCategory = {
    fields: UnparsedField[]
}

export type UnparsedField = {
    abbreviation: string,
    subjects: UnparsedSubject[]
}

export type UnparsedSubject = {
    abbreviation: string,
    asMajor: boolean,
    asMinor: boolean
}

export type UnparsedCombination = {
    id: number,
    majors: string[],
    minors: string[][]
}
