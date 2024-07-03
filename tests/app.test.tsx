// App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

test('renders App component', async () => {
  render(<App />);

  // Wait for the content to be fully rendered
  await waitFor(() => {
    // Find the element containing the text
    const homeElement = screen.getByText(/Bandara/i);
    expect(homeElement).toBeTruthy(); // Use toBeTruthy() instead of toBeInTheDocument()
  });
});
