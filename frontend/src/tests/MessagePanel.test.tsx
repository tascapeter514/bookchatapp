import { render, screen } from '@testing-library/react'
import MessagePanel from '../components/Panels/MessagePanel/MessagePanel'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'



const mockAcceptInvite = vi.fn()
const mockDeclineInvite = vi.fn()

vi.mock('../slices/userDataApiSlice', async () => {
    const actual = await vi.importActual('../slices/userDataApiSlice')

    return {
        ...actual,
        useAcceptInviteMutation: () => [mockAcceptInvite, {isLoading: false}],
        useDeclineInviteMutation: () => [mockDeclineInvite, {isLoading: false}]
    }
})

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


describe('<MessagePanel invitations={invitations} />', () => {

    const invitations = [{
        id: 1,
        accepted: false,
        created_at: "2025-04-29T16:19:41.470649-04:00",
        inviter: 'tascapeter514',
        invitee: 3,
        status: 'pending',
        bookclub: {id: 3, name: 'Virginia Woolf Bookclub'}

    }]

    beforeEach(() => {
        render(
            <MemoryRouter>
                <MessagePanel invitations={invitations} />
            </MemoryRouter>
        )
    })

    test('calls acceptInvite with correct invite id when accept button is clicked', async () => {
        const user = userEvent.setup()
        const acceptButton = screen.getByText('Accept')

        mockAcceptInvite.mockResolvedValue({data: {status: 'accepted'}})

        await user.click(acceptButton)

        expect(mockAcceptInvite).toHaveBeenCalledWith(1)
    })

    test('calls declineInvite with correct invite id when delete button is clicked', async () => {
        const user = userEvent.setup()
        const declineButton = screen.getByText('Decline')

        mockDeclineInvite.mockResolvedValue({data: {status: 'declined'}})

        await user.click(declineButton)

        expect(mockDeclineInvite).toHaveBeenCalledWith(1)
    })
    

    test('after clicking the accept button, accept button disappears', async () => {

        const user = userEvent.setup()
        const acceptButton = screen.getByText('Accept')
        await user.click(acceptButton)
    
        expect(acceptButton).toBeNull()
    
    })

    test('after clicking the decline button, decline button disappears', async () => {
        const user = userEvent.setup()
        const declineButton = screen.getByText('Decline')
        await user.click(declineButton)

        expect(declineButton).toBeNull()
    })

})




