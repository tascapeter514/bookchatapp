import { ChangeEventHandler } from 'react'

import './InputField.css'


interface Props {
    children: string,
    labelKey: string,
    value: string,
    handleChange: ChangeEventHandler,
    type?: string

}


const InputField = ({children, labelKey, value, handleChange, type='text'}: Props) => {


    return (
        <div className="form-field">
            <label htmlFor={labelKey}>{children}</label>
            <input 
                id={labelKey} 
                name={labelKey} 
                value={value} 
                onChange={handleChange}
                type={type}
                required
                
                />
        </div>
    )
}

export default InputField