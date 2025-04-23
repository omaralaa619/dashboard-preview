import { adminUiActions } from "@/store/admin-ui-store";

export const toggleBanner = (dispatch, content, status) => {
  dispatch(adminUiActions.openBanner({ content, status }));

  setTimeout(() => {
    dispatch(adminUiActions.hideBanner());
  }, 3000);
};
