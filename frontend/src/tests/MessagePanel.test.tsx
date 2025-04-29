import { render, screen } from '@testing-library/react'
import MessagePanel from '../components/Panels/MessagePanel/MessagePanel'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

test('renders content', () => {

    const invitations = [{
        id: 1,
        accepted: false,
        created_at: "2025-04-29T16:19:41.470649-04:00",
        inviter: 'tascapeter514',
        invitee: 3,
        status: 'pending',
        bookclub: {id: 3, name: 'Virginia Woolf Bookclub'}
    }]

    render(
        <MemoryRouter>
            <MessagePanel invitations={invitations} />
        </MemoryRouter>
    )

    const element = screen.getByText('tascapeter514')

    expect(element).toBeDefined()
    
  
})

beforeEach(() => {
    globalThis.fetch = vi.fn()
})

afterEach(() => {
    vi.restoreAllMocks()
})

test('clicking the button calls event handler once', async () => {
    const invitations = [{
        id: 1,
        accepted: false,
        created_at: "2025-04-29T16:19:41.470649-04:00",
        inviter: 'tascapeter514',
        invitee: 3,
        status: 'pending',
        bookclub: {id: 3, name: 'Virginia Woolf Bookclub'}

    }]

    const mockHandler = vi.fn()

    render(
        <MemoryRouter>
            <MessagePanel invitations={invitations} />
        </MemoryRouter>
    )


    const user = userEvent.setup()
    const acceptButton = screen.getByText('Accept')
    await user.click(acceptButton)

    expect(mockHandler.mock.calls).toHaveLength(1)

    


})


