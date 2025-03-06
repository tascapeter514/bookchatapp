import './BookshelfDropdown.css'
import { useState, ReactNode, Children } from 'react'
import { RightDropDownIcon } from '../Icons'


type BookshelfAccordionProps = {children: ReactNode}


const BookshelfDropdown = ({children}: BookshelfAccordionProps) => {

    console.log('dropdown children:', children)
    const [firstChild, secondChild] = Children.toArray(children)

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
                        {firstChild}
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
                    {secondChild}
                    
                </div>
            </div>
        </div>
    )


}

export default BookshelfDropdown