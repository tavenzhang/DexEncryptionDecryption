import { StatusBarHeight } from "../../Page/asset/screen";

export const safeAreaTop = gameBrand => {
  let statusBarHeight = StatusBarHeight;
  if (gameBrand) {
    if (
      gameBrand.indexOf('HF_') > -1 ||
      gameBrand.indexOf('MARK_SIX') > -1 ||
      gameBrand.indexOf("ag-") > -1
    ) {
      statusBarHeight = 0;
    } else {
      switch (gameBrand) {
        case "TY_IMTY":
          statusBarHeight = G_IS_IOS ? 0 : StatusBarHeight;
          break;
      }
    }
  }
  const safeAreaStyle = `document.body.style.paddingTop = '${statusBarHeight}px';`;

  return safeAreaStyle;
};
