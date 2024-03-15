import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCampaignComponent } from './add-edit-campaign.component';

describe('AddEditCampaignComponent', () => {
  let component: AddEditCampaignComponent;
  let fixture: ComponentFixture<AddEditCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
