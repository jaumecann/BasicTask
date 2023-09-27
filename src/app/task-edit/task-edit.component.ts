import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ITask } from '../interfaces/task.interface';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  public taskForm!: FormGroup

  constructor(public fb:FormBuilder, private tasksService: TasksService){
    this.taskForm= this.fb.group({
      title:['', Validators.required],
      description:['', Validators.required],
      // status:['']
    })
  }
  ngOnInit(): void {
  }


  public save(){
    if(this.taskForm.valid){
      const title = this.taskForm.get('title')?.value;
      const description = this.taskForm.get('description')?.value;
      this.tasksService.save(null, title, description)
    }
  }
}
