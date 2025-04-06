import './Accordion.css'
import { useState} from 'react'



const Accordion = ({children}: {children: React.ReactNode}) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const toggleAccordion = () => {

        setIsExpanded(prev => !prev)

    }

    return(
        <div className="accordion" >
        <div className="accordion-panel" >
            <div 
                className={`accordion-content ${isExpanded ? 'expanded': 'collapsed'}`}
                id='panel-content'
                aria-labelledby='panel-heading'
                aria-hidden='true'
                role='region'
            >
                    <div className='accordion-children'>{children}</div>
            </div>
            <h2 id='panel-heading'></h2>
                <button
                    className = {`accordion-trigger ${isExpanded ? 'expanded': 'collapsed'}`}
                    aria-controls='panel-content'
                    aria-expanded={isExpanded}
                    onClick={toggleAccordion}
                >

                    <span  className={isExpanded ? 'expanded-span' : 'collapsed-span'}>
                        {isExpanded ? 'See Less' : 'See More'}
                    </span>
                    </button>
                
                 
        
        </div>
        
    </div>
    )

}

export default Accordion