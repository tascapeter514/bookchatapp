import './CreateButton.css'

type CreateButtonProps = {children: string}


const CreateButton = ({children}: CreateButtonProps) => {
    return (

        <button className='create-button'>CREATE {children.toUpperCase()}</button>

    )
}

export default CreateButton