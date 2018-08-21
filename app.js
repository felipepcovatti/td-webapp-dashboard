Chart.defaults.global.maintainAspectRatio = false;
// Chart.defaults.global.responsive = true;
var ctx = document.getElementById("traffic");
var traffic = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["16-22", '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
      // label: '',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: [0, 500, 1350, 987, 730, 1202, 2325, 1902, 2031, 1200, 1664, 984, 1235, 1535, 124, 1785, 2215, 2451],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [
        'rgba(255,99,132,1)',

      ],
      borderWidth: 1
    }]
  },

  options: {
    legend: {
      display: false
    },
    //  tooltips: {
    // enabled: false
    //  },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 500,
        }
      }],

      xAxes: [{
          time: {
              unit: 'week'
          }
      }]
    }
  }
});


var ctx = document.getElementById("daily-traffic");
var dailyTraffic = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["16-22", '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
      // label: '',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: [0, 500, 1350, 987, 730, 1202, 2325, 1902, 2031, 1200, 1664, 984, 1235, 1535, 124, 1785, 2215, 2451],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [
        'rgba(255,99,132,1)',

      ],
      borderWidth: 1
    }]
  },

  options: {
    legend: {
      display: false
    },
    //  tooltips: {
    // enabled: false
    //  },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 500,
        }
      }],

      xAxes: [{
          time: {
              unit: 'week'
          }
      }]
    }
  }
});

var ctx = document.getElementById("mobile-users");
var mobileUsers = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["16-22", '23-29', '30-5', '6-12'],
    datasets: [{
      // label: '',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: [0, 500, 1350, 987, 730, 1202],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [
        'rgba(255,99,132,1)',

      ],
      borderWidth: 1
    }]
  },

  options: {
    legend: {
      display: false
    },
    //  tooltips: {
    // enabled: false
    //  },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 500,
        }
      }],

      xAxes: [{
          time: {
              unit: 'week'
          }
      }]
    }
  }
});
