import './BookshelfAccordion.css'
import { useState, ReactNode } from 'react'
import { ArrowLeftIcon } from '../Icons'


type BookshelfAccordionProps = {children: ReactNode}


const BookshelfAccordion = ({children}: BookshelfAccordionProps) => {

    const [activePanel, setActivePanel] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const toggleAccordion = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)

    }


    return (
        <div className="bookshelf-accordion" >
            <div className="bookshelf-accordion-panel" >
                <h2 id='bookshelf-panel-heading'>
                    <button
                        className='bookshelf-accordion-trigger'
                        aria-controls='bookshelf-panel-content'
                        aria-expanded={activePanel}
                                                         
                    >
                        <span id='bookhself-panel-title'></span>
                        <div 
                            className="bookshelf-accordion-icon" 
                            onClick={toggleAccordion}
                        >
                             <ArrowLeftIcon isRotated={isRotated}></ArrowLeftIcon>
                        </div>
                    </button>
                </h2>
                <div 
                    className='bookshelf-accordion-content' 
                    id='bookshelf-panel-content'
                    aria-labelledby='bookshelf-panel-heading'
                    aria-hidden='true'
                    role='region'
                >
                    {children}
                    
                </div>
            </div>
        </div>
    )


}

export default BookshelfAccordion