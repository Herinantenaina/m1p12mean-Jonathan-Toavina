import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/create-services/services.service';
import { Appointment } from '../../models/appointment';
import { AuthService } from '../../services/auth-services/auth.service';
import { AppointmentService } from '../../services/customer-services/customer-appointment-services/appointment.service';
import { Payment } from '../../models/Payment';
import { CarService } from '../../services/car-services/car.service';


@Component({
  selector: 'app-completed-services',
  imports:[
    CommonModule
  ],
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class CompletedServicesComponent implements OnInit {
  completedServices: any[] = [];
  filteredServices: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  currentFilter = 'All';
  appointments: Appointment[] = [];
  user: any = null;
  payments: Payment[] = [];

  constructor(
    private serviceService: ServicesService,
    private authService: AuthService,
    private appointmentService : AppointmentService,
    private carService : CarService
  ){}

  ngOnInit(): void {
    this.filteredServices = [...this.appointments];
    this.loadUserData();
  }

  filterServices(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredServices = [...this.completedServices];
      return;
    }
    
    const term = searchTerm.toLowerCase();
    this.filteredServices = this.completedServices.filter(service => 
      service.car.make.toLowerCase().includes(term) ||
      service.car.model.toLowerCase().includes(term) ||
      service.serviceType.toLowerCase().includes(term) ||
      service.description.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  filterByStatus(status: string): void {
    this.currentFilter = status;
    if (status === 'All') {
      this.filteredServices = [...this.appointments];
    } else {
      this.filteredServices = this.appointments.filter(
        service => service.appoStatus.toLowerCase() === status.toLowerCase()
      );
    }
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredServices.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  viewDetails(service: any): void {
    console.log('Viewing details for service:', service);
  }

  downloadInvoice(service: any): void {
    console.log('Downloading invoice for service:', service);
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data.filter(dt => dt.customerId == this.user._id);
  
        // Fetch service names for each appointment
        this.appointments.forEach(appointment => {
          this.serviceService.getById(appointment.serviceId).subscribe(
            (service) => {
              appointment.serviceName = service.serviceName; 
              appointment.serviceDesc = service.serviceDescription;
              appointment.appoPriceEstimate = service.serviceEstimatedPrice;
              
              // i fetch car license plate
              this.carService.getCarById(appointment.carId).subscribe(
                (car) => {
                  appointment.carLicensePlate = car.licensePlate;
                  appointment.carModel = car.model;
                },
                (error) => {
                  console.log('Error fecthing car for ID in customer appointment view', error);
                }
              )
            },
            (error) => {
              console.log(`Error fetching service for ID ${appointment.serviceId}`, error);
            }
          );
        });
      },
      (error) => {
        console.log('Error fetching appointments', error);
      }
    );
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (response) => {
        this.completedServices = response.filter
      },
      error: (err) => {
        console.error('error fetching services', err);
      }
    })
  }

  private loadUserData(): void {
    const token =typeof window !== 'undefined' && window.localStorage? localStorage.getItem('token'): null;
      if (token) {
        this.authService.getUserData(token).subscribe({
          next: (response: any) => {
            this.user = response;
            this.loadAppointments();
          },
          error: (error: any) => {
            console.error('Error fetching user data', error);
          },
        });
      } else {
        console.warn('no token found in localstorage');
      }
  }

}