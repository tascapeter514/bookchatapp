import './Button.css'
import { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | string
}

const Button = ({children, ...props}: ButtonProps) => {
    return(
        <button className='bookchat-button' {...props}>
            {children}

        </button>
    )
}

export default Button