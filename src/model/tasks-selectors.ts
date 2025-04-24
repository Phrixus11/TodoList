
import type { RootState } from '../app/store'
import {TaskStateType} from "../app/App.tsx";

export const selectTasks = (state: RootState): TaskStateType => state.tasks