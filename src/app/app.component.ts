import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenubarComponent } from "./components/menubar/menubar.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showMenuBar = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscrição para mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verifica se a rota atual é '/login'
      this.showMenuBar = event.url !== '/login';
    });
  }
}
