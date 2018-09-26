/////////////global constants//////////////////
const getPlaceholderMessage = document.querySelector('.placeholder-message');
// const getNotifications = document.querySelector('.notifications');
// const getBellbtn = document.querySelector('#bellbtn');
const getBody = document.querySelector("BODY");
const getSettingsList = document.querySelector('.settings_list');
const getSelectTimeZone = document.querySelector('#selecttimezone');
const styleId = 'rendered-height';
const checboxNameSpace = 'checkboxSetting_';
const selectNameSpace = 'selectSetting_';
// data from https://randomuser.me/api/?results=30&nat=us&inc=name,email&seed=97303f7097649415
const usersData = {"results":[{"name":{"title":"miss","first":"marilyn","last":"patterson"},"email":"marilyn.patterson@example.com"},{"name":{"title":"miss","first":"constance","last":"gregory"},"email":"constance.gregory@example.com"},{"name":{"title":"mr","first":"troy","last":"watson"},"email":"troy.watson@example.com"},{"name":{"title":"mr","first":"alan","last":"turner"},"email":"alan.turner@example.com"},{"name":{"title":"mr","first":"jerry","last":"hoffman"},"email":"jerry.hoffman@example.com"},{"name":{"title":"mrs","first":"kathryn","last":"morris"},"email":"kathryn.morris@example.com"},{"name":{"title":"ms","first":"marlene","last":"knight"},"email":"marlene.knight@example.com"},{"name":{"title":"mrs","first":"joy","last":"coleman"},"email":"joy.coleman@example.com"},{"name":{"title":"ms","first":"felicia","last":"myers"},"email":"felicia.myers@example.com"},{"name":{"title":"mrs","first":"lucy","last":"lewis"},"email":"lucy.lewis@example.com"},{"name":{"title":"mr","first":"connor","last":"patterson"},"email":"connor.patterson@example.com"},{"name":{"title":"mr","first":"austin","last":"cox"},"email":"austin.cox@example.com"},{"name":{"title":"miss","first":"teresa","last":"lambert"},"email":"teresa.lambert@example.com"},{"name":{"title":"mrs","first":"melissa","last":"craig"},"email":"melissa.craig@example.com"},{"name":{"title":"mr","first":"franklin","last":"murray"},"email":"franklin.murray@example.com"},{"name":{"title":"ms","first":"isobel","last":"lawrence"},"email":"isobel.lawrence@example.com"},{"name":{"title":"ms","first":"alexis","last":"rivera"},"email":"alexis.rivera@example.com"},{"name":{"title":"mrs","first":"josephine","last":"ford"},"email":"josephine.ford@example.com"},{"name":{"title":"mrs","first":"addison","last":"ford"},"email":"addison.ford@example.com"},{"name":{"title":"mr","first":"russell","last":"garza"},"email":"russell.garza@example.com"},{"name":{"title":"miss","first":"charlene","last":"lowe"},"email":"charlene.lowe@example.com"},{"name":{"title":"mrs","first":"bobbie","last":"webb"},"email":"bobbie.webb@example.com"},{"name":{"title":"miss","first":"arlene","last":"west"},"email":"arlene.west@example.com"},{"name":{"title":"ms","first":"terry","last":"hicks"},"email":"terry.hicks@example.com"},{"name":{"title":"miss","first":"gertrude","last":"murray"},"email":"gertrude.murray@example.com"},{"name":{"title":"mr","first":"george","last":"sanders"},"email":"george.sanders@example.com"},{"name":{"title":"mr","first":"theodore","last":"kelley"},"email":"theodore.kelley@example.com"},{"name":{"title":"miss","first":"jennie","last":"lucas"},"email":"jennie.lucas@example.com"},{"name":{"title":"mr","first":"howard","last":"castillo"},"email":"howard.castillo@example.com"},{"name":{"title":"mr","first":"steve","last":"alvarez"},"email":"steve.alvarez@example.com"}],"info":{"seed":"97303f7097649415","results":30,"page":1,"version":"1.2"}};
///////////end global constants/////////////////



///////////////global functions/////////////////////

function populateNames(data, elemId, placeholder) {
    const section = document.getElementById(elemId);
    for(let i=0;section.innerHTML.includes(placeholder);i++) {
      const firstName = data.results[i].name.first.replace(/\b\w/g, l => l.toUpperCase());
      const lastName = data.results[i].name.last.replace(/\b\w/g, l => l.toUpperCase());
      section.innerHTML = section.innerHTML.replace(placeholder, firstName + ' ' + lastName);
    }
}
function populateEmails(data, elemId, placeholder) {
  const section = document.getElementById(elemId);
  for(let i=0;section.innerHTML.includes(placeholder);i++) {
    const email = data.results[i].email;
    section.innerHTML = section.innerHTML.replace(placeholder, email);
    section.innerHTML = section.innerHTML.replace(placeholder, email);
  }
}



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

// in order for the transiction to take effect
function internalStyleHeight(styleElem, targetElem) {
  targetElem.style.height = 'auto';
  styleElem.textContent = `
  .inner-html-height {
    height: ${getPlaceholderMessage.offsetHeight}px;
  }
  `;
  targetElem.classList.add('inner-html-height');
  targetElem.style.height = '';
}

// close notification panel if the user clicks outsite it and outside the bell. To be called in an event listener.
function hideNotifications(e) {
  if (e.target.parentNode.className !== 'notification') {
    getBody.removeEventListener('click', hideNotifications, true);
    getNotifications.style.display = 'none';
    getBellbtn.querySelector('.drawuparrow').style.display = 'none';
  }
}

// To be called in an event listener.
function showNotifications(e) {
    getNotifications.style.display = "block";
    getBellbtn.querySelector('.drawuparrow').style.display = 'block';
    getBody.addEventListener('click', hideNotifications, true);
}

function addNotifications(bellId, panelId) {
  const bell = document.getElementById(bellId);
  const panel = document.getElementById(panelId);
  const linkarrow = bell.querySelector('div:last-child');
  let firstClick = true;

  function setDisplay(value) {
    panel.style.display = value;
    linkarrow.style.display = value;
  };

  function showPanel(e) {
    if(firstClick) {
      bell.removeEventListener('click', showPanel);
      setDisplay('block')
      window.addEventListener('mousedown', hidePanel);
      panel.addEventListener('click', closeNotification);
    } else {
      firstClick = true;
    }
  }

  function hidePanel(e) {
    if(!panel.contains(e.target)) {
      if(bell.contains(e.target)) { firstClick = false };
      setDisplay('none');
      window.removeEventListener('mousedown', hidePanel);
      bell.addEventListener('click', showPanel);
      panel.removeEventListener('click', closeNotification);
    }
  }

  function closeNotification(e) {
    if(e.target.tagName == 'BUTTON') {
      panel.removeChild(e.target.parentNode);
      if(panel.children.length == 0) {
        setDisplay('none');
        window.removeEventListener('mousedown', hidePanel);
        do {
          bell.removeChild(bell.querySelector('div'));
        } while (bell.children.length > 1);
      }
    }
  }

  bell.addEventListener('click', showPanel);
}


addNotifications('bellbtn', 'notificationpanel');

function checkBoxToggle(id) {
  const checkBtn = document.querySelector(`[name='${id}']`);
  const checkInput = document.getElementById(id);
  if (checkBtn.classList.toggle('inputischecked')) {
    checkInput.setAttribute('checked', 'checked');
    localStorage.setItem(checboxNameSpace + id, 'true');
  } else {
    checkInput.removeAttribute('checked');
    localStorage.setItem(checboxNameSpace + id, 'false');
  }
}

function syncLocalStorage() {
  if (localStorage.oldVisitor) {
    for (let i = 0; i < localStorage.length; i++) {
      const keyName = localStorage.key(i);
      if (keyName.startsWith(checboxNameSpace) && localStorage[keyName] === "false") {
        const checkId = keyName.replace(checboxNameSpace, '');
        checkBoxToggle(checkId);
      }
      if (keyName.startsWith(selectNameSpace) && localStorage[keyName] !== 'none') {
        const selectId = keyName.replace(selectNameSpace, '');
        const selectElem = document.getElementById(selectId);
        selectElem.value = localStorage[keyName];
      }
    }
  } else {
    localStorage.setItem('oldVisitor', 'true');
  }
}

function addAutocomplete(id,data) {
  const textInput = document.getElementById(id);
  const autoList = document.querySelector(`[data-for='${id}']`);
  const autoListUl = autoList.children[0];
  const fullNameLis = (()=>{
    let resultArray = [];
    for(let i=0;i<data.results.length;i++) {
      const firstName = data.results[i].name.first.replace(/\b\w/g, l => l.toUpperCase());
      const lastName = data.results[i].name.last.replace(/\b\w/g, l => l.toUpperCase());
      const fullName = firstName + ' ' + lastName;
      resultArray.push(`<li>${fullName}</li>`);
    }
    return resultArray.sort();
  })();
  autoListUl.innerHTML = fullNameLis.join('');
  textInput.addEventListener('focus', (e) => {
    autoList.style.display = 'block';
    window.addEventListener('mousedown', function closeListOnMouseDown(e) {
      if (e.target != textInput && e.target != autoListUl) {
        window.removeEventListener('mousedown', closeListOnMouseDown);
        if (!autoList.contains(e.target)) {
          autoList.style.display = 'none';
        } else if (e.target.tagName === 'LI'){
            window.addEventListener('mouseup', function closeListOnMouseUp() {
            window.removeEventListener('mouseup', closeListOnMouseUp);
            textInput.value = e.target.textContent;
            autoList.style.display = 'none';
            autoList.nextElementSibling.focus();
          });
        }
      }
    });
  });
  textInput.addEventListener('keyup', e => {
      const filteredLis = fullNameLis.filter((fullName) => {
      const upperName = fullName.toUpperCase();
      const upperValue = textInput.value.toUpperCase();
      return upperName.startsWith(`<LI>${upperValue}`);
    });
    autoListUl.innerHTML = filteredLis.join('');
  });
  textInput.addEventListener('keydown', e => {
    if(e.key == 'Enter' || e.key == 'Tab') {
      e.preventDefault();
      textInput.value = autoListUl.children[0].textContent;
      autoList.style.display = 'none';
      autoList.nextElementSibling.focus();
    }
  });
}
/////////////end global functions//////////////


///////////////global listeners////////////
window.addEventListener('load', () => {
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.id = styleId;
  internalStyleHeight(styleTag, getPlaceholderMessage);
  document.querySelector('head').appendChild(styleTag);
  syncLocalStorage();
  populateNames(usersData, 'newmembers', 'Lorem ipsum');
  populateEmails(usersData, 'newmembers', 'lorem@ipsum.com');
  populateNames(usersData, 'recentactivity', 'Lorem ipsum');
  addAutocomplete('searchuser', usersData);
});

window.addEventListener('resize', () => {
  getPlaceholderMessage.style.height = 'auto';
  const styleTagById = document.getElementById(styleId);
  internalStyleHeight(styleTagById, getPlaceholderMessage);

});

// getBellbtn.addEventListener('click', showNotifications);
//
// getNotifications.addEventListener('click', (e) => {
//   if (e.target.tagName == 'BUTTON') {
//     getNotifications.removeChild(e.target.parentNode);
//     if (getNotifications.children.length == 0) {
//       getBody.removeEventListener('click', hideNotifications, true);
//       getNotifications.style.display = "none";
//       getBellbtn.querySelector('.drawcircle').style.display = 'none';
//       getBellbtn.removeEventListener('click', showNotifications);
//       getBellbtn.querySelector('.drawuparrow').style.display = 'none';
//     }
//   }
// });

getPlaceholderMessage.addEventListener('click', e => e.target.tagName == 'BUTTON' && getPlaceholderMessage.classList.add('shrink'));

getSettingsList.addEventListener('click', e => {
  e.preventDefault();
  const checkId = e.target.getAttribute('for') || e.target.getAttribute('name');
  if (checkId) {
    checkBoxToggle(checkId);
  }
});

getSelectTimeZone.addEventListener('change', () =>  localStorage.setItem(selectNameSpace + getSelectTimeZone.id, getSelectTimeZone.value));
/////////end global listeners////////////








////////////////////////////////////charts//////////////////////////////////////////
// require -> https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js //

// charts constants
const primaryColor = getColor('primary-color');
const primaryColorAlpha = getColor('primary-color-alpha');
const highlightColor = getColor('highlight-color');
const primaryColorLight = getColor('primary-color-light');
const ctxT = document.getElementById("traffic");
const ctxDT = document.getElementById("daily-traffic");
const ctxMU = document.getElementById("mobile-users");
const chartOptList = document.querySelector('.chartopt');
const ranges = {
  hourly: {
    data: [8, 16, 8, 10, 8, 20, 12, 33, 24, 12, 15, 10],
    labels: hourRange(9, 20),
  },
  daily: {
    data: [167, 131, 50, 73, 120, 182, 22, 34, 80, 78, 90, 65],
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
  },
  weekly: {
    data: [156, 600, 350, 897, 330, 502, 325, 902, 231, 200, 664, 984, 235, 535, 124, 785, 215, 451],
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31', '1-7'],
  },
  monthly: {
    data: [500, 1350, 987, 1202, 2325, 1902, 1200, 1664, 984, 1535, 124, 1785, 2451],
    labels: ['Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
};

// charts functions
function updateTrafficLine(referenceElement) {
  const tD = traffic.data;
  const range = referenceElement.textContent.toLowerCase();
  tD.datasets[0].data = ranges[range].data;
  tD.labels = ranges[range].labels;
  traffic.update();
}

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

function hourRange(start, end) {
  const hours = [];
  for (let h = start; h <= end; h++) {
    let ampmHour;
    if (h < 12) {
      ampmHour = h + 'am';
    } else if (h > 12) {
      if (h == 24) {
        ampmHour = '12am';
      } else {
        ampmHour = h - 12 + 'pm';
      }
    } else {
      ampmHour = '12pm';
    }
    hours.push(ampmHour);
  }
  return hours;
}

// charts global settings
Chart.defaults.global.maintainAspectRatio = false;

// charts settings
const traffic = new Chart(ctxT, {
  type: 'line',
  data: {

    labels: ranges.weekly.labels,

    datasets: [{
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: ranges.weekly.data,
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

const dailyTraffic = new Chart(ctxDT, {
  type: 'bar',
  data: {
    labels: ranges.daily.labels.slice(0, 7),
    datasets: [{
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      lineTension: 0,
      data: ranges.daily.data.slice(0, 7),
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


// charts events
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
window.addEventListener('resize', MULegPosition);
window.addEventListener('load', MULegPosition);
/////////////////////////////////charts end///////////////////////////////////////
