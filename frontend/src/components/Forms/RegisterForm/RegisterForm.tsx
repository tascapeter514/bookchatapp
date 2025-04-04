import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage';
import InputField from '../InputField/InputField'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../slices/authApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import SubHeader from '../../SubHeader/SubHeader';
import Button from '../../Buttons/Button/Button'
import {useState, ChangeEvent } from 'react';
import Header from '../../Header/Header'
import './RegisterForm.css'


const RegisterForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [register, {isLoading, isError, error}] = useRegisterMutation()

    const handleRegister = async (formData: FormData) => {
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const username = formData.get('username')
        const emailAddress = formData.get('emailAddress')
        const password = formData.get('password')

        try {
            const response = await register({
                firstName, lastName, username, emailAddress, password
            }).unwrap()

            dispatch(setCredentials({...response}))
            navigate('/userDashboard')
        } catch (err: any) {
            console.log(err?.data?.message || err?.error)

        }

    }


   
   
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
            {isError && <ErrorMessage>{'Registration failed. Please try again'}</ErrorMessage>}
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