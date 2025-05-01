
interface Data {
    id: number,
    name: string
}


interface Props<T extends Data[]> {
    children: T,
    dispatch: (input: number) => void
}

const WithRadioButtons = <T extends Data>({children, dispatch}: Props<T[]>) => {

    return(
        <ul className='radio-buttons-list'>
            {children.map((radioButton: Data) => {

                if (!radioButton) return null

                return(
                    <li 
                        className='radio-button-list-element'
                        key={radioButton.id}
                    >
                        <label 
                            htmlFor={radioButton.name}
                            className='radio-button-label'
                        
                        >
                            <input 
                                type="radio"
                                className='radio-button-input'
                                name='radioButtonsGroup'
                                onChange={() => dispatch(radioButton.id)} 
                            
                            />
                            {radioButton.name}

                        </label>

                    </li>
                )

            })}

        </ul>
    )
}

export default WithRadioButtons

