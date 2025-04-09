export type LoginError = {
    status: number,
    data: {
        username?: String[],
        password?: String[]
    }
}

export type RegisterError = {
    status: number,
    data: {
        username?: String[]
    }
}

export type BookshelfError = {
    status: number,
    data: {
        bookshelf?: string
        
    }
}

export type BookclubError = {
    status: number,
    data: {
        bookclub?: string
        
    }
}

export type BookError = {
    status: number,
    data: {
        book?: string
    }
}



export const handleLoginError = (err: LoginError ) => {
    console.log('login check')
    if ('data' in err) {
        console.log('data check')
        if (err.data.username) {

            return err.data.username.join(' ')

        } else if (err.data.password) {

            return err.data.password.join(' ')
        }
    }

    return 'Login failed. Please try again.'
    
}

export const handleRegisterError = (err: RegisterError) => {

    if ('data' in err) {

        return err.data.username ? err.data.username.join(' ') : 'Unknown error with data'
    }

    return 'Registration Failed. Please try again'
}

export const handleBookclubError = (err: BookclubError) => {
    
    if ('data' in err) {
        return err.data.bookclub ? err.data.bookclub : 'Unknown error with data'
    }

    return 'Your request to create a bookclub failed. Please try again.'
}

export const handleBookshelfError = (err: BookshelfError) => {
    
    if ('data' in err) {
        return err.data.bookshelf ? err.data.bookshelf : 'Unknown error with data'
    }

    return 'Your request to create a bookshelf failed. Please try again.'
}

export const handleBookError = (err: BookError) => {
    
    if ('data' in err) {
        return err.data.book ? err.data.book : 'Unknown error with data'
    }

    return 'Your request to add a book to this bookshelf failed. Please try again.'
}