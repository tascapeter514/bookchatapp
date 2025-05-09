import './RadioButtons.css'
import { SearchResultData, SearchProps } from '../../../types'


const RadioButtons = <T extends SearchResultData>({data, dispatch, action}: SearchProps<T>) => {

    console.log('radio buttons mapper data length:', data.length)

    if (!data.length) return null

    return(
        <ul className='radio-buttons-list'>
            {data.map((radioButton: SearchResultData) => {

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
                                onChange={() => {dispatch(action ? action(radioButton.id) : radioButton.id)}} 
                            
                            />
                            

                        </label>

                    </li>
                )

            })}

        </ul>
    )
}

export default RadioButtons

