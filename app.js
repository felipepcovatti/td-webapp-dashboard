/////////////global constants//////////////////

const getHeader = document.querySelector('.header')
const getCloseAlert = document.getElementById("close-alert");
const getMessageWrapper = document.querySelector('.message-wrapper');
const getBody = document.getElementsByTagName("BODY")[0]
const getNotify = document.querySelector('.notify');
///////////end global variables///////////////

///////////////functions/////////////////////
// const getColor = (element, property) => window.getComputedStyle(element).getPropertyValue(property);
function getColor(className) {
  let result = '';
  const newDiv = document.createElement("div");
  newDiv.style.display = 'none';
  newDiv.className = className;
  getBody.appendChild(newDiv);
  const thisDiv = document.getElementsByClassName(className)[0];
  result = window.getComputedStyle(thisDiv).getPropertyValue('color');
  getBody.removeChild(thisDiv);
  return result;
}

function insertNotification() {
  const newDiv = document.createElement("div");
  newDiv.className = 'circle';
  getNotify.children[0].appendChild(newDiv);

}
insertNotification();
/////////////end functions//////////////



///////////////listeners////////////

getCloseAlert.addEventListener('click', () => {

  // getAlertMessage.classList.add('shrink');
  getMessageWrapper.style.display = 'none';


});

/////////end listeners////////////



/////////////////////////////////CHARTS///////////////////////////////////////
// charts constants

const primaryColor = getColor('primary-color');
const primaryColorAlpha = getColor('primary-color-alpha');
const highlightColor = getColor('highlight-color');
const primaryColorLight = getColor('primary-color-light');

const ctxT = document.getElementById("traffic");
const ctxDT = document.getElementById("daily-traffic");
const ctxMU = document.getElementById("mobile-users");

const chartOptList = document.querySelector('.chart-opt_list');

const ranges = {
  hourly: {
    data: [8, 16, 8, 10, 8, 20, 12, 33, 24, 12, 15, 23, 12, 14],
    labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '7PM', '8PM', '9PM', '10PM'],
  },
  daily: {
    data: [167, 131, 50, 73, 120, 182, 22],
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  weekly: {
    data: [156, 600, 350, 897, 330, 502, 325, 902, 231, 200, 664, 984, 235, 535, 124, 785, 215, 451],
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
  },
  monthly: {
    data: [300, 500, 1350, 987, 730, 1202, 2325, 1902, 2031, 1200, 1664, 984, 1235, 1535, 124, 1785, 2215, 2451],
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
  },
}

function updateTrafficLine(referenceElement) {
  const tD = traffic.data;
  const range = referenceElement.textContent.toLowerCase();
  tD.datasets[0].data = ranges[range]['data'];
  tD.labels = ranges[range]['labels'];
  traffic.update();
}


chartOptList.addEventListener('click', e => {
  const listItem = e.target.parentNode;
  if (e.target.tagName === 'BUTTON' && !listItem.className.endsWith('-active')) {
    const allListItems = chartOptList.children;
    for (let i = 0; i < allListItems.length; i++) {
        allListItems[i].className = allListItems[i].className.replace(/-active$/, '');
    }
    listItem.className += '-active';

    updateTrafficLine(e.target);

  }
});


// charts functions


function MULegPosition() {
  const position = mobileUsers.options.legend.position;
  if (window.innerWidth >= 768) {
    if (position !== 'right') {
      mobileUsers.options.legend.position = 'right';
      mobileUsers.update();
    }
  } else if (position !== 'bottom') {
    mobileUsers.options.legend.position = 'bottom';
    mobileUsers.update();
  }
}

// VER
function TUChangeData(e) {
  traffic.datasets.data.target.textContent.toLowerCase()
}

Chart.defaults.global.maintainAspectRatio = false;

const traffic = new Chart(ctxT, {
  type: 'line',
  data: {

    labels: ranges['weekly']['labels'],

    datasets: [{
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: ranges['weekly']['data'],
      backgroundColor: primaryColorAlpha,
      borderColor: primaryColor,
      borderWidth: 1,
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },

  }
});


// Object.assign(traffic.data, dataMontly)
// traffic.update();

const dailyTraffic = new Chart(ctxDT, {
  type: 'bar',
  data: {
    labels: ranges['daily']['labels'],
    datasets: [{
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: ranges['daily']['data'],
      backgroundColor: primaryColor,
    }]
  },
  options: {
    legend: {
      display: false

    },
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 50,
          beginAtZero: true,
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


const mobileUsers = new Chart(ctxMU, {
  type: 'doughnut',
  data: {
    labels: ['Phones', 'Tablets', 'Desktop'],
    datasets: [{
      // label: '',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: [500, 1350, 987],
      backgroundColor: [
        highlightColor,
        primaryColor,
        primaryColorLight,
      ],
      borderWidth: 0,
    }]
  },
  options: {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 16,
      }
    },
  },
});


// events
MULegPosition();
window.addEventListener('resize', MULegPosition);

/////////////////////////////////CHARTS END///////////////////////////////////////
