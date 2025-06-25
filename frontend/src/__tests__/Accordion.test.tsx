import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from '../components/Accordion/Accordion'


describe('accordion tests', () => {

    const text = 'The accordion should render the text'
    
    it('should render on page load', () => {
        render(<Accordion>{text}</Accordion>)

        expect(text).toBe('The accordion should render the text')
    })

    it('should toggle isExpanded state when button is clicked', async () => {
        const user = userEvent.setup()
        render(<Accordion>Test content</Accordion>)

        const button = screen.getByRole('button', {name: /see more/i})

        expect(button.getAttribute('aria-expanded')).toBe('false')

        await user.click(button)
    })


})

