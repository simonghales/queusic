export interface UIState {
  authenticated: boolean,
  searchDropdownVisible: boolean,
  searchDropdownSubviewVisible: boolean,
}

const initialState: UIState = {
  authenticated: false,
  searchDropdownVisible: false,
  searchDropdownSubviewVisible: false
};

const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const HIDE_SEARCH_DROPDOWN = 'HIDE_SEARCH_DROPDOWN';
const SHOW_SEARCH_DROPDOWN = 'SHOW_SEARCH_DROPDOWN';
const HIDE_SEARCH_DROPDOWN_SUBVIEW = 'HIDE_SEARCH_DROPDOWN_SUBVIEW';
const SHOW_SEARCH_DROPDOWN_SUBVIEW = 'SHOW_SEARCH_DROPDOWN_SUBVIEW';

export function setAuthenticated() {
  return {
    type: SET_AUTHENTICATED
  }
}

export function handleSetAuthenticated(state: UIState) {
  return {
    ...state,
    authenticated: true
  }
}

export function hideSearchDropdown() {
  return {
    type: HIDE_SEARCH_DROPDOWN
  }
}

export function handleHideSearchDropdown(state: UIState) {
  return {
    ...state,
    searchDropdownVisible: false
  }
}

export function showSearchDropdown() {
  return {
    type: SHOW_SEARCH_DROPDOWN
  }
}

export function handleShowSearchDropdown(state: UIState) {
  return {
    ...state,
    searchDropdownVisible: true
  }
}

export function hideSearchDropdownSubview() {
  return {
    type: HIDE_SEARCH_DROPDOWN_SUBVIEW
  }
}

export function handleHideSearchDropdownSubview(state: UIState) {
  return {
    ...state,
    searchDropdownSubviewVisible: false
  }
}

export function showSearchDropdownSubview() {
  return {
    type: SHOW_SEARCH_DROPDOWN_SUBVIEW
  }
}

export function handleShowSearchDropdownSubview(state: UIState) {
  return {
    ...state,
    searchDropdownSubviewVisible: true
  }
}

const ACTION_HANDLERS = {
  [SET_AUTHENTICATED]: handleSetAuthenticated,
  [HIDE_SEARCH_DROPDOWN]: handleHideSearchDropdown,
  [SHOW_SEARCH_DROPDOWN]: handleShowSearchDropdown,
  [HIDE_SEARCH_DROPDOWN_SUBVIEW]: handleHideSearchDropdownSubview,
  [SHOW_SEARCH_DROPDOWN_SUBVIEW]: handleShowSearchDropdownSubview,
};

export function uiReducer(state: UIState = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
}

