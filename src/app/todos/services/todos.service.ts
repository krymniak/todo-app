import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodoItem } from "../types/todo.interface";

@Injectable()

export class TodosService {
	todos$ = new BehaviorSubject<TodoItem[]>([])
	filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

	addTodo(text: string): void {
		const newTodo: TodoItem = {
			text,
			isCompleted: false,
			id: Math.random().toString(16)
		}
		const updatedTodos = [...this.todos$.getValue(), newTodo]
		this.todos$.next(updatedTodos)
	}

	toggleAll(isCompleted: boolean): void {
		const updatedTodos = this.todos$.getValue().map(todo => {
			return {
				...todo,
				isCompleted
			}
		})
		this.todos$.next(updatedTodos)
	}

	changeFilter(filter: FilterEnum): void {
		this.filter$.next(filter)
	}

	changeTodo(id: string, text: string): void {
		const updatedTodos = this.todos$.getValue().map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					text
				}
			}
			return todo
		})
		this.todos$.next(updatedTodos)
	}

	removeTodo(id: string): void {
		const updatedTodos = this.todos$.getValue().filter(todo => todo.id !== id)
		this.todos$.next(updatedTodos)
	}

	toggleTodo(id: string): void {
		const updatedTodos = this.todos$.getValue().map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					isCompleted: !todo.isCompleted
				}
			}
			return todo

		})
		this.todos$.next(updatedTodos)
	}
}