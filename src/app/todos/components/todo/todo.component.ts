import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { TodosService } from "../../services/todos.service";
import { TodoItem } from "../../types/todo.interface";

@Component({
	selector: 'app-todos-todo',
	templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit, OnChanges{
	@Input('todo') todoProps!: TodoItem
	@Input('isEditing') isEditingProps!: boolean
	@Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()
	editingText: string = ''
	@ViewChild('textInput') textInput!: ElementRef

	constructor(private todosService: TodosService) {}
	ngOnChanges(changes: SimpleChanges): void {
		if(changes?.['isEditingProps'].currentValue) {
			setTimeout(() => {
				this.textInput.nativeElement.focus()
			}, 0)
		}
	}
	ngOnInit(): void {
		this.editingText = this.todoProps.text
	}

	setTodoInEditMode(): void {
		this.setEditingIdEvent.emit(this.todoProps.id)
	}

	removeTodo() {
		this.todosService.removeTodo(this.todoProps.id)
	}

	toggleTodo(): void {
		this.todosService.toggleTodo(this.todoProps.id)
	}

	changeText(event: Event): void {
		const value = (event.target as HTMLInputElement).value
		this.editingText = value
	}

	changeTodo(): void {
		this.todosService.changeTodo(this.todoProps.id, this.editingText)
		this.setEditingIdEvent.emit(null)
	}
}