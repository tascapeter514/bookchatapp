import './RadioButtonsMapper.css'


interface Data {
    id: number,
    name: string
}


interface Props<T extends Data> {
    data: T[],
    dispatch: (input: number) => void
}

const RadioButtonsMapper = <T extends Data>({data, dispatch}: Props<T>) => {

    return(
        <ul className='radio-buttons-list'>
            {data.map((radioButton: Data) => {

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
                            {radioButton.name}
                            <input
                                id={radioButton.name} 
                                type="radio"
                                className='radio-button-input'
                                name='radioButtonsGroup'
                                onChange={() => dispatch(Number(radioButton.id))} 
                            
                            />
                            

                        </label>

                    </li>
                )

            })}

        </ul>
    )
}

export default RadioButtonsMapper

