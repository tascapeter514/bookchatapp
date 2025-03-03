import './Accordion.css'
import {FC, useState} from 'react'



const Accordion: FC<{children: React.ReactNode}> = ({children}) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const toggleAccordion = () => {
        console.log('toggle accordion check')

        setIsExpanded(prev => !prev)

    }

    console.log('is expanded:', isExpanded)

    return(
        <div className="accordion" >
        <div className="accordion-panel" >
            <div 
                className={`accordion-content ${isExpanded ? 'expanded': 'collapsed'}`}
                id='panel-content'
                aria-labelledby='panel-heading'
                aria-hidden='true'
                role='region'>
                    <p>{children}</p>
            </div>
            <h2 id='panel-heading'>
                <button
                    className='accordion-trigger'
                    aria-controls='panel-content'
                    aria-expanded={isExpanded}
                     
                >
                    <span onClick={toggleAccordion}>See More</span>
                    
            </button>
        </h2>
        </div>
        
    </div>
    )

}

export default Accordion