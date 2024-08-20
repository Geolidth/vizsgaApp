import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  logo = signal('../assets/logo.jpg');
  private readonly _currentUser = signal<User | undefined>(undefined);
  private readonly CURRENT_USER_KEY = `currentUser`;

  constructor(protected readonly authService: AuthService) {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }
  logout() {
    this.authService.logout().subscribe();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }
}
