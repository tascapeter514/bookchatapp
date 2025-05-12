
import './OpenSearchbar.css'
import { SearchIcon } from '../../Icons';
import { Link } from 'react-router-dom';



const OpenSearchbar = () => {


    return(

        <button 
            className='open-search-toggle'
                
        >
            <Link to='/search'>
                <SearchIcon />
            </Link>
        </button>  

    )

}

export default OpenSearchbar