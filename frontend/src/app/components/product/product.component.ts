import { Component, Input, ViewChild } from '@angular/core';
import Product from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
    @Input() product!: Product;
    showCampaign: boolean = false;

    @ViewChild('op') op!: OverlayPanel;

    toggleCampaignVisibility(event: Event) {
        this.showCampaign = !this.showCampaign; // Toggle the state
        this.op.toggle(event); // Assuming 'op' is your OverlayPanel reference
    }
}
