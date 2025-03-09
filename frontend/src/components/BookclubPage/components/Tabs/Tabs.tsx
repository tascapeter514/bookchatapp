import './Tabs.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { RightDropDownIcon } from '../../../common/Icons'


interface TabsProps {
    activeTab: number,
    contents: string[],
    subNav: boolean,
    setSubNav: Dispatch<SetStateAction<boolean>>,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const Tabs = ({ activeTab, contents, subNav, setActiveTab, setSubNav }: TabsProps) => {

    const [isRotated, setIsRotated] = useState(false);


    const tabElements = contents.map((tabContent: string, index: number) => {

        const toggleDropdown = () => {
            setSubNav(prev => !prev)
            setIsRotated(prev => !prev)
        }

        const toggleTab = () => {
            setSubNav(false)
            setIsRotated(false)
            setActiveTab(index)

        }

        return (
            <>
                {tabContent === 'Bookshelves' && (
                    <li 
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={activeTab === index ? 'active': ''}
                    >
                        <a 
                            id={`tab-${index}`} 
                            href={`#${tabContent.toLowerCase()}`}
                        >
                            {tabContent}
                            <RightDropDownIcon 
                                aria-controls='bookshelves-subnav'
                                aria-expanded={subNav}
                                onClick={toggleDropdown}
                                isRotated={isRotated}
                            >

                                </RightDropDownIcon>

                        </a>
                    </li>
                )}

                {tabContent !== 'Bookshelves' && 
                    <li key={index}                 
                        onClick={toggleTab}
                        className={activeTab === index ? 'active': ''}
                    >
                        <a id={`tab-${index}`} href={`#${tabContent.toLowerCase()}`}>
                            {tabContent}
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

