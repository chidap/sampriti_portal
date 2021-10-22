import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "login", loadChildren:()=> import(`./core/core.module`).then(m => m.CoreModule) },
    { path: "**", redirectTo: ""}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}