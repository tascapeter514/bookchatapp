import './DropDownMapper.css'
import { MapperData, MapperProps } from '../../../types'


interface DropdownProps {
    dataType: string
}

type Props<T extends MapperData> = MapperProps<T> & DropdownProps

const DropdownMapper = <T extends MapperData>({data, dispatch, dataType}: Props<T> ) => {

    return(
        <>
            <label htmlFor='dropdown'>
                Select your ${dataType}

                <select name="" id='dropdown' onChange={() => dispatch}>
                    {data.map((option: MapperData) => {
                        return(
                            <option
                                key={option.id} 
                                value={option.id}
                                data-name={option.name}
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