import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  route = inject(ActivatedRoute);
  
  userId!: string;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
  }
}
