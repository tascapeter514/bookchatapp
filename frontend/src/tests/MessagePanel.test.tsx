import { render, screen, waitFor } from '@testing-library/react'
import MessagePanel from '../components/Panels/MessagePanel/MessagePanel'
import userEvent from '@testing-library/user-event'
import InviteMessage from '../components/InviteMessage/InviteMessage'
import { MemoryRouter } from 'react-router-dom'
import { useGetUserDataQuery } from '../slices/userDataApiSlice'
import { vi } from 'vitest'



vi.mock('../slices/userDataApiSlice', () => ({
    ...vi.importActual('')
}))

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

    const element = screen.queryByText('tascapeter514')

    expect(element).not.toBeNull()
    expect(element).toBeTruthy()
    
  
})

beforeEach(() => {
    globalThis.fetch = vi.fn()
})

afterEach(() => {
    vi.restoreAllMocks()
})

test('clicking the accept button calls event handler once', async () => {
    const invitation = {
        id: 1,
        accepted: false,
        created_at: "2025-04-29T16:19:41.470649-04:00",
        inviter: 'tascapeter514',
        invitee: 3,
        status: 'pending',
        bookclub: {id: 3, name: 'Virginia Woolf Bookclub'}

    }


    render(
        <MemoryRouter>
            <InviteMessage 
                invitation={invitation}
                handleAccept={mockAcceptInvite}
                handleDecline={mockDeclineInvite}
                isAccepting={false}
                isDeclining={false}
                isAcceptError={false}
                isDeclineError={false}

            
            
            />
        </MemoryRouter>
    )


    const user = userEvent.setup()
    const acceptButton = screen.getByText('Accept')
    await user.click(acceptButton)

    expect(mockAcceptInvite.mock.calls).toHaveLength(1)

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

        const initialData = {
            invitations: [{id: 1, name: 'Invitation 1', status: 'pending'}]
        };

        const updatedData = {
            invitations: [{id: 1, name: 'Invitation 1', status: 'accepted'}]
        };

        (useGetUserDataQuery as vi.Mock).mockImplementation({
            data: initialData,
            isLoading: false
        })

        const user = userEvent.setup()
        const acceptButton = screen.getByText('Accept')

        // Mock resposne to simluate status change after accept
        mockAcceptInvite.mockResolvedValue({data: {status: 'accepted'}})


        await user.click(acceptButton)
        

        // Check 'Accept' Button is no longer present
        await waitFor(() => {

            expect(screen.queryByText('Accept')).toBeNull()

        })
        

        //Check for 'Invitation Accepted' message
        expect(screen.getByText('Invitation Accepted')).toBeTruthy()
    
    })

    test('after clicking the decline button, decline button disappears', async () => {
        const user = userEvent.setup()
        const declineButton = screen.getByText('Decline')
        await user.click(declineButton)

        expect(screen.queryByText('Decline')).toBeNull()
    })

})




