// actions/index.js
import { SHOW_PROFILE_POPUP, HIDE_PROFILE_POPUP } from './types.js';

export const showProfilePopup = () => ({
  type: SHOW_PROFILE_POPUP,
});

export const hideProfilePopup = () => ({
  type: HIDE_PROFILE_POPUP,
});
