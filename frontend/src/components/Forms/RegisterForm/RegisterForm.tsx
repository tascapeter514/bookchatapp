import InputField from '../InputField/InputField'
import Header from '../../Header/Header'
import SubHeader from '../../SubHeader/SubHeader';
import Button from '../../Buttons/Button/Button'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage';
import { userContext } from '../../../context/UserContext/UserContext';
import useLogger from '../../../hooks/useLogger';
import {useState, ChangeEvent } from 'react';
import './RegisterForm.css'


const RegisterForm = () => {

    


    // const handleRegister = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/register', formData)
    const handleRegister = async (formData: FormData) => console.log(formData)

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
    
    }

        
    // ADD CONDITIONAL CHECK FOR WHEN USER IS LOGGED IN
    // SHOULDN'T BE ABLE TO REGISTER IF USER IS ACTIVE
    return(

        <form action={handleRegister as any} className='register-form'>
            <Header>Register</Header>
            <SubHeader>Contact Info</SubHeader>
            {/* {userState.isError && <ErrorMessage>{userState.error}</ErrorMessage>} */}
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