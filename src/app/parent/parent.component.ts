import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../service/PaginationService.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private paginationService: PaginationService) { }

    // array of all items to be paged
    workflow: any[]=[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    //loading check
    isLoading : boolean =false;
    //total data
    totalItem: number;
    //highest pageNo

    highestpageNo : number;

  ngOnInit() { 
    console.log("parent ngonit");
    const pageNO =1;
    const pageSize =10;
    const self =this;
    this.highestpageNo =pageNO;
    this.paginationService.callApi(pageNO,pageSize)
    .subscribe(resp => {
       // set items to json response
        this.convertDataType(resp.body,self.workflow);

        // initialize to page 1
        this.setPage(1);
        self.isLoading=true;
    })

  }

setPage(page: number) {
        // get pager object from service
        this.pager = this.paginationService.getPager(this.totalItem, page,10);

        // get current page of items
        this.pagedItems = this.workflow.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.workflow);
        console.log("pager : "+JSON.stringify(this.pager));
        console.log("pagedItems : "+JSON.stringify(this.pagedItems));
    }
  
  convertDataType(response:any,workflow:any) {
    
      response.empList.forEach(element => {
        var data :any={};
        data.name=element.name;
        workflow.push(data);
        console.log(workflow);
      });
      this.totalItem =response.totalElement;
      
  }

  getNextData(pageNO:number){
    //this.isLoading=false;
    const pageSize =10;
    const self =this;
    if(pageNO > this.highestpageNo)
    {
      this.paginationService.callApi(pageNO,pageSize)
    .subscribe(resp => {
       // set items to json response
        self.convertDataType(resp.body,self.workflow);
        self.highestpageNo=pageNO;
        // initialize to page 1
        self.setPage(pageNO);
        //self.isLoading=true;
    });
    }
    else {
      self.setPage(pageNO);
    }
    
  }

}
