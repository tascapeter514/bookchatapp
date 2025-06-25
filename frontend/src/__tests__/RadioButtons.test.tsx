import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButtons from "../components/Mappers/RadioButtons/RadioButtons";
import { SearchResultData } from "../types";



interface DummyData extends SearchResultData {
    id: number,
    name: string
}


const testData: DummyData[] = [
    {id: 1, name: 'The Importance of Being Earnest'},
    {id: 2, name: 'Between the Acts'}
]

describe('radio buttons testing suite', () => {

    it("renders radio buttons and calls dispatch", async  () => {

        const mockDispatch = vi.fn();
        render(<RadioButtons dispatch={mockDispatch} data={testData}/>);

        const firstRadioBtn = screen.getByLabelText('Between the Acts')
        userEvent.click(firstRadioBtn)

        await waitFor(() => expect(mockDispatch).toHaveBeenCalled())

    })

    it('calls action when passed as parameter', async () => {
        
        const mockAction = vi.fn((payload: number) => ({type: 'ADD_BOOK', payload}))
        const mockDispatch = vi.fn();
        

        render(<RadioButtons dispatch={mockDispatch} data={testData} action={mockAction}/>);

        const firstRadioBtn = screen.getByLabelText('Between the Acts')
        userEvent.click(firstRadioBtn)

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({type: 'ADD_BOOK', payload: 2})
            expect(mockAction).toHaveBeenCalled()
            expect(mockAction).toHaveBeenCalledWith(2)
        })

    })

})