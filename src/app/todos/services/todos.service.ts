import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoItem } from "../types/todo.interface";

@Injectable()

export class TodosService {
	todos$ = new BehaviorSubject<TodoItem[]>([])

	addTodo(text: string): void {
		const newTodo: TodoItem = {
			text,
			isComplited: false,
			id: Math.random().toString(16)
		}
		const updatedTodos = [...this.todos$.getValue(), newTodo]
		this.todos$.next(updatedTodos)
	}

}