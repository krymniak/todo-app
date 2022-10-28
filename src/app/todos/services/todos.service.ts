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
			isComplited: false,
			id: Math.random().toString(16)
		}
		const updatedTodos = [...this.todos$.getValue(), newTodo]
		this.todos$.next(updatedTodos)
	}

	toggleAll(isComplited: boolean): void {
		const updatedTodos = this.todos$.getValue().map(todo => {
			return {
				...todo,
				isComplited
			}
		})
		this.todos$.next(updatedTodos)
	}

	changeFilter(filter: FilterEnum): void {
		this.filter$.next(filter)
	}
}