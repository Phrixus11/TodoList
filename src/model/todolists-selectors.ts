
import type { RootState } from '../app/store'
import {TodolistType} from "../app/App.tsx";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists