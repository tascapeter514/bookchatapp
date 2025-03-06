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
                role='region'>
                    <div>{children}</div>
            </div>
            <h2 id='panel-heading'>
                <button
                    className='accordion-trigger'
                    aria-controls='panel-content'
                    aria-expanded={isExpanded}
                     
                >
                {isExpanded ?  
                    <span  onClick={toggleAccordion}>See Less</span>

                :  <span  onClick={toggleAccordion}>See More</span>
                }
                
            </button>
        </h2>
        </div>
        
    </div>
    )

}

export default Accordion