import { render, screen } from "@testing-library/react";
import BookclubPage from "../components/BookclubPage/BookclubPage";
import useBookclubData from "../hooks/useBookclubData";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import * as React from 'react';
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { pollApi } from "../slices/pollApiSlice";


// vi.mock("../reducers/tabsReducer", async () => {
//   const actual = vi.importActual<typeof import("../reducers/tabsReducer")>("../reducers/tabsReducer");

//   return {
//     ...actual,
//     default: () => ({
//       activeTab: 'bookshelfPanel',
//       activeBookshelf: 'bookshelfTab0'
//     })
//   }
// })


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

// vi.mock('../reducers/tabsReducer', () => ({
//   default: () => () => {
//     return { activeTab: 'bookshelfPanel', activeBookshelf: '', showNav: false }
//   }
// }))

const activeTabMock = { current: 'bookshelfPanel' }

vi.mock('../reducers/tabsReducer', () => ({
    
  default: () => {
    console.log("OTHER MOCK TABS REDUCER IS FIRST IN FIRING")
    return {
      activeTab: activeTabMock.current,
      activeBookshelf: 'bookshelfTab0',
      showNav: false,
    }
}
  }))

vi.mock('../reducers/mobileNavReducer', () => ({
  default: () => () => {
    return { open: false, isExiting: false }
  }
}))

// const createMockStore = () =>
//   configureStore({
//     reducer: () => ({}), // empty reducer, you don't need state here
//   });

const createMockStore = () =>
  configureStore({
    reducer: {
      [pollApi.reducerPath]: pollApi.reducer,
      // Add other reducers if needed
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pollApi.middleware),
  });


const renderWithProviders = (ui: React.ReactElement) => {

const store = createMockStore()

  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};


describe('BookclubPage', () => {


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

    it('does not render any panel when activeTab is empty and bookshelves/books are undefined', () => {
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
            cover_image: ''
            },
            bookshelves: undefined,
            books: undefined,
        });

        renderWithProviders(<BookclubPage />);

    expect(screen.queryByTestId('bookclub-bookshelf-panel')).toBeNull();
    expect(screen.queryByTestId('bookclub-current-read-panel')).toBeNull();
});

    it ('does not render any panel when activeTab is empty and bookshelves/books are initialized as non-null', () => {
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
            cover_image: ''
            },
            bookshelves: [], // initialized
            books: []         // initialized
        });

        renderWithProviders(<BookclubPage />);

        expect(screen.queryByTestId('bookclub-bookshelf-panel')).toBeNull();
        expect(screen.queryByTestId('bookclub-current-read-panel')).toBeNull();

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



        renderWithProviders(<BookclubPage />)

        // Before click, links shouldn't be visible
        expect(screen.queryByRole('link', { name: /Fiction/i })).toBeNull();
        expect(screen.queryByRole('link', { name: /Non-Fiction/i })).toBeNull();

        // Click the dropdown icon to trigger TOGGLE_DROPDOWN
        const iconToggle = screen.getByTestId('dropdown-toggle-icon')
        console.log('icon toggle:', iconToggle)
        await userEvent.click(iconToggle)

        const dropdownContent = await screen.findByTestId('dropdown-panel-content') // or any wrapper
        const links = within(dropdownContent).getAllByRole('link', {name: /Fiction/i, hidden: true})


        const fictionLink = links.find(link => link.getAttribute('href') === '#fiction')

        expect(fictionLink).toBeDefined()
        expect(fictionLink?.textContent).toMatch(/Fiction/)

        expect(fictionLink).not.toBeNull()

        
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

        renderWithProviders(<BookclubPage />)

        

        // expect(panel).toBeNull()
        // expect(bookshelvesHeader).toBeNull()

        // const dropdownButton = await screen.findByTestId('bookshelf-toggle')
        // await userEvent.click(dropdownButton)

        const bookshelfButton = await screen.findByText('Bookshelves')
        await userEvent.click(bookshelfButton)

        const dropdownContent = await screen.findByTestId('dropdown-panel-content') // or any wrapper
        const links = within(dropdownContent).getAllByRole('link', {name: /Fiction/i, hidden: true})

        const fictionLink = links.find(link => link.getAttribute('href') === '#fiction')

        if (!fictionLink) {
            throw new Error('Fiction link not found')
        }

        await userEvent.click(fictionLink)

        // await waitFor(() =>
        //     expect(dropdownButton.getAttribute('aria-expanded')).toBe(true)

        // )

        const panel = await screen.findByTestId('bookclub-bookshelf-panel')
        


        expect(panel).not.toBeNull()
        // const bookshelvesHeader = await screen.findByRole('heading', {level: 1, name: /Bookshelves/i})

        // expect(panel).not.toBeNull()
        // expect(bookshelvesHeader).not.toBeNull()

        

    })

    it('should render the current read panel when active tab is "currentReadPanel"', async () => {

        vi.resetModules()

        vi.doMock('../reducers/tabsReducer', () => ({
            default: () => {
                console.log('MOCKED TABS REDUCER FIRED')
                return {
                    activeTab: 'currentReadPanel',
                    activeBookshelf: '',
                    showNav: false
                }
            }
   
        }))

        const { default: BookclubPage } = await import("../components/BookclubPage/BookclubPage");

        renderWithProviders(<BookclubPage />);

        const bookshelfButton = await screen.findByText('Bookshelves')
        await userEvent.click(bookshelfButton)

        const dropdownContent = await screen.findByTestId('dropdown-panel-content') // or any wrapper
        const links = within(dropdownContent).getAllByRole('link', {name: /Fiction/i, hidden: true})

        const fictionLink = links.find(link => link.getAttribute('href') === '#fiction')

        if (!fictionLink) {
            throw new Error('Fiction link not found')
        }

        await userEvent.click(fictionLink)

        const panel = await screen.findByTestId('bookclub-current-read-panel');
        expect(panel).not.toBeNull()


    })
})