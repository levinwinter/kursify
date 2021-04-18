export type Combination = {
    id: number,
    majors: string[],
    minors: (string | string[])[]
}

export type UnfoldedCombination = {
    id: number,
    majors: string[],
    minors: string[]
}
