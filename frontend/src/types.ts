
export interface formData {
    username: string,
    userPassword: string,
}

export type ISBN_Identifier = {
    type?: string;
    identifier?: string;
}

// export interface User {

// }

export interface Book {
    title_id: string,
    title: string,
    publisher: string,
    description: string,
    ISBN_Identifiers: ISBN_Identifier[],
    averageRating: number,
    ratingsCount: number,
    imageLinks: {smallThumbnail?: string, thumbnail?: string},
    pageCount: number,
    genres: number[]
}

export const GET_ERRORS = 'GET_ERRORS'