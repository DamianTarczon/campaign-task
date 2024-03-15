import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import Product from '../../models/product.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import Campaign from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign/campaign.service';

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
    
    constructor(private productsService: ProductsService, private campaignService: CampaignService) {}

    ngOnInit() {
        this.fetchProducts();
    }

    fetchProducts() {
        this.productsService.getProducts(`${this.baseUrl}/products`).subscribe((products: Product[]) => {
            this.products = products;
        })
    }

    addCampaign([campaign, id]: [Campaign, string]) {
        this.campaignService.addCampaign(`${this.baseUrl}/products/${id}/campaign`, campaign).subscribe(
            {
                next: () => {
                    this.fetchProducts();
                },
                error: (error) => console.log(error)
            }
        )
    }

    editCampaign([campaign, id]: [Campaign, string]) {
        this.campaignService.editCampaign(`${this.baseUrl}/products/${id}/campaign`, campaign).subscribe(
            {
                next: () => {
                    this.fetchProducts();
                },
                error: (error) => console.log(error)
            }
        )
    }

    deleteCampaign(id: string) {
        this.campaignService.deleteCampaign(`${this.baseUrl}/products/${id}/campaign`).subscribe(
            {
                next: () => {
                    this.fetchProducts();
                },
                error: (error) => console.log(error)
            }
        )
    }
}
