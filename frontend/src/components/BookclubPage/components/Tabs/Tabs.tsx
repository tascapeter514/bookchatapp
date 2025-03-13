import './Tabs.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { RightDropDownIcon } from '../../../common/Icons'


interface TabsProps {
    activeTab: number,
    contents: [{name: string, id: number}],
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
            <>
                {tabContent.name === 'Bookshelves' && (
                    // CHANGE TAB KEYS TO IDS


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
            
            
            
            </>
        )

        

    })

 

    return(

        <div className="tabs-container">
            <ul arial-labelledby='tabs-title'>
                {tabElements}

            </ul>
        </div>





    )

}

export default Tabs

