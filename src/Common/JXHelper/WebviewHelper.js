
import { StatusBarHeight } from "../../Page/asset/screen";

export const safeAreaTop = (gameBrand) => {
    let statusBarHeight = StatusBarHeight;

    if (gameBrand) {
        switch (gameBrand) {
            case "TY_IMTY":
                statusBarHeight = G_IS_IOS ? 0 : StatusBarHeight;
                break;
        }
    }

    const safeAreaStyle = `document.body.style.paddingTop = '${statusBarHeight}px';`;

    return safeAreaStyle;
};