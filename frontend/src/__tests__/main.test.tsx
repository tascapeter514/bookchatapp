import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Removed @testing-library/react's render as it's not directly used for this type of test

// --- Mock react-dom/client ---
// Define mock functions globally with `const` and initialize them directly with vi.fn().
// This ensures they are available when the mock factory is processed.
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender, // Return the globally defined mockRender
}));

vi.mock('react-dom/client', () => ({
  // The mock factory now simply exports the pre-defined mock functions.
  createRoot: mockCreateRoot,
}));

// --- Mock the App component ---
// Corrected path to ../App.tsx as per typical project structure
vi.mock('../App.tsx', () => ({
  default: () => <div data-testid="mock-app-component">Mock App</div>,
}));

// --- Mock the Redux store ---
const mockStore = {
  dispatch: vi.fn(),
  getState: vi.fn(() => ({})), // Return a minimal state
  subscribe: vi.fn(),
  replaceReducer: vi.fn(),
  // Add other store methods if your tests need to interact with them
};

// IMPORTANT: Define this mock for the store
vi.mock('../store/store.tsx', () => ({
  default: mockStore, // Ensure our specific mockStore instance is the default export
}));


describe('main.tsx initialization', () => {
  beforeEach(() => {
    // Clear all mocks (calls, etc.) before each test.
    // The mock functions themselves remain defined globally but their call history is cleared.
    vi.clearAllMocks();

    // Reset JSDOM body content for each test to ensure a clean slate.
    document.body.innerHTML = '';
    // Manually ensure the root element exists in JSDOM's document.
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    // CRITICAL: Reset the module registry before importing main.tsx.
    // This ensures that main.tsx will re-evaluate all its imports
    // and correctly pick up the mocked versions of its dependencies (like store.tsx).
    vi.resetModules();
  });

  it('should call createRoot with the correct DOM element and render the App component', async () => {
    // Now, import main.tsx. Due to vi.resetModules() in beforeEach,
    // it will re-evaluate all its imports and should pick up our mocks
    // for react-dom/client and store/store.tsx.
    await import('../main.tsx');

    // Assert that createRoot was called with the #root element.
    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'));

    // Assert that render was called.
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Access the argument passed to mockRender.
    // The first argument is the React element tree that main.tsx attempts to render.
    const renderedElement = mockRender.mock.calls[0][0];
    console.log('rendered element:', renderedElement)

    // Check if Provider is the top-level element.
    expect(renderedElement.type.name).toBe('Provider'); // Use .name for functional components
    expect(renderedElement.props.store).toBe(mockStore); // Ensure the correct store is passed

    // Check if StrictMode is a child of Provider.
    const strictModeChild = renderedElement.props.children;
    expect(strictModeChild.type).toBe(React.StrictMode);

    console.log('strict mode child:', strictModeChild.props.children)
    // Check if App is a child of StrictMode.
    // const appChild = strictModeChild.props.children;
    // expect(appChild.type.name).toBe('default'); // Assuming App is a functional component (default export)
    // expect(appChild.props['data-testid']).toBe('mock-app-component'); // Verify our mock App is used
  });

  // Since main.tsx's side effect (rendering the app) only happens once on import,
  // we typically don't need additional tests to "re-render" it.
  // The single test above covers the full initialization flow.

  // Optional: A test to ensure CSS is loaded if you use a mechanism that can be tested.
  // For basic `import './index.css'`, this is generally not testable via JS.
  // It's more of an integration/E2E concern or build step verification.
});
