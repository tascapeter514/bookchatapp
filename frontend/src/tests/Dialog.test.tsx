import Dialog from "../components/Dialog/Dialog";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButtons from "../components/Mappers/RadioButtons/RadioButtons";
import Dropdown from "../components/Mappers/Dropdown/Dropdown";
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

    const handleSubmit = vi.fn(() => Promise.resolve())

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn()

        HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {this.open = true})
        HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {this.open = false})
    })

    beforeEach(() => {
        render(
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

    })


    it ('renders button and opens modal on click ', async () => {

        const dialogElement = screen.queryByRole('dialog', { hidden: true }) as HTMLDialogElement;

        expect(dialogElement).not.toBeNull();
        expect(dialogElement.open).toBe(false);

        const addButton = screen.getByRole('button', { name: /add book/i });

        fireEvent.click(addButton)

        await waitFor(() => {
            expect(dialogElement.open).toBe(true)
        })

        expect(screen.getByText('Select a Book')).not.toBeNull();

    })

    it('submits the selected item and closes the modal', async() => {

        const addButton = screen.getByRole('button', { name: /add book/i });
        fireEvent.click(addButton)

        const dialogElement = screen.queryByRole('dialog', { hidden: true }) as HTMLDialogElement;
        await waitFor(() => expect(dialogElement.open).toBe(true));

        const radio = screen.getByLabelText('Between the Acts')
        await userEvent.click(radio)

        const submitButton = screen.getByText('Submit')
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleSubmit).toHaveBeenCalledWith(2)
        })

        const cancelButton = screen.getByText('Cancel')
        await userEvent.click(cancelButton)

        await waitFor(() => expect(dialogElement.open).toBe(false))

    })

})

describe('dialog with dropdown component', () => {

    const handleSubmit = vi.fn(() => Promise.resolve())

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn()

        HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {this.open = true})
        HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {this.open = false})
    })

    beforeEach(() => {
        render(
            <Dialog<DummyData>
                data={testData}
                title='Select a Book'
                handleSubmit={handleSubmit}
                button={(openModal) => (
                    <button onClick={openModal}>Add Book</button>
                )}
                >
                    {(data, dispatch) => 
                        <Dropdown data={data} dispatch={dispatch} />
    
                    }
                </Dialog>
        )

    })

    it('renders the dropdown component', async () => {

        const addButton = screen.getByRole('button', { name: /add book/i });
        fireEvent.click(addButton)

        const dialogElement = screen.queryByRole('dialog', { hidden: true }) as HTMLDialogElement;
        await waitFor(() => expect(dialogElement.open).toBe(true));

        const option = screen.queryByRole('option', {name: /between the acts/i})
        await waitFor(() => expect(option).not.toBeNull())


    })



})

