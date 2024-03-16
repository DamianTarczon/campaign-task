import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import Product from '../../models/product.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import Campaign from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign/campaign.service';
import { UserBalanceService } from '../../services/user-balance/user-balance.service';
import { take } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ProductComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
    private baseUrl: string = environment.apiUrl;
    products: Product[] = [];
    
    constructor(
        private productsService: ProductsService,
        private campaignService: CampaignService, 
        private userBalanceService: UserBalanceService, 
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.fetchProducts();
    }

    fetchProducts() {
        this.productsService.getProducts(`${this.baseUrl}/products`).subscribe({
            next: (data) => {
                this.products = data;
            },
            error: (error) => console.log(error)
        })
    }

    addCampaign([campaign, id]: [Campaign, string]) {
        this.campaignService.addCampaign(`${this.baseUrl}/products/${id}/campaign`, campaign).subscribe(
            {
                next: () => {
                    const fundAmount = campaign.fund;
                    this.userBalanceService.currentBalance
                    .pipe(take(1))
                    .subscribe(currentBalance => {
                        this.userBalanceService.updateBalance(currentBalance - fundAmount);
                    });
                    this.fetchProducts();
                    this.messageService.add({severity:'success', summary:'Success', detail:'Campaign added successfully'});
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong. Try again later.'});
                    console.log(error)
                }
            }
        )
    }

    editCampaign([campaign, id]: [Campaign, string]) {
        this.campaignService.editCampaign(`${this.baseUrl}/products/${id}/campaign`, campaign).subscribe(
            {
                next: () => {
                    this.fetchProducts();
                    this.messageService.add({severity:'success', summary:'Success', detail:'Campaign edited successfully'});
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong. Try again later.'});
                    console.log(error)
                }
            }
        )
    }

    deleteCampaign(id: string) {
        this.campaignService.deleteCampaign(`${this.baseUrl}/products/${id}/campaign`).subscribe(
            {
                next: () => {
                    this.fetchProducts();
                    this.messageService.add({severity:'success', summary:'Success', detail:'Campaign deleted successfully'});
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong. Try again later.'});
                    console.log(error)
                }
            }
        )
    }
}
