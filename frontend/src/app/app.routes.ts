import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AdminComponent } from "./admin/admin.component"
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { InterventionComponent } from './customer/customer-intervention/intervention.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { ServicesComponent } from './admin/services/services.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MechanicComponent } from './admin/mechanic/mechanic.component';
import { AppointmentComponent } from './admin/appointment/appointment.component';
import { CustomerAppointmentComponent } from './customer/customer-appointment/appointment.component';
import { NewAppointmentFormComponent } from './customer/new-appointment-form/new-appointment-form.component';
import { AddComponent } from './component/add/add.component';
import { CustomerDataComponent } from './component/customer-data/customer-data.component';

export const routes: Routes = [
    //{ path: '', component: FrontpageComponent },
    
    { path: 'admin', 
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'customer', component: CustomerComponent, 
                children:[ 
                    { path: 'customer-list', component: CustomerDataComponent },
                    { path: 'add-customer', component: AddComponent },
            ]
             },
            { path: 'mechanic', component: MechanicComponent },
            { path: 'appointments', component: AppointmentComponent },
            { path: '', redirectTo:'dashboard', pathMatch: 'full' }
        ]
    },
   { path: 'frontpage', component: FrontpageComponent},
    {
        path:'customer',
        component: CustomerLayoutComponent,
        children:[
            { path: 'appointment', component: CustomerAppointmentComponent },
            { path: 'intervention', component: InterventionComponent },
            { path: 'newAppointment', component: NewAppointmentFormComponent}
            // { path: 'intervention', }
        ]
    }   
]; 
