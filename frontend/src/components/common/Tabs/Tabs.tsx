import './Tabs.css'
import { Dispatch, SetStateAction } from 'react'


interface TabsProps {
    setActiveTab: Dispatch<SetStateAction<number>>,
    activeTab: number,
    contents: string[]
}




const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, contents }) => {
    

    const tabElements = contents.map((tabContent: string, index: number) => {

        return <li key={index}                 
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active': ''}>
                <a id={`tab-${index}`} href={`#${tabContent.toLowerCase()}`}>
                    {tabContent}
                </a>
            </li>
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

