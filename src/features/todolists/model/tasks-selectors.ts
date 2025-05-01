
import type { RootState } from '@/app/store'
import {TaskStateType} from "@/features/todolists/model/tasks-reducer.ts";

export const selectTasks = (state: RootState): TaskStateType => state.tasks