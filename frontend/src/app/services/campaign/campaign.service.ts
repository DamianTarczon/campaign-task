import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import Campaign from '../../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private apiService: ApiService) { }

  getCampaign = (url: string): Observable<Campaign> => {
    return this.apiService.get(url);
  }

  addCampaign = (url: string, body: Campaign): Observable<Campaign> => {
    return this.apiService.post(url, body);
  }

  editCampaign = (url: string, body: Campaign): Observable<Campaign> => {
    return this.apiService.put(url, body);
  }

  deleteCampaign = (url: string): Observable<any> => {
    return this.apiService.delete(url);
  }
}
