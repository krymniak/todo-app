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

	constructor(private todosService: TodosService) {}

	ngOnInit(): void {
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
}