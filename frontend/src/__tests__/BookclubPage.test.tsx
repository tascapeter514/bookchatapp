import { render, screen } from "@testing-library/react";
import BookclubPage from "../components/BookclubPage/BookclubPage";
import useBookclubData from "../hooks/useBookclubData";
import userEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";




vi.mock("../hooks/useBookclubData")
const mockedUseBookclubData = useBookclubData as ReturnType<typeof vi.fn>

vi.mock("../components/Modals/CreatePollModal/CreatePollModal", () => ({
    default: () => <div data-testid='mock-create-poll-modal'/>
}))

vi.mock("../components/Modals/InviteModal/InviteModal", () => ({
    default: () => <div data-test-id='mock-invite-modal' />
}))

vi.mock("../components/Modals/CreateBookclubBookshelfModal/CreateBookclubBookshelfModal", () => ({
    default: () => <div data-test-id='mock-create-bookclub-bookshelf-modal' />
}))

vi.mock('../reducers/tabsReducer', () => ({
  default: () => () => {
    return { activeTab: 'bookshelfPanel', activeBookshelf: '', showNav: false }
  }
}))

vi.mock('../reducers/mobileNavReducer', () => ({
  default: () => () => {
    return { open: false, isExiting: false }
  }
}))


describe('BookclubPage', () => {

    afterEach(() => {
        cleanup()
    })

    it('renders the load spinner when isLoading is true', () => {
        mockedUseBookclubData.mockReturnValue({
            isLoading: true,
            isError: false,
            error: null,
            bookclub: null,
            bookshelves: [],
            books: []
        })

        render(<BookclubPage />)
        
        expect(screen.getByTestId('load-spinner')).not.toBeNull()

    })

    it('renders the error message when isError is true', () => {
        mockedUseBookclubData.mockReturnValue({
            isLoading: false,
            isError: true,
            error: 'Failed to load bookclub data',
            bookclub: null,
            bookshelves: [],
            books: []
        })

        render(<BookclubPage />)

        expect(screen.getByText(/Failed to load/i)).not.toBeNull()
    })

    it('renders nothing if bookclub is null', () => {
        mockedUseBookclubData.mockReturnValue({
            isLoading: false,
            isError: false,
            error: null,
            bookclub: null,
            bookshelves: [],
            books: []
        })

        const { container } = render(<BookclubPage />)

        expect(container.firstChild).toBeNull()

    })

    it('renders bookclub hero and nav when bookclub data is present' , () => {

        // const store = createMockStore()

        mockedUseBookclubData.mockReturnValue({
            isLoading: false,
            isError: false,
            error: null,
            bookclub: {
            id: 1,
            name: 'Test Club',
            members: [],
            administrator: 1,
            currentRead: {} as any,
            cover_image: ''
            },
            bookshelves: [],
            books: [],
        })

        render(<BookclubPage />)

        const bookclubHeader = screen.getByRole('heading', {level: 1})
        const bookclubImage = screen.getByAltText('bookclub-background')

        expect(bookclubHeader.textContent).not.toBeNull()
        expect(bookclubImage).not.toBeNull()

    })

    it("should render bookshelf links", async () => {
        mockedUseBookclubData.mockReturnValue({
            isLoading: false,
            isError: false,
            error: null,
            bookclub: {
                id: 1,
                name: 'Test Club',
                members: [],
                administrator: 1,
                currentRead: {},
                cover_iamge: ""
            },
            bookshelves: [
                {id: 1, name: 'Fiction', books: []},
                {id: 2, name: 'Non-Fiction', books: []}
            ],
            books: []
        })



        render(<BookclubPage />)

        // Before click, links shouldn't be visible
        expect(screen.queryByRole('link', { name: /Fiction/i })).toBeNull();
        expect(screen.queryByRole('link', { name: /Non-Fiction/i })).toBeNull();

        const toggleButton = screen.getByRole('button', { name: /Bookshelves/i })
        await userEvent.click(toggleButton)

        const fictionLink = await screen.findByRole('link', { name: /Fiction/i })
        const nonFictionLink = await screen.findByRole('link', { name: /Non-Fiction/i })

        expect(fictionLink).not.toBeNull()
        expect(nonFictionLink).not.toBeNull()

        
    })

    it('should render <BookshelfPanel /> when activeTab is "bookshelfPanel"', async () => {

        mockedUseBookclubData.mockReturnValue({
            isLoading: false,
            isError: false,
            error: null,
            bookclub: {
            id: 1,
            name: 'Test Club',
            members: [],
            administrator: 1,
            currentRead: {},
            cover_image: ""
            },
            bookshelves: [
            { id: 1, name: 'Fiction', books: [] },
            { id: 2, name: 'Non-Fiction', books: [] }
            ],
            books: []
        });

        render(<BookclubPage />)

        

        // expect(panel).toBeNull()
        // expect(bookshelvesHeader).toBeNull()

        const dropdownButton = screen.getByRole('button', { name: /Bookshelves/i })
        await userEvent.click(dropdownButton)

        const panel = await screen.findByTestId('bookclub-bookshelf-panel')
        const bookshelvesHeader = await screen.findByRole('heading', {level: 1, name: /Bookshelves/i})

        expect(panel).not.toBeNull()
        expect(bookshelvesHeader).not.toBeNull()

        

    })
})