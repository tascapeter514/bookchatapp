
export interface formData {
    username: string,
    userPassword: string,
}


export type ISBN_Identifier = {
    type?: string;
    identifier?: string;
}

export type Genre = {
    id: number,
    name: string
}


export type HandleLogin = (formData: FormData) => Promise<void>
export type HandleLogout = () => Promise<void>


export type AuthToken = string
export type Profile = {bio: string, profile_pic?: File}
export interface ActiveUser {
        id: number,
        password: string,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        profile: Profile ,
        date_joined: string


}

export type Author = {
    id: number,
    name: string,
    bio: string,
    titles: Book[],
    author_photo: string,
    birth_date: string,
    death_date: string

}



export interface Bookshelf {
    id: number,
    name: string,
    user?: number,
    titles?: Book[],
    bookclub_id?: string

}

export interface Invitation {
    id: number,
    accepted: boolean,
    created_at: string,
    invited_user: number,
    bookclub: {id: string, name: string}
    invited_by: string,


}

export interface Book {
    id: number,
    name: string,
    publisher: string,
    description: string,
    ISBN_Identifiers: ISBN_Identifier[],
    averageRating: number,
    ratingsCount: number,
    imageLinks: {smallThumbnail?: string, thumbnail?: string},
    pageCount: number,
    genres: {id: number, name: string},
    authors: Author[]
}

export interface Bookclub {
    id: number,
    name: string,
    members: ActiveUser[],
    administrator: number,
    bookshelves?: Bookshelf[],
    currentRead: Book,
    cover_image: string

}


export type SearchResultsArray = {
    type: string,
    items?: Book[] | Author[] | Bookclub[];
}[]

    
export interface UserData {
    user_bookclubs: Bookclub[],
    user_bookshelves: Bookshelf[],
    user_invites: Invitation[]
}

export type Variant = 'bookclub' | 'bookshelf' | 'user'

export type DynamicName<T, V extends Variant> =
   V extends 'user' ? Extract<keyof T, 'username'> :
   Extract<keyof T, 'name'>

export const GET_ERRORS = 'GET_ERRORS'
