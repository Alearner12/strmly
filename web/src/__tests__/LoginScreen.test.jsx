import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginScreen from '../components/LoginScreen';
import { AppProvider } from '../context/AppContext';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const TestWrapper = ({ children }) => (
  <AppProvider>{children}</AppProvider>
);

describe('LoginScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renders login form with all elements', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    expect(screen.getByText('STRMLY')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Use Demo Account' })).toBeInTheDocument();
  });

  test('updates form fields when typing', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('toggles password visibility', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = passwordInput.nextElementSibling;

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  test('fills demo credentials when demo button is clicked', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const demoButton = screen.getByRole('button', { name: 'Use Demo Account' });
    fireEvent.click(demoButton);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput.value).toBe('demo@strmly.com');
    expect(passwordInput.value).toBe('demo123');
  });

  test('handles form submission and shows loading state', async () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Should show loading state
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Wait for login to complete
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'userID',
        expect.any(String)
      );
    }, { timeout: 2000 });
  });

  test('requires email and password fields', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });

  test('displays demo app message', () => {
    render(
      <TestWrapper>
        <LoginScreen />
      </TestWrapper>
    );

    expect(screen.getByText('Demo app - Any email/password works')).toBeInTheDocument();
  });
}); 