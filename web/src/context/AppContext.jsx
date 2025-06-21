import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  videos: [],
  likedVideos: new Set(),
  followedUsers: new Set(),
  loading: false,
  error: null,
};

// Action types
export const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_VIDEOS: 'SET_VIDEOS',
  ADD_VIDEOS: 'ADD_VIDEOS',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_FOLLOW: 'TOGGLE_FOLLOW',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };

    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case ActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };

    case ActionTypes.ADD_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
      };

    case ActionTypes.TOGGLE_LIKE:
      const newLikedVideos = new Set(state.likedVideos);
      if (newLikedVideos.has(action.payload)) {
        newLikedVideos.delete(action.payload);
      } else {
        newLikedVideos.add(action.payload);
      }
      return {
        ...state,
        likedVideos: newLikedVideos,
      };

    case ActionTypes.TOGGLE_FOLLOW:
      const newFollowedUsers = new Set(state.followedUsers);
      if (newFollowedUsers.has(action.payload)) {
        newFollowedUsers.delete(action.payload);
      } else {
        newFollowedUsers.add(action.payload);
      }
      return {
        ...state,
        followedUsers: newFollowedUsers,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionTypes.LOGOUT:
      localStorage.removeItem('userID');
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for stored authentication on mount
  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      // Simulate getting user data
      const userData = {
        id: storedUserID,
        name: 'Demo User',
        username: '@demo_user',
        email: 'demo@strmly.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      dispatch({ type: ActionTypes.SET_USER, payload: userData });
    }
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hooks
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within AppProvider');
  }
  return context;
};

// Action creators
export const actions = {
  setUser: (user) => ({ type: ActionTypes.SET_USER, payload: user }),
  setAuthenticated: (isAuth) => ({ type: ActionTypes.SET_AUTHENTICATED, payload: isAuth }),
  setVideos: (videos) => ({ type: ActionTypes.SET_VIDEOS, payload: videos }),
  addVideos: (videos) => ({ type: ActionTypes.ADD_VIDEOS, payload: videos }),
  toggleLike: (videoId) => ({ type: ActionTypes.TOGGLE_LIKE, payload: videoId }),
  toggleFollow: (userId) => ({ type: ActionTypes.TOGGLE_FOLLOW, payload: userId }),
  setLoading: (loading) => ({ type: ActionTypes.SET_LOADING, payload: loading }),
  setError: (error) => ({ type: ActionTypes.SET_ERROR, payload: error }),
  clearError: () => ({ type: ActionTypes.CLEAR_ERROR }),
  logout: () => ({ type: ActionTypes.LOGOUT }),
}; 