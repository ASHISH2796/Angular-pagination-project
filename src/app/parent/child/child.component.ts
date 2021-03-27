import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }
  @Input() workflow?:any; 
  @Input() pager?:any;
  @Input() pagedItems?:any;

  @Output() pageNoEvent = new EventEmitter<string>(); 

  ngOnInit() {
    console.log("child ngonit");
  }

 addNewItem(value: string) {
    this.pageNoEvent.emit(value);
  }

}
