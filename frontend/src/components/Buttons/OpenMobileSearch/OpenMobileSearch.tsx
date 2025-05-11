import { Dispatch, SetStateAction } from 'react';
import './OpenMobileSearch.css'
import { SearchIcon } from '../../Icons';


interface Props {
    setOpenSearchbar: Dispatch<SetStateAction<boolean>>

}

const OpenMobileSearch = ({setOpenSearchbar}: Props) => {


    return(
        <>
            <button 
                className='open-search-toggle'
                onClick={() => setOpenSearchbar((prev: boolean) => !prev)}
            >
                <SearchIcon />
            </button>  
        </>
    )

}

export default OpenMobileSearch