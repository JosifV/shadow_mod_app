import { Card } from "../types"

export const parseCards = (lump:{file:string}): Card[] => {
    let arrToReturn: Card[] = []
    for (const [key, val] of Object.entries(JSON.parse(lump.file)) as any) {
        arrToReturn.push({
            id: +key,
            title: val['0'].trim(),
            context: val['1'].trim(),
            tags: val['2'].trim().split(' '),
            opened: false,
            hover: val['3'],
            clicked: val['4'],
            priority: val['5'],
        })
    }
    
    return arrToReturn
}