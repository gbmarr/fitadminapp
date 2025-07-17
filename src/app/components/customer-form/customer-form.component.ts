import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ToastService } from '../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  customerId?: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        edad: [null, [Validators.min(10), Validators.max(100)]],
        objetivos: ['', Validators.required]
      });
      
      this.customerId = this.route.snapshot.paramMap.get('id') ?? undefined;

      if (this.customerId) {
        this.editMode = true;
        this.customerService.getById(this.customerId).subscribe(customer => {
          this.form.patchValue(customer);
        });
      }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.toastService.showToast('Completa todos los campos');
      return;
    }

    const data: Customer = {
      id: this.customerId,
      ...this.form.value
    };

    if (this.editMode && this.customerId) {
      this.customerService.update(data).subscribe(() => {
        this.toastService.showToast('Cliente actualizado');
        this.router.navigate(['/clientes']);
      });
    } else {
      this.customerService.create(data).subscribe(() => {
        this.toastService.showToast('Cliente creado');
        this.router.navigate(['/clientes']);
      });
    }
  }

}
