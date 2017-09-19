import './statistic-panel.scss';

class StatisticPanelController {
  constructor() {
    this.text = '';
  }

  $onInit() {
    /* eslint-disable*/
    console.log('AAAAAAAAAAAAAAAAAA ' + this.isVisible);
  }
  goBack() {
    this.isVisible = false;
  }
}

export const statisticPanel = {
  template: require('./statistic-panel.html'),
  controller: StatisticPanelController,
  bindings: {
    isVisible: '='
  }
};
