import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import Product from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AddEditCampaignComponent } from '../add-edit-campaign/add-edit-campaign.component';
import Campaign from '../../models/campaign.model';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        CommonModule,
        OverlayPanelModule,
        ConfirmDialogModule,
        AddEditCampaignComponent,
        TooltipModule
    ],
    providers: [ConfirmationService],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent {
    @Input() product!: Product;
    @ViewChild('op') op!: OverlayPanel;
    @Output() deleteCampaign: EventEmitter<string> = new EventEmitter();
    @Output() addCampaign: EventEmitter<[Campaign, string]> = new EventEmitter();
    @Output() editCampaign: EventEmitter<[Campaign, string]> = new EventEmitter();
    showCampaign: boolean = false;
    displayAddCampaignModal: boolean = false;
    displayEditCampaignModal: boolean = false;
    selectedCampaign: Campaign = {
        id: '',
        name: '',
        keywords: [],
        bidAmount: 0,
        fund: 0,
        status: 'on',
        town: '',
        radius: 0,
    }

    constructor(private confirmationService: ConfirmationService) {}

    toggleCampaignVisibility(event: Event) {
        this.showCampaign = !this.showCampaign;
        this.op.toggle(event);
    }

    confirmDeleteCampaign() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this campaign?',
            accept: () => {
                this.deleteCampaign.emit(this.product.id);
            },
        });
    }

    onConfirmAdd(campaign: Campaign) {
        this.addCampaign.emit([campaign, this.product.id]);
    }

    onConfirmEdit(campaign: Campaign) {
        this.editCampaign.emit([campaign, this.product.id]);
    }

    closeAddCampaignModal() {
        this.displayAddCampaignModal = false;
    }

    closeEditCampaignModal() {
        this.displayEditCampaignModal = false;
    }

    showEditCampaignModal() {
        this.displayEditCampaignModal = true;
        this.selectedCampaign = structuredClone(this.product.campaign!);
    }
}
