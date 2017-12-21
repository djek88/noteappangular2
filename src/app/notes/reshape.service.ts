import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReshapeService {
  private reshapeRequestedSource = new Subject();

  reshapeRequested$ = this.reshapeRequestedSource.asObservable();

  requestReshape(): void {
    this.reshapeRequestedSource.next();
  }
}
