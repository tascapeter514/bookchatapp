import './BookshelfDropdown.css'
import { useState, ReactNode } from 'react'
import { RightDropDownIcon } from '../Icons'


type BookshelfAccordionProps = {children: ReactNode}


const BookshelfDropdown = ({children}: BookshelfAccordionProps) => {

    const [activePanel, setActivePanel] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const toggleAccordion = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)

    }


    return (
        <div className="dropdown" >
            <div className="dropdown-panel" >
                <h2 id='dropdown-panel-heading'>
                    <button
                        className='dropdown-trigger'
                        aria-controls='dropdown-panel-content'
                        aria-expanded={activePanel}
                                                         
                    >
                        <span id='dropdown-panel-title'></span>
                        <div 
                            className="dropdown-icon" 
                            onClick={toggleAccordion}
                        >
                             <RightDropDownIcon isRotated={isRotated}></RightDropDownIcon>
                        </div>
                    </button>
                </h2>
                <div 
                    className='dropdown-content' 
                    id='dropdown-panel-content'
                    aria-labelledby='dropdown-panel-heading'
                    aria-hidden='true'
                    role='region'
                >
                    {children}
                    
                </div>
            </div>
        </div>
    )


}

export default BookshelfDropdown