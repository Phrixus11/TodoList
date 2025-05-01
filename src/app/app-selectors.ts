import {RootState} from "./store.ts";
import {ThemeMode} from "./app-reducer.ts";

export const selectorThemeMode = (state: RootState): ThemeMode => state.app.themeMode