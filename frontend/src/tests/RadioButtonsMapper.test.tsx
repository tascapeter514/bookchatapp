import RadioButtonsMapper from '../components/RadioButtonsMapper/RadioButtonsMapper'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'


describe('radio buttons mapper test suite', () => {

    const mockedPollData = [
        {id: 1, name: 'To the Lighthouse'},
        {id: 2, name: 'A Portrait of the Artist as a Young Man'},
        {id: 3, name: 'David Copperfield'}
    ]

    const mockDispatch = vi.fn()

    beforeEach(() => {

        render(
            <MemoryRouter>
                <RadioButtonsMapper 
                    data={mockedPollData}
                    dispatch={mockDispatch} 
                />
            </MemoryRouter>  
        )

    })

    test('radio buttons mapper renders content', () => {

        

        const bookOne = screen.getByText('To the Lighthouse')
        const bookTwo = screen.getByText('A Portrait of the Artist as a Young Man')
        const bookThree = screen.getByText('David Copperfield')

        expect(bookOne).toBeTruthy()
        expect(bookTwo).toBeTruthy()
        expect(bookThree).toBeTruthy()

    })

    test('radio button mapper on change handler is called when selecting radio button', async () => {

        const user = userEvent.setup()
        const mockRadioButtonInput = screen.getByLabelText('To the Lighthouse')

        await user.click(mockRadioButtonInput)

        expect(mockDispatch).toHaveBeenCalledOnce()
        expect(mockDispatch).toHaveBeenCalledWith(1)



    })

})



