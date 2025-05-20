import './Dropdown.css'
import { MapperData, MapperProps } from '../../../types'



type Props<T extends MapperData> = MapperProps<T>

const Dropdown = <T extends MapperData>({
    data, 
    dispatch, 
    dataType, 
    
}: Props<T> ) => {

        console.log('dropdown dispatch:', dispatch)
    return(
        <>
            <label htmlFor='dropdown-mapper' className='dropdown-mapper-label'>
                Select one of your {dataType} 

                <select 
                    id='dropdown-mapper' 
                    className='dropdown-mapper'
                    
                    onChange={(e) => {
                        const selectedId = e.target.value === '' ? NaN : Number(e.target.value);
                        dispatch(selectedId)
                        
                    }}
                    >
                    <option>Please select</option>
                    {data?.map((option: MapperData) => {
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

export default Dropdown