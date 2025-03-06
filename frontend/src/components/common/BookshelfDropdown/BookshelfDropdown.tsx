import './BookshelfDropdown.css'
import { ReactNode, Children } from 'react'



type BookshelfAccordionProps = {children: ReactNode, activePanel: boolean}


const BookshelfDropdown = ({children, activePanel}: BookshelfAccordionProps) => {

    console.log('dropdown children:', children)
    const [firstChild, secondChild] = Children.toArray(children)

    



    return (
        <div className="dropdown" >
            <div className="dropdown-panel" >
                <h2 id='dropdown-panel-heading' className='dropdown-panel-heading'>
                    <button
                        className='dropdown-trigger'
                        aria-controls='dropdown-panel-content'
                        aria-expanded={activePanel}
                                                         
                    >
                        {firstChild}
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