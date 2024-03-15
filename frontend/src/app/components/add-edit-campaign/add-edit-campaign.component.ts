import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import Campaign from '../../models/campaign.model';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import keywords from '../../../assets/data/keywords';
import towns from '../../../assets/data/towns';

@Component({
    selector: 'app-add-edit-campaign',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        MultiSelectModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        SliderModule,
    ],
    templateUrl: './add-edit-campaign.component.html',
    styleUrl: './add-edit-campaign.component.scss',
})
export class AddEditCampaignComponent {
    @Input() display: boolean = false;
    @Input() header!: string;
    @Output() confirm = new EventEmitter<Campaign>();
    @Output() cancel = new EventEmitter<void>();
    towns: string[] = towns;
    keywords: string[] = keywords;

    @Input() campaign: Campaign = {
        id: crypto.randomUUID(),
        name: '',
        keywords: [],
        bidAmount: 0,
        fund: 0,
        status: 'on',
        town: '',
        radius: 0,
    };

    onConfirm() {
        this.confirm.emit(this.campaign);
    }

    onCancel() {
        this.display = false;
        this.cancel.emit();
    }
}
