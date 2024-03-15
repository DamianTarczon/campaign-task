import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import Product from '../../models/product.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
    private baseUrl: string = environment.apiUrl;
    products: Product[] = [];
    
    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getProducts(`${this.baseUrl}/products`).subscribe((products: Product[]) => {
            this.products = products;
        })
    }
}
