export function* thinkOfIndex(num: number) {
    while (true) {
        if (num > titleArr.length - 1) yield num % titleArr.length;
        yield num;
    }
}

export const titleArr: string[] = ['Office worker', 'Computer programmer', 'Veterinarian', 'Street vendor', 'Factory worker', 'Miner', 'Teacher', 'Real estate agent', 'Bellboy', 'Gas station attendant', 'Speaker', 'Delivery man', 'Butcher', 'Pharmacist', 'Receptionist', 'Politician', 'Tour guide', 'Entrepreneur', 'Ballet dancer', 'Astronaut', 'Judge', 'Customs officer', 'Lawyer', 'Cashier', 'Taxi driver', 'Plumber', 'Musician', 'Chef', 'Baker', 'Artist', 'Actor', 'Bartender', 'Hairdresser', 'Optician', 'Florist', 'Tailor' , 'Writer' , 'Caretaker', 'Bus driver', 'Accountant']

export const tagsArr: string[] = ['#tech', '#eco', '#math', '#bio', '#life', '#new', '#car', '#sun', '#soon', '#past', '#win', '#give', '#get'] 
export const contextArr: string[] = ['electronics', 'energetics', 'materials', 'medics']

export const colors = {
    lightMain:'#fff9ee',
    darkMain:'#333',
    darkHard:'#2c2c2c',

    orangeMain:'#ff9011'
}
export const logicCriterion = {
    hoverShadowSeconds: 2 //* 3 seconds because it is zero based
}
