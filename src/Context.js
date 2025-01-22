import { createContext, useCallback, useReducer } from 'react';

// Create Context
const TokyoContext = createContext();

// Type
const type = {
  NAV: 'NAV',
  ANIMATION: 'ANIMATION',
  MODAL: 'MODAL',
  SERVICEMODAL: 'SERVICEMODAL',
  NEWSMODAL: 'NEWSMODAL',
  PORTFOLIODETAILSMODAL: 'PORTFOLIODETAILSMODAL',
  SIGNUPMODAL: 'SIGNUPMODAL',
};
const {
  NAV,
  ANIMATION,
  MODAL,
  SERVICEMODAL,
  NEWSMODAL,
  PORTFOLIODETAILSMODAL,
  SIGNUPMODAL,
} = type;

// Initial Value
const initialState = {
  nav: 'home',
  animation: 'fadeInLeft',
  modal: false,
  serviceModal: null,
  newsModal: null,
  portfolioDetailsModal: null,
  signUpModal: false,
  menus: [
    { id: 1, name: 'home', href: 'home' },
    { id: 2, name: 'about', href: 'about' },
    { id: 3, name: 'retreats', href: 'retreats' },
    { id: 4, name: 'events', href: 'events' },
    { id: 5, name: 'resources', href: 'resources' },
    { id: 6, name: 'contact', href: 'contact' },
  ],
};

// Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NAV:
      return {
        ...state,
        nav: payload,
        animation: 'fadeInLeft',
      };
    case ANIMATION:
      return {
        ...state,
        animation: payload,
      };
    case SIGNUPMODAL:
      return {
        ...state,
        signUpModal: payload,
      };
    case MODAL:
      return {
        ...state,
        modal: payload,
      };
    case SERVICEMODAL:
      return {
        ...state,
        serviceModal: payload,
      };
    case NEWSMODAL:
      return {
        ...state,
        newsModal: payload,
      };
    case PORTFOLIODETAILSMODAL:
      return {
        ...state,
        portfolioDetailsModal: payload,
      };
    default:
      return state;
  }
};

// Watson State
const TokyoState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navChange = useCallback((value) => {
    dispatch({
      type: NAV,
      payload: value,
    });
  }, []);

  const animationChnage = useCallback((value) => {
    dispatch({
      type: ANIMATION,
      payload: value,
    });
  }, []);

  const modalToggle = useCallback((value) => {
    dispatch({
      type: MODAL,
      payload: value,
    });
  }, []);

  const setSignUpModal = useCallback((value) => {
    dispatch({
      type: SIGNUPMODAL,
      payload: value,
    });
  }, []);

  const setServiceModal = useCallback((value) => {
    dispatch({
      type: SERVICEMODAL,
      payload: value,
    });
  }, []);
  const setNewsModal = useCallback((value) => {
    dispatch({
      type: NEWSMODAL,
      payload: value,
    });
  }, []);
  const setPortfolioDetailsModal = useCallback((value) => {
    dispatch({
      type: PORTFOLIODETAILSMODAL,
      payload: value,
    });
  }, []);

  const {
    nav,
    animation,
    modal,
    serviceModal,
    newsModal,
    portfolioDetailsModal,
    menus,
    signUpModal,
  } = state;
  return (
    <TokyoContext.Provider
      value={{
        menus,
        nav,
        navChange,
        animation,
        animationChnage,
        modal,
        modalToggle,
        serviceModal,
        setServiceModal,
        newsModal,
        setNewsModal,
        portfolioDetailsModal,
        setPortfolioDetailsModal,
        signUpModal,
        setSignUpModal,
      }}
    >
      {children}
    </TokyoContext.Provider>
  );
};

export default TokyoState;
export { TokyoContext };
