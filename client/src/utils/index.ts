import { Card } from "../types"

export const parseCards = (lump:{file:string}): Card[] => {
    
    let arrToReturn: Card[] = []
    let count: number = 0
    for (const [key, val] of Object.entries(JSON.parse(lump.file)) as any) {
        arrToReturn.push({
            id: count,
            title: key.trim(),
            context: val['0'].trim(),
            tags: val['1'].trim().split(' '),
            opened: false,
            hover: val['2'],
            clicked: val['3'],
            priority: val['4'],
        })
        count++
    }
    
    return arrToReturn
}