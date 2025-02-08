
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


export interface CurrentUser {
    user: {
        id: number,
        password: string,
        last_login: Date,
        is_superuser: boolean,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        is_staff: boolean,
        is_acitve: boolean,
        date_joined: Date,
        groups: (number | string)[],
        user_permissions: (number | string)[],
    },
    token: string
}

export interface ActiveUser {
    id: number,
        password: string,
        last_login: Date,
        is_superuser: boolean,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        is_staff: boolean,
        is_acitve: boolean,
        date_joined: Date,
        groups: (number | string)[],
        user_permissions: (number | string)[],

}

export type Author = {
    name: string,
    author_id: string,
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

export const GET_ERRORS = 'GET_ERRORS'