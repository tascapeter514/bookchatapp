import BookSearchModal from "../components/Modals/BookSearchModal/BookSearchModal";
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import ErrorMessage from "../components/Messages/ErrorMessage/ErrorMessage";


describe('book search modal testing suite', () => {


    test('renders error message', () => {

        const mockAddBook = vi.fn()
        const mockSetNewBook = vi.fn()

        render(
            <MemoryRouter>
                <BookSearchModal addBook={mockAddBook} setNewBook={mockSetNewBook}>
                    <ErrorMessage>Something went wrong</ErrorMessage>
                </BookSearchModal>
            </MemoryRouter>
        )


        expect(screen.getByTestId('error-message')).toBeTruthy()
        expect(screen.getByText('Something went wrong')).toBeTruthy()

    })
})