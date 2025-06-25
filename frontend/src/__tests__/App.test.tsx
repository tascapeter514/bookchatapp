import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import { configureStore } from '@reduxjs/toolkit'; // For a minimal store

import App from '../App'; // The component to be tested

// --- Mocking react-router-dom to prevent nested routers ---
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// --- Mocking All Child Components ---
// These paths are relative to src/tests/App.test.tsx
vi.mock('../components/Navbar/Navbar.tsx', () => ({
  default: () => <div data-testid="navbar-mock">Navbar</div>,
}));

vi.mock('../components/Homepage/Homepage.tsx', () => ({
  default: () => <div data-testid="homepage-mock">Homepage</div>,
}));

vi.mock('../components/Bookpage/Bookpage.tsx', () => ({
  default: () => <div data-testid="bookpage-mock">Bookpage</div>,
}));

vi.mock('../components/AuthorPage/AuthorPage.tsx', () => ({
  default: () => <div data-testid="authorpage-mock">AuthorPage</div>,
}));

vi.mock('../components/BookclubPage/BookclubPage.tsx', () => ({
  default: () => <div data-testid="bookclubpage-mock">BookclubPage</div>,
}));

vi.mock('../components/LogIn/Login.tsx', () => ({
  default: () => <div data-testid="login-mock">Login</div>,
}));

vi.mock('../components/UserDashboard/UserDashboard.tsx', () => ({
  default: () => <div data-testid="userdashboard-mock">User Dashboard</div>,
}));

vi.mock('../components/SearchPage/SearchPage.tsx', () => ({
  default: () => <div data-testid="searchpage-mock">Search Page</div>,
}));

vi.mock('../components/BooksPage/BooksPage.tsx', () => ({
  default: () => <div data-testid="bookspage-mock">Books Page</div>,
}));

// Mock PrivateRoute to control its authentication behavior for testing.
let mockIsAuthenticated = false;
vi.mock('../components/HigherOrderComponents/PrivateRoute.tsx', () => ({
  default: ({ children }: { children: React.ReactNode }) => {
    return mockIsAuthenticated ? (
      <div data-testid="private-route-children">{children}</div>
    ) : (
      <div data-testid="private-route-redirect-mock">Redirected from Private Route</div>
    );
  },
}));


describe('App Component Routing', () => {

  // Create a minimal mock store for Redux Provider
  // This will satisfy any component that uses useDispatch or useSelector
  const mockStore = configureStore({
    reducer: {
      // You can add dummy reducers here if your mocks or actual components
      // perform specific state selections, but for basic context, an empty object is fine.
      auth: vi.fn(() => ({ authToken: null })), // Example for auth state
      book: vi.fn(() => ({ book: null })), // Example for book state
      // Add other slices if needed for specific tests that rely on state selection
    },
    preloadedState: {
      // Preload initial state if needed
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      // Add any necessary mock middleware here if your app uses it (e.g., RTK Query middleware)
    ),
  });


  beforeEach(() => {
    mockIsAuthenticated = false;
    vi.clearAllMocks();
  });

  // Helper function to render App with a specific initial route, now including Redux Provider
  const renderApp = (initialEntries: string[] = ['/']) => {
    return render(
      <Provider store={mockStore}> {/* Wrap with Redux Provider */}
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  // Test 1: Navbar should always be present (re-checked with single render)
  it('renders Navbar on all routes', () => {
    renderApp(['/']); // Render only once
    expect(screen.getByTestId('navbar-mock')).not.toBeNull();
  });

  // Test 2: Homepage route
  it('renders Homepage component for the "/" route', async () => {
    renderApp(['/']);
    await waitFor(() => {
      expect(screen.getByTestId('homepage-mock')).not.toBeNull();
    });
    expect(screen.queryByTestId('searchpage-mock')).toBeNull();
    expect(screen.queryByTestId('login-mock')).toBeNull();
  });

  // Test 3: SearchPage route
  it('renders SearchPage component for the "/search" route', async () => {
    renderApp(['/search']);
    await waitFor(() => {
      expect(screen.getByTestId('searchpage-mock')).not.toBeNull();
    });
    expect(screen.queryByTestId('homepage-mock')).toBeNull();
  });

  // Test 4: Bookpage route with ID parameter
  it('renders Bookpage component for the "/book/:id" route', async () => {
    const bookId = 'test-book-123';
    renderApp([`/book/${bookId}`]);
    await waitFor(() => {
      expect(screen.getByTestId('bookpage-mock')).not.toBeNull();
    });
  });

  // Test 5: BooksPage route
  it('renders BooksPage component for the "/books" route', async () => {
    renderApp(['/books']);
    await waitFor(() => {
      expect(screen.getByTestId('bookspage-mock')).not.toBeNull();
    });
  });

  // Test 6: AuthorPage route with ID parameter
  it('renders AuthorPage component for the "/author/:id" route', async () => {
    const authorId = 'test-author-456';
    renderApp([`/author/${authorId}`]);
    await waitFor(() => {
      expect(screen.getByTestId('authorpage-mock')).not.toBeNull();
    });
  });

  // Test 7: Login route
  it('renders Login component for the "/login" route', async () => {
    renderApp(['/login']);
    await waitFor(() => {
      expect(screen.getByTestId('login-mock')).not.toBeNull();
    });
  });

  // Test 8: BookclubPage route with ID parameter
  it('renders BookclubPage component for the "/bookclub/:id" route', async () => {
    const clubId = 'test-club-789';
    renderApp([`/bookclub/${clubId}`]);
    await waitFor(() => {
      expect(screen.getByTestId('bookclubpage-mock')).not.toBeNull();
    });
  });

  // Test 9: PrivateRoute - Unauthenticated user
  it('redirects unauthenticated user from /userDashboard', async () => {
    mockIsAuthenticated = false;
    renderApp(['/userDashboard']);

    await waitFor(() => {
      expect(screen.getByTestId('private-route-redirect-mock')).not.toBeNull();
      expect(screen.queryByTestId('userdashboard-mock')).toBeNull();
    });
  });

  // Test 10: PrivateRoute - Authenticated user
  it('renders UserDashboard for authenticated user on /userDashboard', async () => {
    mockIsAuthenticated = true;
    renderApp(['/userDashboard']);

    await waitFor(() => {
      expect(screen.getByTestId('userdashboard-mock')).not.toBeNull();
      expect(screen.queryByTestId('private-route-redirect-mock')).toBeNull();
    });
  });
});
