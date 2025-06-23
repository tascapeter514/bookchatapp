import { render, screen } from "@testing-library/react";
import BookHeader from "../components/BookHeader/BookHeader";
import BookCover from "../components/BookCover/BookCover";
import { Book } from "../types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const mockBook: Book = {
  id: 1,
  name: "A Clash of Kings",
  publisher: "",
  description: "The second installment of the beloved series by George R. R. Martin ",
  ISBN_Identifiers: [],
  averageRating: 4.0,
  ratingsCount: 100,
  imageLinks: {
    thumbnail: "https://example.com/image.jpg"
  },
  pageCount: 200,
  genres: { id: 1, name: "Fantasy" },
  authors: []
}

const createMockStore = () =>
  configureStore({
    reducer: () => ({}), // empty reducer, you don't need state here
  });

  vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux')

    return {
      ...actual,
      useSelector: vi.fn()

    }
  })

  vi.mock('../slices/userDataApiSlice', () => ({
    useGetUserDataQuery: vi.fn()
  }))


import { useGetUserDataQuery } from "../slices/userDataApiSlice";



describe('BookHeader', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })



    it('should render a react node when passed', () => {

      const mockStore = createMockStore()

      vi.mocked(useSelector).mockImplementation(selector => {
        return selector({auth: { user: {id: 1001}}})
      })

      vi.mocked(useGetUserDataQuery).mockReturnValue({
        data: {bookshelves: []},
        isLoading: false
      } as any)


        render(<Provider store={mockStore}><BookHeader><BookCover book={mockBook} /></BookHeader></Provider>)

        const bookCover: HTMLImageElement = screen.getByRole('img')

        expect(bookCover.src).toEqual("https://example.com/image.jpg")
    })
})