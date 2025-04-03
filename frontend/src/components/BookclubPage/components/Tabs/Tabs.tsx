import './Tabs.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { RightDropDownIcon } from '../../../Icons'



type TabContent = {name: string, id: number}

interface TabsProps {
    activeTab: number,
    contents: TabContent[],
    showSubNav: boolean,
    setShowSubNav: Dispatch<SetStateAction<boolean>>,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const Tabs = ({ activeTab, contents, showSubNav, setActiveTab, setShowSubNav }: TabsProps) => {

    const [isRotated, setIsRotated] = useState(false);


    const tabElements = contents.map((tabContent: {name: string, id: number}) => {

        const toggleDropdown = () => {
            setShowSubNav (prev => !prev)
            setIsRotated(prev => !prev)
        }

        const toggleTab = () => {
            setShowSubNav (false)
            setIsRotated(false)
            setActiveTab(tabContent.id)

        }

        return (
            <ul className='tabs-list'>
                {tabContent.name === 'Bookshelves' && (


                    <li 
                        key={tabContent.id}
                        onClick={() => setActiveTab(tabContent.id)}
                        className={activeTab === tabContent.id ? 'active': ''}
                    >
                        <a 
                            id={`tab-${tabContent.id}`} 
                            href={`#${tabContent.name.toLowerCase()}`}
                        >
                            {tabContent.name}
                            <RightDropDownIcon 
                                aria-controls='bookshelves-subnav'
                                aria-expanded={showSubNav}
                                onClick={toggleDropdown}
                                isRotated={isRotated}
                            >

                            </RightDropDownIcon>

                        </a>
                        
                    </li>
                )}

                {tabContent.name !== 'Bookshelves' && 
                    <li key={tabContent.id}                 
                        onClick={toggleTab}
                        className={activeTab === tabContent.id ? 'active': ''}
                    >
                        <a id={`tab-${tabContent.id}`} href={`#${tabContent.name.toLowerCase()}`}>
                            {tabContent.name}
                        </a>
                    </li>
                }
            
            
            
            </ul>
        )

        

    })

 

    return(

        <div className="tabs-container">
                {tabElements}
        </div>





    )

}

export default Tabs

