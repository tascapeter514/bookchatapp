import './RadioButtonsMapper.css'


interface Data {
    id: number,
    name: string
}


interface Props {
    data: Data[],
    dispatch: (input: number) => void
}

const RadioButtonsMapper = ({data, dispatch}: Props) => {

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

