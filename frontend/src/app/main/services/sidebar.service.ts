import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SidebarService {
  constructor() { }

  isSidebarOpen: boolean = true;

  sidebarStatusSubject = new Subject();

  isArtistProfileOpen: boolean = false;
  
  artistProfileStatusSubject = new Subject();
  
}