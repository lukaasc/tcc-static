export class RecommendationService {
  /** @ngInject */
  constructor($http, $interval, $log) {
    this._$http = $http;
    this._$interval = $interval;
    this._$log = $log;

    this.hospitals = [];
    this.recommendedHospital = null;

    this._$interval(() => this.calculateRecommendedHospital(), 5000);
  }

  calculateRecommendedHospital() {
    this._$log.debug(`Checking best hospital recommendation`);

    angular.forEach(this.hospitals, (hospital, index) => {
      if (index === 0) {
        this.recommendedHospital = {
          hospitalCode: hospital.hospitalCode,
          totalTime: hospital.data.totalTime
        };
      } else {
        const minTime = Math.min(this.recommendedHospital.totalTime, hospital.data.totalTime);

        if (minTime === hospital.data.totalTime) {
          this.recommendedHospital = {
            hospitalCode: hospital.hospitalCode,
            totalTime: hospital.data.totalTime
          };
        }
      }
    });

    angular.forEach(this.hospitals, hospital => {
      hospital.data.callback();
    });
  }

  subscribe(param) {
    this.unsubscribe(param.hospitalCode);
    this.hospitals.push(param);
  }
  unsubscribe(hospitalCode) {
    const index = this.hospitals.findIndex(hospital => hospital.hospitalCode === hospitalCode);

    if (index > -1) {
      this.hospitals.splice(index, 1);
    }
  }
}
