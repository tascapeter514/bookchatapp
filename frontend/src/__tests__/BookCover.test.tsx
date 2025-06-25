import {  render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useSelector } from "react-redux";
import BookCover from "../components/BookCover/BookCover";
import { Book } from "../types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

vi.mock('../slices/bookshelfApiSlice', () => ({
    usePostBookMutation: vi.fn() 
}))

import { usePostBookMutation } from "../slices/bookshelfApiSlice";



vi.mock('react-redux', async () => {

    const actual = await vi.importActual('react-redux');

    return {
        ...actual,
        useSelector: vi.fn()
    }


})

vi.mock('../slices/userDataApiSlice', () => ({
    useGetUserDataQuery: vi.fn() 
}))

import { useGetUserDataQuery } from "../slices/userDataApiSlice";


const mockUser = {
    id: 999,
    name: "John Doe"
}

const mockBook: Book = {
  id: 1,
  name: "Test Book",
  publisher: "",
  description: "",
  ISBN_Identifiers: [],
  averageRating: 4.0,
  ratingsCount: 100,
  imageLinks: {
    thumbnail: "https://example.com/image.jpg"
  },
  pageCount: 200,
  genres: { id: 1, name: "Fiction" },
  authors: []
}

const createMockStore = () =>
  configureStore({
    reducer: () => ({}), // empty reducer, you don't need state here
  });


describe("BookCover", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = vi.fn()
        HTMLDialogElement.prototype.close = vi.fn()
    })


    it('should call useGetUserDataQuery with the correct user id', () => {
        
        const store = createMockStore()

        vi.mocked(usePostBookMutation).mockReturnValue([vi.fn(), {} as any])

        vi.mocked(useSelector).mockImplementation(selector => {
            return selector({auth: {user: {id: mockUser.id}}})
        })

        vi.mocked(useGetUserDataQuery).mockReturnValue({
            data: {bookshelves: []},
            isLoading: false
        } as any)

        render(
            <Provider store={store}>
                <BookCover book={mockBook} />
            </Provider>)

        expect(useGetUserDataQuery).toHaveBeenCalledWith(mockUser.id, {skip: false})
    })

    it('should "no cover" if no thumbnail is available', () => {
        const store = createMockStore()
        mockBook.imageLinks.thumbnail = ''

        render(
            <Provider store={store}>
                <BookCover book={mockBook}/>

            </Provider>
        )

        expect(screen.getByText('No Cover')).toBeTruthy()
    })

    it('should not call useGetUserDataQuery if no user id is present', () => {
        const store = createMockStore()

        vi.mocked(usePostBookMutation).mockReturnValue([vi.fn(), {} as any])

        vi.mocked(useSelector).mockImplementation(selector => {
            return selector({auth: {user: {id: null}}})
        })

        vi.mocked(useGetUserDataQuery).mockReturnValue({
            data: undefined,
            isLoading: false
        } as any)

        render(
            <Provider store={store}>
                <BookCover book={mockBook} />
            </Provider>);

         expect(useGetUserDataQuery).toHaveBeenCalledWith(null, { skip: true });

    })

    it('should call add book with the correct arguments', async () => {

        const mockPostBook = vi.fn()

        vi.mocked(usePostBookMutation).mockReturnValue([mockPostBook, {} as any])

        const mockBookshelfId = 2090

        const addBook = async () => {

            try {

                await mockPostBook(mockBookshelfId)

            } catch(err: any) {
                console.error('Post Book Err', err)
            }

        }

        await addBook()

        expect(mockPostBook).toHaveBeenCalledWith(mockBookshelfId)
        await expect(addBook()).resolves.toBeUndefined()

    })

    it('should log an error if post book fails', async () => {

        const store = createMockStore()

        

        const mockError = new Error('Post Book failure')
        const mockPostBook = vi.fn().mockReturnValue({
            unwrap: vi.fn().mockRejectedValue(mockError)
        })
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        vi.mocked(usePostBookMutation).mockReturnValue([mockPostBook, {} as any])

        vi.mocked(useSelector).mockImplementation((selector) =>
            selector({ auth: { user: { id: mockUser.id } } })
        )

        vi.mocked(useGetUserDataQuery).mockReturnValue({
            data: {
                bookshelves: [
                { id: 456, name: 'Favorites' }
                ]
            },
            isLoading: false
        } as any)

        render(
            <Provider store={store}>
                <BookCover book={mockBook} />
            </Provider>);



        // open dialog
        await userEvent.click(screen.getByLabelText('Add to Bookshelf'))
        
        //Select the dropdwon item to choose a bookshelf
        await userEvent.selectOptions(
            screen.getByLabelText(/select one of your bookshelves/i),
            '456'
        )
        
        // Submit the form and trigger addBook
        await userEvent.click(screen.getByText('Submit'))

        await waitFor(() => {
            expect(mockPostBook).toHaveBeenCalled()
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
            expect(consoleErrorSpy).toHaveBeenCalledWith('add book error:', mockError)
        })

        consoleErrorSpy.mockRestore()
    })

    it('should throw an error if no valid id is passed to addBook', async () => {

        const store = createMockStore()

        const mockPostBook = vi.fn()

        // Fake user
        vi.mocked(useSelector).mockImplementation((selectorFn: any) =>
            selectorFn({ auth: { user: { id: null } } })
        )

        // Fake bookshelf data
        vi.mocked(useGetUserDataQuery).mockReturnValue({
            data: {
                bookshelves: [
                    { id: 456, name: 'Favorites' }
                ]
            },
            isLoading: false
        } as any)

        vi.mocked(usePostBookMutation).mockReturnValue([mockPostBook, {} as any])

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <Provider store={store}>
                <BookCover book={mockBook} />
            </Provider>);


        // open dialog
        await userEvent.click(screen.getByLabelText('Add to Bookshelf'))
        
        //Select the dropdwon item to choose a bookshelf
        await userEvent.selectOptions(
            screen.getByLabelText(/select one of your bookshelves/i),
            '456'
        )
        
        // Submit the form and trigger addBook
        await userEvent.click(screen.getByText('Submit'))

        await waitFor(() => {

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'add book error:',
                expect.any(Error)
            );

            expect(consoleErrorSpy.mock.calls[0][1].message).toBe('You are missing an id.');
            expect(mockPostBook).not.toHaveBeenCalled(); // Ensure it didn’t proceed
            
        })

       
        consoleErrorSpy.mockRestore()

    })

    it('should successfully post book when valid ids are provided', async () => {
        const store = createMockStore();

        const mockUnwrap = vi.fn().mockResolvedValue({ success: true });
        const mockPostBook = vi.fn().mockReturnValue({ unwrap: mockUnwrap });

        vi.mocked(usePostBookMutation).mockReturnValue([mockPostBook, {} as any]);

        vi.mocked(useSelector).mockImplementation((selector) =>
            selector({ auth: { user: { id: mockUser.id } } })
        );

        vi.mocked(useGetUserDataQuery).mockReturnValue({
            data: {
            bookshelves: [
                { id: 456, name: 'Favorites' }
            ]
            },
            isLoading: false
        } as any);

        render(
            <Provider store={store}>
            <BookCover book={mockBook} />
            </Provider>
        );

        // Open dialog
        await userEvent.click(screen.getByLabelText('Add to Bookshelf'));

        // Select bookshelf
        await userEvent.selectOptions(
            screen.getByLabelText(/select one of your bookshelves/i),
            '456'
        );

        // Submit form
        await userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockPostBook).toHaveBeenCalledWith({ bookshelfId: 456, newBookId: mockBook.id });
            expect(mockUnwrap).toHaveBeenCalled();
        });
    });

})
