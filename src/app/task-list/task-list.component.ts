import { TasksService } from './../services/tasks.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  public tasks!:ITask[];
  public filterValue: string = '';

  @ViewChild('filter') filter!: ElementRef;

  constructor(private tasksService:TasksService){}



  ngOnInit(): void {
    this.tasks = this.getTasks()


  }

  ngAfterViewInit(): void {
    // const inputElement = this.el.nativeElement.querySelector('input');
    fromEvent(this.filter.nativeElement, 'keydown').subscribe(()=> console.log(this.filter.nativeElement.value))
  }

  private getTasks(){
    return this.tasksService.tasks
  }

  public deleteEntry(id:number){
    this.tasksService.delete(id);
    this.tasks = this.getTasks();
  }

  // public filterChange(data:any){
  //   console.log(data.value)
  // }

  public onChangeFilterOption(option:string){
    if(option === TaskStatus.all){
      this.tasks = this.getTasks()
    } else if (option === TaskStatus.completed){
      this.tasks = this.getTasks().filter((t)=>t.completed === true)
    } else if (option === TaskStatus.incompleted){
      this.tasks = this.getTasks().filter((t)=>t.completed === false)
    }
  }

  onCompletionChange(event:any, id:number){
    console.log(event.target.checked)
    console.log(id)
    const taskModified = this.tasks.find((t)=> t.id === id)
    if(taskModified) taskModified.completed = event.target.checked
  }
}

export enum TaskStatus {
  completed = "COMP",
  incompleted = "INCOMP",
  all = "ALL"
}
