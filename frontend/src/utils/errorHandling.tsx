export type LoginError = {
    status: number,
    data: {
        username?: String[],
        password?: String[]
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