import './DropdownMapper.css'
import { MapperData, MapperProps } from '../../../types'



type Props<T extends MapperData> = MapperProps<T>

const DropdownMapper = <T extends MapperData>({
    data, 
    dispatch, 
    dataType, 
    action}: Props<T> ) => {

    return(
        <>
            <label htmlFor='dropdown-mapper' className='dropdown-mapper-label'>
                Select one of your {dataType} 

                <select 
                    id='dropdown-mapper' 
                    className='dropdown-mapper'
                    onChange={(e) => {
                        e.target.value === '' 
                        ? dispatch(action ? action(NaN) : NaN) 
                        : dispatch(action ? action(Number(e.target.value)) : Number(e.target.value))
                    }}
                    >
                    <option>Please select your {dataType?.slice(0, dataType.length - 1)}</option>
                    {data.map((option: MapperData) => {
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