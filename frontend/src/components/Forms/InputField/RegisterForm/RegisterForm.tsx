import InputField from '../InputField'
import Header from '../../../common/Header/Header'
import SubHeader from '../../../common/SubHeader/SubHeader';
import Button from '../../../common/Buttons/Button/Button'
import ErrorMessage from '../../../Messages/ErrorMessage/ErrorMessage';
import { userContext } from '../../../common/Context/UserContext/UserContext';
import {useState, ChangeEvent } from 'react';
import './RegisterForm.css'


const RegisterForm = () => {

    
    const {handleRegister, setError, error, } = userContext()
    

    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        username: '',
        password: ''
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }


    // const handleRegister = async (formData: FormData) => await login(formData)

        
        
    


    return(

        <form action={handleRegister as any} className='register-form'>
            <Header>Register</Header>
            <SubHeader>Contact Info</SubHeader>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <InputField value={registerData.firstName} labelKey='firstName' handleChange={onChange}>First Name</InputField>
            <InputField value={registerData.lastName} labelKey='lastName' handleChange={onChange}>Last Name</InputField>
            <InputField value={registerData.emailAddress} labelKey='emailAddress' handleChange={onChange} type='email'>Email</InputField>
            <SubHeader>Username and Password</SubHeader>
            <InputField value={registerData.username} labelKey='username' handleChange={onChange}>Username</InputField>
            <InputField value={registerData.password} labelKey='password' handleChange={onChange} type='password'>Password</InputField>
            <Button type='submit'>Register</Button>

        </form>




    )
}

export default RegisterForm