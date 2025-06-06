import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dispatch } from "react";
import { useState, useEffect } from "react";
import ModalSearchbar from "../components/Search/ModalSearchbar/ModalSearchbar";


interface MockSearchResultData {
    id: number,
    name: string
}

vi.mock('../components/Search/SearchInput/SearchInput', () => ({
    default: ({ searchValue, setSearchValue }: {searchValue: string, setSearchValue: Dispatch<string>}) => (
        <input 
            data-testid='search-input'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search...'
        
        />
        
    )

}))

vi.mock('../components/Search/SearchResults/SearchResults', () => ({
    default: ({searchData, children}: {searchData: MockSearchResultData[], children: (data: MockSearchResultData[]) => React.ReactNode}) => (
        <div data-testid='search-results'>
            {children(searchData)}
        </div>
    )
}))

vi.mock('../components/Mappers/RadioButtons/RadioButtons', () => ({
    default:({data, dispatch}: {data: MockSearchResultData[], dispatch: Dispatch<number>}) => (
        <div data-testid='radio-buttons'>
            {data.map((item) => (
                <label key={item.id}>
                    <input
                        type='radio'
                        name='book'
                        value={item.id}
                        onChange={() => dispatch(item.id)}
                        data-testid={`radio-button-${item.id}`} 
                    />
                    {item.name}

                </label>
            ))}

        </div>
    )
}))

const allAvailableBooks: MockSearchResultData[] = [
    {id: 1, name: 'Ubik'},
    {id: 2, name: 'Martin Chuzzlewit'},
    {id: 3, name: 'Pride and Prejudice'},
    {id: 4, name: 'Foundation'},
    {id: 5, name: 'Dune'},
    {id: 6, name: "Game of Thrones"},
    {id: 7, name: "Brave New World"}
]

const Wrapper = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResults, setSearchResults] = useState<MockSearchResultData[]>([])
    const [selectedId, setSelection] = useState<number>(NaN)

    useEffect(() => {
        const query = searchValue.toLowerCase().trim()

        if (query) {
            setTimeout(() => {
                const filtered = allAvailableBooks.filter(book => 
                    book.name.toLowerCase().includes(query)
                )
                setSearchResults(filtered)
            }, 50)

        } else {
            setSearchResults([])
        }
    }, [searchValue])

    return(
        <ModalSearchbar 
            searchValue={searchValue}
            searchResults={searchResults}
            setSearchValue={setSearchValue}
            setSelection={setSelection}
        
        
        />
    )
}


describe('ModalSearchbar testing suite', () => {

    const user = userEvent.setup()

    beforeEach(() => {
        vi.clearAllMocks()
    })


    it('does not display radio buttons when search value is empty', () => {
        render(<Wrapper/>)

        expect(screen.queryByTestId('radio-buttons')).toBeNull()
    })

    it('updates search input value when user types', async () => {
        render(<Wrapper/>)

        const searchInput = screen.getByTestId('search-input')

        await user.type(searchInput, 'The Importance of Being Earnest')

        expect((searchInput as HTMLInputElement).value).toBe('The Importance of Being Earnest')
    })

    it('displays radio buttons when a search term is entered and search results are present', async () => {

        render(<Wrapper/>)

        const searchInput = screen.getByTestId('search-input')
        await user.type(searchInput, 'Ub')

        await waitFor(() => {
            expect(screen.getByTestId('radio-buttons')).not.toBeNull();
            expect(screen.getByText('Ubik')).not.toBeNull();
        })

    })

    it('renders no radio buttons when there are no results for search term', async () => {
        render(<Wrapper/>)

        const searchInput = screen.getByTestId('search-input')
        await user.type(searchInput, 'A Portrait of the Artist as a Young Man')

        await waitFor(() => {
            expect(screen.queryByTestId('radio-buttons')).toBeNull()
        })
    })

    it('calls setSelectId when the user selects the correpsonding radio button', async () => {
        
        const mockSetSelection = vi.fn();

        render(
            <ModalSearchbar
                searchValue='Dune'
                searchResults={allAvailableBooks}
                setSearchValue={vi.fn()}
                setSelection={mockSetSelection}
            />
        )
        
        const searchInput = screen.getByTestId('search-input')
        await user.type(searchInput, "Dune")

        await waitFor(() => {
            expect(screen.getByLabelText('Dune')).not.toBeNull()
        })

        const radioBtn = screen.queryByTestId('radio-button-5')
        await user.click(radioBtn as Element)

        await waitFor(() => {
            expect(mockSetSelection).toHaveBeenCalled()
            expect(mockSetSelection).toHaveBeenCalledWith(5)

        })


    })
})