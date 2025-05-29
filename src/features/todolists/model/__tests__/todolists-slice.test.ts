import {nanoid} from "@reduxjs/toolkit"
import {beforeEach, expect, test} from "vitest"
import {
  changeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC,
  type DomainTodolist, todolistsReducer
} from "../todolists-slice"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'All'},
    {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'All'},
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled({todolistId: todolistId1}, 'requestId', {todolistId: todolistId1}))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  const newTd = {id: todolistId1, title, addedDate: '', order: 0, filter: 'All'}
  const endState = todolistsReducer(startState, createTodolistTC.fulfilled({todolist:newTd },'requestId',{title}))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test("correct todolist should change its title", () => {
  const title = "New title"
  const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled({todolistId:todolistId2,title},'',{todolistId:todolistId2,title}))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  const filter = "Completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter}))

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe(filter)
})

