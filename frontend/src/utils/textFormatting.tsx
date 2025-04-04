import { Author } from "../types";


export const authorText = ((authors: Author[]) => {
        
    switch (authors.length) {
        case 0:
            return 'Unknown Author';
        case 1:
            return authors.map((author: Author) => author.name)
        case 2:
            return authors.map((author: Author) => author.name).join(' and ')
        default:
            return authors.map((author: Author) => author.name).map((name: string, index: number, array: String[]) => 
                index === array.length - 1 && array.length > 2 ? `and ${name}` : name
            ).join(', ')
      
    }
})