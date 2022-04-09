import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnDestroy {

  private controller = 'localhost:3000/conditioners';

  private $destroy = Subject

  item:any;

  constructor(private http: HttpClient) { }

  getProducts(){
    this.http.get(this.controller).pipe().subscribe((s)=>{
    
    })
  }

  addProducts(){
    this.http.post(this.controller, this.item).subscribe((s)=>{

    })
  }
  

}


