import {Inject, Injectable} from '@angular/core';
import {Environment, ENVIRONMENT_TOKEN} from './environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentProviderService {
  constructor(@Inject(ENVIRONMENT_TOKEN) private environment) {
  }

  get current(): Environment {
    return { ...this.environment };
  }
}
