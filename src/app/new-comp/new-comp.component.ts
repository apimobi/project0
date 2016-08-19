import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
  } from '@angular/core';
import { FacebookService } from '../services/facebook.service';
import { DataService } from '../services/data.service';
import { CalendarEvent } from '../model/calendar-event';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { ParametersService } from '../services/parameters.service';


@Component({
  moduleId: module.id,
  selector: 'app-new-comp',
  templateUrl: 'new-comp.component.html',
  styleUrls: ['new-comp.component.css'],
  host: {
     '[@inOut]': 'translation',
     '[style.display]': "'block'",
     '[style.position]': "'absolute'",
     '[style.width]': "'100%'"
  },
  animations: [
    trigger('inOut', [
      state('void', style({transform: 'translateX(-100%)', opacity: 0 })),
      state('right', style({transform: 'translateX(0)', opacity: 1})),
      state('left', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => left', [
        style({transform: 'translateX(-100%)', opacity: 1}),
        animate(1000)
      ]),
      transition('void => right', [
        style({transform: 'translateX(100%)', opacity: 0.5}),
        animate(1000)
      ]),
      transition('right => void', animate(1000, style({transform: 'translateX(100%)', opacity: 0}))),
      transition('left => void', animate(1000, style({transform: 'translateX(-100%)', opacity: 0})))
    ]),   
    trigger('calendarEvent', [
      state('in', style({transform: 'translateY(300)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})


export class NewCompComponent implements OnInit, OnDestroy {

  calendarEvents:CalendarEvent[] = [];
  loaded:boolean = false;
  firstEvent:CalendarEvent;
  translation : string = 'left';
  pageId:number = 2;
  fb:FacebookService;
  
  // constructor(private fbService:FacebookService) { }
  constructor(
    private dataService:DataService,
    private parametersService: ParametersService
    ) {    
      this.parametersService.setCurrentPage(this);
   }

  ngOnInit() {
     
     if(this.pageId > this.parametersService.getParameter('currentPageId')) this.translation = 'right';
     else this.translation = 'left';
     console.log('NewCompComponent '+this.translation);
     
     let test = {
       name : "test",
       start_time : "2016/01/01",
       end_time : "2016/01/10",
       cover : "https://lh4.ggpht.com/wKrDLLmmxjfRG2-E-k5L5BUuHWpCOe4lWRF7oVs1Gzdn5e5yvr8fj-ORTlBF43U47yI=w300-rw"
     }
     this.calendarEvents.push( new CalendarEvent(test));
    //  this.dataService.getAllElts().then((rows) => this.showData(rows));

     this.parametersService.setCurrentPageId(this.pageId);  
  }

  ngOnDestroy()
  {
     console.log('ngOnDestroy NewCompComponent '+this.translation);
  }

  public showData = (data) => {
    console.log("data : ");
    // this.calendarEvents = [];
    for (var key in data) {
       this.calendarEvents.push( new CalendarEvent(data[key]));
    }

    this.dataService.saveEvents(this.calendarEvents);
    // console.log(">>>>>"+this.calendarEvents[10].name); 
    
  }

  connectMe()
  {
     this.fb = new FacebookService();
     this.fb.logMe(this.showData);
  }

  showEvents()
  {
     this.calendarEvents.push( new CalendarEvent({ "name":"test1", "start_time":"2016/01/01", "end_time":"2016/01/10"}) );
     this.calendarEvents.push( new CalendarEvent({ "name":"test2", "start_time":"2016/01/01", "end_time":"2016/01/10"}) );
     this.calendarEvents.push( new CalendarEvent({ "name":"test3", "start_time":"2016/01/01", "end_time":"2016/01/10"}) );
     this.calendarEvents.push( new CalendarEvent({ "name":"test4", "start_time":"2016/01/01", "end_time":"2016/01/10"}) );
     
  }

  public setTransition(str:string):void
  {
      console.log('ouiiiiiiiiii '+ str);
      this.translation = str;
  }

  loadFBCover()
  {
    this.fb.getEvent(532899443574151, this.callBackEvent);
  }

  public callBackEvent(response)
  {
     console.log(" okkkk "+response);
  }



  // addTodo(text) {
  //   var todo = {
  //     _id: new Date().toISOString(),
  //     title: text,
  //     completed: false
  //   };
  //   this.db.put(todo, function callback(err, result) {
  //     if (!err) {
  //       console.log('Successfully posted a todo!');
  //     }
  //   });
  // }

  // showTodos() {
  //   this.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  //     console.log(doc.rows);
  //     for (var key in doc.rows) {
  //             console.log("key :"+key);
  //             console.log("> :"+doc.rows[key].doc.title);
  //     }  
  //   });
  // }


  // showFirstDoc()
  // {
  //   this.db.get('2016-08-08T10:06:39.520Z').then(function (doc) {
  //     console.log(doc);
  //   });
  // }

}
