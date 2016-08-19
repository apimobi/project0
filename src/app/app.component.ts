import { Component, style } from '@angular/core';
import { NewCompComponent } from './new-comp/new-comp.component';
import { Router } from '@angular/router';
import { ParametersService } from './services/parameters.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']  
})
export class AppComponent {
  title = 'app works!';

  constructor(private router: Router, private parametersService: ParametersService)
  {

  }

  goTo(route:string){
      console.log('goTo :'+route);
      if(route == "/")
      {
        this.parametersService.setNexPageId(0);
      }else if(route == "/NewComp"){
        this.parametersService.setNexPageId(2);
      }else if(route == "/calendar"){
        this.parametersService.setNexPageId(1);
      }else if(route == "/PageNotFound")
      {
        this.parametersService.getCurrentPage().setTransition('left');
        this.parametersService.setNexPageId(3);
      }

      setTimeout(() => {
                    this.router.navigate([route]);
                },0);

      // this.router.navigate([route]);          
      
  }
}
