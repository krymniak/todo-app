import { Component, OnInit } from "@angular/core";
import { TodosService } from "../../services/todos.service";

@Component({
	selector: 'app-todos-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{

	text: string = ''

	constructor(private todoService: TodosService) {}

	ngOnInit(): void {
		this.todoService.todos$.subscribe(todos => {
			console.log('todos', todos)
		})
	}

	changeText(event: Event): void {
		const target = event.target as HTMLInputElement
		this.text = target.value
	}

	addTodo(): void {
		this.todoService.addTodo(this.text)
		this.text = ''
	}
}