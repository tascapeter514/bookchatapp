import './BookshelfDropdown.css'
import { DropdownState } from '../../reducers/dropdownReducer'
import { ReactNode, Children } from 'react'



type BookshelfAccordionProps = {children: ReactNode, dropdown: DropdownState}


const BookshelfDropdown = ({children, dropdown}: BookshelfAccordionProps) => {

    const [firstChild, secondChild] = Children.toArray(children)

    



    return (
        <div className="dropdown" >
            <div className="dropdown-panel" >
                <h2 id='dropdown-panel-heading' className='dropdown-panel-heading'>
                    <button
                        data-testid='bookshelf-toggle'
                        className='dropdown-trigger'
                        aria-controls='dropdown-panel-content'
                        aria-expanded={dropdown.activePanel}
                                                         
                    >
                        {firstChild}
                    </button>
                </h2>
                <button 
                    className='dropdown-content'
                    data-testid="dropdown-panel-content" 
                    id='dropdown-panel-content'
                    aria-labelledby='dropdown-panel-heading'
                    aria-hidden='true'
                    role='region'
                >
                    {secondChild}
                    
                </button>
            </div>
        </div>
    )


}

export default BookshelfDropdown