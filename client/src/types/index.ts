export type vetoAny = any
export interface Card {
    id: number
    title: string
    context: string
    tags: string[]
    opened: boolean
    hover: number
    clicked: number
    priority: number
}