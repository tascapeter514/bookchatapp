import './RadioButtonsMapper.css'
import { MapperData, MapperProps } from '../../types'


const RadioButtonsMapper = <T extends MapperData>({data, dispatch, action}: MapperProps<T>) => {

    console.log('radio buttons mapper data length:', data.length)

    if (!data.length) return null

    return(
        <ul className='radio-buttons-list'>
            {data.map((radioButton: MapperData) => {

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
                                onChange={() => dispatch(action(Number(radioButton.id)))} 
                            
                            />
                            

                        </label>

                    </li>
                )

            })}

        </ul>
    )
}

export default RadioButtonsMapper

