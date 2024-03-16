import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserBalanceService } from '../../services/user-balance/user-balance.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    balance: number = 0;

    constructor(private userBalanceService: UserBalanceService) {}

    ngOnInit() {
        this.userBalanceService.currentBalance.subscribe(balance => this.balance = balance);
    }
}
