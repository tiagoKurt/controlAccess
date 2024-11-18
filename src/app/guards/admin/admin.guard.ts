import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators'; // Importe o operador map

// Guard para Admin
export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe( // Use o observable user$
    map(user => {
      if (user && (user.cargo === 'admin' || user.cargo === 'gerente')) {
        return true;
      } else {
        alert("Acesso negado! Somente Admin ou Gerente podem acessar esta página.");
        router.navigate(['/profile']);
        return false;
      }
    })
  );
};
