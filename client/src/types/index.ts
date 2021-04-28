export type vetoAny = any
// export type cardContext = 'electronics' | 'energetics' | 'materials' | 'medics'
export interface Card {
    id: number
    title: string
    context: string
    tags: string[]
    opened: boolean
}