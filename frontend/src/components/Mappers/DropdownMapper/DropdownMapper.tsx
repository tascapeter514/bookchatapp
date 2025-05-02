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

                <select name="" id='dropdown-mapper' className='dropdown-mapper' onChange={() => dispatch}>
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