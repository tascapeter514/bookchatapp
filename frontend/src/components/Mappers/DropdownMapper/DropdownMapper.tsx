import './DropdownMapper.css'
import { MapperData, MapperProps } from '../../../types'


interface DropdownProps {
    dataType: string
}

type Props<T extends MapperData> = MapperProps<T> & DropdownProps

const DropdownMapper = <T extends MapperData>({data, dispatch, dataType}: Props<T> ) => {

    return(
        <>
            <label htmlFor='dropdown-mapper' className='dropdown-mapper-label'>
                Select one of your {dataType} 

                <select 
                    id='dropdown-mapper' 
                    className='dropdown-mapper'
                    onChange={(e) => {
                        // const value = Number(e.target.value);
                        // if (!isNaN(value)) dispatch(value);
                        e.target.value === '' ? dispatch(NaN) : dispatch(Number(e.target.value))
                    }}
                    >
                    <option>Please select your {dataType.slice(0, dataType.length - 1)}</option>
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