import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Product from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CampaignService } from '../../services/campaign/campaign.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    @Input() product!: Product;
    showCampaign: boolean = false;
    @ViewChild('op') op!: OverlayPanel;
    @Output() deleteCampaign: EventEmitter<any> = new EventEmitter();
    
    constructor(private confirmationService: ConfirmationService, private campaignService: CampaignService) {}

    toggleCampaignVisibility(event: Event) {
        this.showCampaign = !this.showCampaign;
        this.op.toggle(event);
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this campaign?',
            accept: () => {
                this.deleteCampaign.emit(this.product.id);
            }
        });
    }
}
