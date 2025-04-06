
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
export type Profile = {bio: string, profilePic?: File}

export interface ActiveUser {
        id: number,
        password: string,
        username: string,
        firstName: string,
        lastName: string,
        emailAddress: string,
        profile: Profile ,
        dateJoined: string
}

export interface AuthState {
    user: ActiveUser | null,
    authToken: string | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    isError: boolean,
    error: string
}

export type Author = {
    id: number,
    name: string,
    bio: string,
    books: Book[],
    authorPhoto: string,
    birthDate: string,
    deathDate: string

}



export interface Bookshelf {
    id: number,
    name: string,
    user?: number,
    books: Book[] | [],
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

export type SearchResult = {
    type: string,
    items: Book[] | Author[] | Bookclub[];
}


export type SearchData = {
    type: string,
    items: Book[] | Author[] | Bookclub[];
}[]

export type BookclubData = {type: string, items: Bookclub[]}
export type BookshelfData = {type: string, items: Bookshelf[]}
export type InviteData = {type: string, items: Invitation[]}

export type UserData = (BookclubData | BookshelfData | InviteData)[]

export type BookData = {type: string, items: Book[]}


    


export type Variant = 'bookclub' | 'bookshelf' | 'user'

export type DynamicName<T, V extends Variant> =
   V extends 'user' ? Extract<keyof T, 'username'> :
   Extract<keyof T, 'name'>

export const GET_ERRORS = 'GET_ERRORS'

