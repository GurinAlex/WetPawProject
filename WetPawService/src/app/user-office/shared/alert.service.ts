import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning';

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({type: 'success', text});
  }
  warning(text: string) {
    this.alert$.next({type: 'warning', text});
  }
}
