
export interface formData {
    username: string,
    userPassword: string,
}

export type ISBN_Identifier = {
    type?: string;
    identifier?: string;
}

export type HandleLogin = (formData: FormData) => Promise<void>
export type HandleLogout = () => Promise<void>


export type AuthToken = string

// export interface CurrentUser {
//     user: {
//         id: number,
//         password: string,
//         last_login: Date,
//         is_superuser: boolean,
//         username: string,
//         first_name: string,
//         last_name: string,
//         email: string,
//         is_staff: boolean,
//         is_acitve: boolean,
//         date_joined: Date,
//         groups: (number | string)[],
//         user_permissions: (number | string)[],
//     },
//     token: string
// }

export interface ActiveUser {
        id: number,
        password: string,
        // last_login: Date,
        // is_superuser: boolean,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        // is_staff: boolean,
        // is_active: boolean,
        // date_joined: Date,
        // groups: (number | string)[],
        // user_permissions: (number | string)[],

}

export type Author = {
    name: string,
    author_id: string,
}

export interface Bookshelf {
    bookshelf_id: string,
    name: string,
    user: number,
    titles: Book[]

}

export interface Invitation {
    invitation_id: string,
    accepted: boolean,
    created_at: Date,
    invited_user: number,
    bookclub: {id: string, name: string}
    invited_by: string,


}

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
    genres: number[],
    authors: Author[]
}

export interface Bookclub {
    bookclub_id: string,
    name: string,
    members: ActiveUser[],
    administrator: ActiveUser,
    bookshelves: Bookshelf[],
    currentRead: Book

}

export interface UserData {
    user_bookclubs: Bookclub[],
    user_bookshelves: Bookshelf[],
    user_invites: Invitation[]
}

export const GET_ERRORS = 'GET_ERRORS'