import {
  BaseService
} from './base.service';

export class QueueService extends BaseService {
  /** @ngInject */

  constructor($http, $q) {
    super($http);

    this._$q = $q;
  }

  joinQueue(params) {
    return this.doPost('/api/queue/push', params);
  }
}
