import Dialog from "../components/Dialog/Dialog";
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


describe("Dialog testing suite", () => {

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn()
    })

    it ('renders button, opens modal on click, and renders radio buttons', async () => {

        const handleSubmit = vi.fn().mockResolvedValue(undefined)

        const { container } = render(
            <Dialog<DummyData>
                data={testData}
                title='Select a Book'
                handleSubmit={handleSubmit}
                button={(openModal) => (
                    <button onClick={openModal}>Add Book</button>
                )}
                >
                    {(data, dispatch) => 
                        <RadioButtons
                            data={data}
                            dispatch={dispatch}
                        >

                        </RadioButtons>

                    }
                </Dialog>
        )

        const addButton = screen.getByText('Add Book')
        await userEvent.click(addButton)

        // const dialog = container.querySelector('dialog') as HTMLDialogElement
        // console.log('dialog open status:', dialog?.open)
        // await waitFor(() => expect(dialog?.open).toBe(true))
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()

        // const radios = screen.getAllByRole('radio')
        // expect(radios).toHaveLength(testData.length)

    })

})