import { render, screen } from '@testing-library/react'
import AuthorDetails from '../components/AuthorDetails/AuthorDetails'
import { MemoryRouter } from 'react-router-dom'


describe('AuthorDetails', () => {

    const mockAuthor = {
        id: 1556,
        name: 'Noam Chomsky',
        bio: 'Noam Chomsky is a world renowned linguist and political dissident.'
    }


    it('should render AuthorDetails', () => {
        render(
            <MemoryRouter>
                <AuthorDetails id={mockAuthor.id} name={mockAuthor.name} bio={mockAuthor.bio} />
            </MemoryRouter>
        )

        const link = screen.getByRole('link', {name: /more about Noam Chomsky/i})

        expect(link).toBeTruthy()
        

        
    })
})