import './UserDashboard.css';
import { ReactNode, useReducer } from 'react';
import DashboardMain from '../DashboardMain/DashboardMain';
import DashboardNav from '../DashboardNav/DashboardNav';
import mobileNavReducer from '../../reducers/mobileNavReducer';




const UserDashboard = () => {


    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})


    return(
        <div className='dashboard-container'>

            <DashboardMain mobileNav={mobileNav} navDispatch= {navDispatch}/>
            <DashboardNav mobileNav={mobileNav} navDispatch= {navDispatch}/>


            
          
        </div>
    )
}

export default UserDashboard

