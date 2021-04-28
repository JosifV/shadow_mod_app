import { contextArr, titleArr, tagsArr, thinkOfIndex } from "../const"
import { Card } from "../types"

export const makingCards = (x: number): Card[] => {
    let arrToReturn: Card[] = []

    for (let num = 0; num < x; num++) {
        const titleIndex = thinkOfIndex(num);
        let determineTitle = (): string => {
            return titleArr[titleIndex.next().value as number]
        }
        let determineContext = (): string => {
            let rand: number = Math.floor(Math.random() * contextArr.length)

            return contextArr[rand]
        }
        let determineTags = (): string[] => {
            let tags: string[] = []
            let rand1: number = Math.floor(Math.random() * 5)

            for (let x = 0; x <= rand1; x++) tags.push(tagsArr[Math.floor(Math.random() * tagsArr.length)])
            
            tags = Array.from(new Set(tags))
            return tags
        }
        let objToPush: Card = {
            id: num,
            title: determineTitle(),
            context: determineContext(),
            tags: determineTags(),
            opened: false
        }
        arrToReturn.push(objToPush)
    }
    return arrToReturn
}
