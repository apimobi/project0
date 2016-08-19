import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './components/home-page/home-page.component';
import { PageNotFound } from './components/page-not-found/page-not-found.component';
import { NewCompComponent } from './new-comp/new-comp.component';
import { Calendar } from './components/calendar/calendar.component';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'newComp', component: NewCompComponent },
  { path: 'calendar', component: Calendar },
  { path: '**', component: PageNotFound }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);