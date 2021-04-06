import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  @Output() message = new EventEmitter<any>();
  @Output() search_open = new EventEmitter<any>();
  @Output() phoneNumber = new EventEmitter<any>();

  sendMessage(x: any) {
      this.message.emit(x)
  }
  emitSearchOpen(x: any) {
      this.search_open.emit(x)
  }
  emitVerifiedPhone(x: any) {
      this.phoneNumber.emit(x)
  }
}
