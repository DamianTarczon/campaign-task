import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {
  private balanceSource = new BehaviorSubject<number>(550); // Assuming 550 zł as initial balance
  currentBalance = this.balanceSource.asObservable();

  constructor() { }

  updateBalance(amount: number) {
    this.balanceSource.next(amount);
  }
}

