import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import Campaign from '../../models/campaign.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
        ReactiveFormsModule
    ],
    templateUrl: './add-edit-campaign.component.html',
    styleUrl: './add-edit-campaign.component.scss',
})
export class AddEditCampaignComponent {
    @Input() display: boolean = false;
    @Input() header!: string;
    @Output() confirm = new EventEmitter<Campaign>();
    @Output() cancel = new EventEmitter<void>();
    towns: any[] = towns;
    keywords: any[] = keywords;

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

    fundBidValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const group = control as FormGroup;
        const bid = group.get('bidAmount')?.value;
        const fund = group.get('fund')?.value;
        return bid && fund && fund < bid ? { fundLessThanBid: true } : null;
    };

    campaignForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        keywords: new FormControl([], [Validators.required]),
        bidAmount: [0, [Validators.required, Validators.min(0.5)]], //minimum 0.5 zł per click on campaign
        fund: [0, [Validators.required, Validators.min(100)]], //average costs with 0.5 zł per click for a day is 100 zł (it's made up)
        status: ['on', [Validators.required]],
        town: ['', [Validators.required]],
        radius: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    }, { validators: this.fundBidValidator })

    constructor(private fb: FormBuilder) {}

    ngOnChanges() {
        this.campaignForm.patchValue({
            id: this.campaign.id,
            name: this.campaign.name,
            keywords: this.campaign.keywords as never[],
            bidAmount: this.campaign.bidAmount,
            fund: this.campaign.fund,
            status: this.campaign.status,
            town: this.campaign.town,
            radius: this.campaign.radius
        });
    }

    onConfirm() {
        if(this.campaignForm.valid){
            this.confirm.emit(this.campaignForm.value as Campaign);
        }
    }

    onCancel() {
        this.display = false;
        this.cancel.emit();
    }
}
