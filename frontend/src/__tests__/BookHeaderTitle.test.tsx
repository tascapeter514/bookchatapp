import {render, screen} from '@testing-library/react'
import BookHeaderTitle from '../components/BookHeaderTitle/BookHeaderTitle'
import { Provider } from 'react-redux'
import { Book } from '../types'
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import {vi, Mock} from 'vitest'

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux')
  return {
    ...actual,
    useSelector: vi.fn(),
  }
})

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



describe('BookHeaderTitle', () => {

    vi.mock('react-redux', async () => {
        const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
        return {
            ...actual,
            useSelector: vi.fn(),
        };
    });

    beforeEach(() => {
    // Cast to mock before using mockImplementation
    (reactRedux.useSelector as unknown as Mock).mockImplementation(selector =>
      selector({
        bookclubDataState: {
          someValue: 'test',
          anotherField: [],
        },
      })
    )
  })



    it('should render when passed the Book prop', () => {

        const store = createMockStore()

        render(
            <MemoryRouter>
                <Provider store={store}>
                <BookHeaderTitle book={mockBook} />
                </Provider>
            </MemoryRouter>
        )


        expect(screen.getByText('Test Book')).toBeTruthy()

    })
})