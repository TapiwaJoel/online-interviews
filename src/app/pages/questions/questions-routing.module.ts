import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionsListComponent} from './questions-list/questions-list.component';
import {QuestionsComponent} from './questions.component';


const routes: Routes = [{
  path: '',
  component: QuestionsComponent,
  children: [
    {
      path: 'list',
      component: QuestionsListComponent,
    }, {
      path: '',
      component: QuestionsListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {
}
