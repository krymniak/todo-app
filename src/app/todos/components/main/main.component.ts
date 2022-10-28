import { Component, OnInit } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";
import { TodoItem } from "../../types/todo.interface";

@Component({
	selector: 'app-todos-main',
	templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{
	visibleTodos$!: Observable<TodoItem[]>
	noTodoClass$!: Observable<boolean>
	isAllTodosSelected$!: Observable<boolean>
	constructor(private todosService: TodosService) {}

	ngOnInit(): void {
		this.isAllTodosSelected$ = this.todosService.todos$.pipe(
			map((todos) => todos.every((todo) => todo.isComplited))
		)
		this.noTodoClass$ = this.todosService.todos$.pipe(
			map((todos) => todos.length === 0)
		)
		this.visibleTodos$ = combineLatest(
			this.todosService.todos$,
			this.todosService.filter$
		).pipe(map(([todos, filter]: [TodoItem[], FilterEnum]) => {
			if(filter === FilterEnum.active) {
				return todos.filter( todo => !todo.isComplited)
			} else if (filter === FilterEnum.completed) {
				return todos.filter( todo => todo.isComplited)
			}
			return todos
		}))
	}
	toggleAllTodos(event: Event): void {
		const target = event.target as HTMLInputElement
		this.todosService.toggleAll(target.checked)
	}
}