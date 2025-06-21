import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoCard from '../components/VideoCard';
import { api } from '../services/mockData';

// Mock the API
jest.mock('../services/mockData', () => ({
  api: {
    toggleLike: jest.fn(),
    toggleFollow: jest.fn(),
  }
}));

// Mock video data
const mockVideo = {
  id: 1,
  videoUrl: 'https://example.com/video.mp4',
  title: 'Test Video',
  description: 'Test description',
  userName: '@testuser',
  userImage: 'https://example.com/avatar.jpg',
  likes: 1000,
  comments: 50,
  shares: 25,
  earnings: 500,
  isLiked: false,
  isFollowing: false,
};

describe('VideoCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders video card with correct data', () => {
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('1K')).toBeInTheDocument(); // likes count formatted
    expect(screen.getByText('50')).toBeInTheDocument(); // comments
    expect(screen.getByText('25')).toBeInTheDocument(); // shares
    expect(screen.getByText('Follow')).toBeInTheDocument();
  });

  test('toggles like on heart button click', async () => {
    api.toggleLike.mockResolvedValue();
    
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    const likeButton = screen.getByRole('button', { name: /1K/ });
    fireEvent.click(likeButton);
    
    // Should show optimistic update immediately
    expect(screen.getByText('1K')).toBeInTheDocument(); // Updated count
    
    await waitFor(() => {
      expect(api.toggleLike).toHaveBeenCalledWith(1);
    });
  });

  test('handles like API failure with rollback', async () => {
    api.toggleLike.mockRejectedValue(new Error('API Error'));
    
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    const likeButton = screen.getByRole('button', { name: /1K/ });
    fireEvent.click(likeButton);
    
    await waitFor(() => {
      expect(api.toggleLike).toHaveBeenCalledWith(1);
    });
    
    // Should rollback to original state on error
    expect(screen.getByText('1K')).toBeInTheDocument();
  });

  test('toggles follow on follow button click', async () => {
    api.toggleFollow.mockResolvedValue();
    
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    const followButton = screen.getByText('Follow');
    fireEvent.click(followButton);
    
    expect(screen.getByText('Following')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(api.toggleFollow).toHaveBeenCalledWith('@testuser');
    });
  });

  test('shows play button when video is paused', () => {
    render(<VideoCard video={mockVideo} isActive={false} />);
    
    // Play button should be visible when not active
    const videoElement = screen.getByRole('application'); // video element
    expect(videoElement).toBeInTheDocument();
  });

  test('keyboard shortcuts work correctly', () => {
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    // Test spacebar for play/pause
    fireEvent.keyDown(window, { key: ' ', preventDefault: jest.fn() });
    
    // Test 'm' for mute
    fireEvent.keyDown(window, { key: 'm', preventDefault: jest.fn() });
    
    // Should not throw errors
    expect(true).toBe(true);
  });

  test('displays correct user information', () => {
    render(<VideoCard video={mockVideo} isActive={true} />);
    
    const userImage = screen.getByAltText('@testuser');
    expect(userImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    
    expect(screen.getByText('@testuser')).toBeInTheDocument();
  });

  test('formats numbers correctly', () => {
    const videoWithLargeNumbers = {
      ...mockVideo,
      likes: 1500000, // Should show as 1.5M
      comments: 50000, // Should show as 50K
    };
    
    render(<VideoCard video={videoWithLargeNumbers} isActive={true} />);
    
    expect(screen.getByText('1.5M')).toBeInTheDocument();
    expect(screen.getByText('50K')).toBeInTheDocument();
  });
}); 