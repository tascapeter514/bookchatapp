import './DropdownMapper.css'
import { DropdownData, DropdownProps } from '../../../types'



type Props<T extends DropdownData> = DropdownProps<T>

const DropdownMapper = <T extends DropdownData>({dropdownData, dispatch, dataType}: Props<T> ) => {

    return(
        <>
            <label htmlFor='dropdown-mapper' className='dropdown-mapper-label'>
                Select one of your {dataType} 

                <select 
                    id='dropdown-mapper' 
                    className='dropdown-mapper'
                    onChange={(e) => {
                        e.target.value === '' ? dispatch(NaN) : dispatch(Number(e.target.value))
                    }}
                    >
                    <option>Please select your {dataType.slice(0, dataType.length - 1)}</option>
                    {dropdownData.map((option: DropdownData) => {
                        return(
                            <option
                                key={option.id} 
                                value={option.id}
                                data-name={option.name}
                                className='dropdown-mapper-option'
                                
                            >
                                {option.name}
                            </option>
                        )
                    })}
                </select>
            </label>
        </>

    )

}

export default DropdownMapper