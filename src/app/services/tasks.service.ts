import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

public tasks: ITask[] = [];
// private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
// public tasks$: Observable<ITask[]> = this.tasksSubject.asObservable()

  constructor(private router:Router) { }

  // notifyUpdatedTasks(tasks:ITask[]){
  //   this.tasksSubject.next(tasks)
  // }

  public save(id:number|null, title:string, description:string){
    if(id === null){
      let ids;
      if(this.tasks.length > 0){
        ids = this.tasks.map((t)=> t.id);
        const highestID = (ids.sort((a,b) => b - a)[0]);
        this.tasks.push({id:highestID + 1, title, description, completed:false})
      } else {
        this.tasks.push({id:1, title, description, completed:false})
      }

      /* const newTask: ITask = {}
      this.tasks.push() */
    }

    this.router.navigate([''])
  }

  public delete(id:number){
    this.tasks = this.tasks.filter((t)=> t.id !== id);
  }

}
