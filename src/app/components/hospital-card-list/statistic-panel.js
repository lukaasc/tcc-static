import './hospital-card.scss';

import moment from 'moment/min/moment.min';
import Highcharts from 'highcharts';
// Load module after Highcharts is loaded
import highchartsModule from 'highcharts/modules/exporting';
highchartsModule(Highcharts);

class StatisticPanelController {
  constructor($log, QueueService) {
    this._$log = $log;
    this.QueueService = QueueService;

    this.loading = false;
    this.data = null;
    this.error = false;
    this.errorMessage = null;
  }

  $onInit() {
    this.loading = true;

    this.QueueService.getStatistic(this.hospitalCode).then(response => {
      this.data = response.data;

      this.loading = false;

      if (response.data.length < 3) {
        this.data = null;
        this.errorMessage = 'Dados insuficientes para serem exibidos';

        return;
      }
      this.plotGraph();
    }, err => {
      this._$log.debug(`Failed trying to retrive statistics data ${err}`);

      this.loading = false;
      this.error = true;
      this.errorMessage = 'Erro ao tentar recuperar dados do hospital';
    });
  }

  plotGraph() {
    const categories = [];
    const series = [];

    this.data.map(element => {
      categories.push(element._id.day);
      series.push({
        y: element.count,
        mediumTime: element.mediumTime
      });

      return true;
    });

    Highcharts.chart(`container-${this.hospitalCode}`, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Tempo médio atendimento'
      },
      xAxis: {
        categories
      },
      yAxis: {
        title: {
          text: 'Nº Pessoas'
        }
      },
      tooltip: {
        formatter: function () { // eslint-disable-line
          return `${this.x} <br> 
          ${this.series.name}: ${this.y} <br> 
          Média: ${moment.utc(this.point.mediumTime).format('HH:mm:ss')}`;
        }
      },
      series: [{
        name: 'Total',
        data: series
      }]
    });
  }

  goBack() {
    this.isVisible = false;
  }
}

export const statisticPanel = {
  template: require('./statistic-panel.html'),
  controller: StatisticPanelController,
  bindings: {
    isVisible: '=',
    hospitalCode: '<'
  }
};
