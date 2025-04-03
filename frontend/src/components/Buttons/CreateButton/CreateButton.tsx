import './CreateButton.css'

interface CreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string
}


const CreateButton = ({children, ...props}: CreateButtonProps) => {
    return (

        <button className='create-button' {...props}>CREATE {children.toUpperCase()}</button>

    )
}

export default CreateButton