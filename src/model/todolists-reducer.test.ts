import {beforeEach, expect, test} from 'vitest'
import {TodolistType} from "../app/App.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer.ts";
import { nanoid } from '@reduxjs/toolkit/react';


let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})

test('correct todolist should be deleted', () => {


    // Действие
    // const action: DeleteTodolistActionType = {
    //     type: 'delete_todolist',
    //     payload: {
    //         todolistId: todolistId1,
    //     },
    // }

    // создание action через функцию - bestPractice
    // const action = DeleteTodolistAC(todolistId1)

    // создание action, напрямую в параметре редьюсера
    const endState = todolistsReducer(startState, deleteTodolistAC({todolistId: todolistId1}))

    // Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {

    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter}))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})