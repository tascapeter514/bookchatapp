
import { ReactNode } from 'react';

import './DashboardMain.css'

interface Props {
    children: ReactNode
}



const DashboardMain = ({children} : Props) => {


    return(

        <main className='dashboard-main'>
            {children}
        </main>

    )
}

export default DashboardMain

