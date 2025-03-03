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
            <h2 id='panel1-heading'>
                <button
                    className='accordion-trigger'
                    aria-controls='panel1-content'
                    aria-expanded={isExpanded}
                     
                >
                    <span onClick={toggleAccordion}>See More</span>
                    
                </button>
            </h2>
            <div 
                className='accordion-content' 
                id='panel1-content'
                aria-labelledby='panel1-heading'
                aria-hidden='true'
                role='region'>
                    <p>{children}</p>
            </div>
        </div>
    </div>
    )

}

export default Accordion