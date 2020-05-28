import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HistoryServiceService} from '../history-service.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  dataSource:PeriodicElement[]=[];
  columnsToDisplay = ['id', 'title', 'completed'];
  expandedElement: PeriodicElement | null;
  selected = 'Date';
  id:string;
  selectedDate:Date;
  constructor(private historyServiceService:HistoryServiceService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.historyServiceService.getTodos().subscribe(res=>{
      let result:any=res;
      console.log(result.slice(0,10));
      this.dataSource=result.slice(0,10);
    });
  }

  onSelect(){
    console.log(this.selected);
  }

  onShow(){
    if(this.selected=='Date'){
      let convertedDate =this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
      console.log(convertedDate);
    }
    else{
      console.log(this.id);
    }
  }
}

export interface PeriodicElement {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
