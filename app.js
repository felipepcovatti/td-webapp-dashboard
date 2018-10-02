/////////////global constants//////////////////
const getBody = document.querySelector("BODY");
const getPlaceholderMessage = document.querySelector('.placeholder-message');
const getMessageUser = document.getElementById('messageuserform');
const getSettingsList = document.querySelector('.settings_list');
const getSelectTimeZone = document.querySelector('#selecttimezone');
const alertStyleId = 'alert-height';
const checboxNameSpace = 'checkboxSetting_';
const selectNameSpace = 'selectSetting_';
const primaryColor = getColor('primary-color');
const primaryColorAlpha = getColor('primary-color-alpha');
const highlightColor = getColor('highlight-color');
const primaryColorLight = getColor('primary-color-light');
const customGrayBg = getColor('custom-gray-bg');

// data from https://randomuser.me/api/?results=30&nat=us&inc=name,email&seed=97303f7097649415
const usersData = {"results":[{"name":{"title":"miss","first":"marilyn","last":"patterson"},"email":"marilyn.patterson@example.com"},{"name":{"title":"miss","first":"constance","last":"gregory"},"email":"constance.gregory@example.com"},{"name":{"title":"mr","first":"troy","last":"watson"},"email":"troy.watson@example.com"},{"name":{"title":"mr","first":"alan","last":"turner"},"email":"alan.turner@example.com"},{"name":{"title":"mr","first":"jerry","last":"hoffman"},"email":"jerry.hoffman@example.com"},{"name":{"title":"mrs","first":"kathryn","last":"morris"},"email":"kathryn.morris@example.com"},{"name":{"title":"ms","first":"marlene","last":"knight"},"email":"marlene.knight@example.com"},{"name":{"title":"mrs","first":"joy","last":"coleman"},"email":"joy.coleman@example.com"},{"name":{"title":"ms","first":"felicia","last":"myers"},"email":"felicia.myers@example.com"},{"name":{"title":"mrs","first":"lucy","last":"lewis"},"email":"lucy.lewis@example.com"},{"name":{"title":"mr","first":"connor","last":"patterson"},"email":"connor.patterson@example.com"},{"name":{"title":"mr","first":"austin","last":"cox"},"email":"austin.cox@example.com"},{"name":{"title":"miss","first":"teresa","last":"lambert"},"email":"teresa.lambert@example.com"},{"name":{"title":"mrs","first":"melissa","last":"craig"},"email":"melissa.craig@example.com"},{"name":{"title":"mr","first":"franklin","last":"murray"},"email":"franklin.murray@example.com"},{"name":{"title":"ms","first":"isobel","last":"lawrence"},"email":"isobel.lawrence@example.com"},{"name":{"title":"ms","first":"alexis","last":"rivera"},"email":"alexis.rivera@example.com"},{"name":{"title":"mrs","first":"josephine","last":"ford"},"email":"josephine.ford@example.com"},{"name":{"title":"mrs","first":"addison","last":"ford"},"email":"addison.ford@example.com"},{"name":{"title":"mr","first":"russell","last":"garza"},"email":"russell.garza@example.com"},{"name":{"title":"miss","first":"charlene","last":"lowe"},"email":"charlene.lowe@example.com"},{"name":{"title":"mrs","first":"bobbie","last":"webb"},"email":"bobbie.webb@example.com"},{"name":{"title":"miss","first":"arlene","last":"west"},"email":"arlene.west@example.com"},{"name":{"title":"ms","first":"terry","last":"hicks"},"email":"terry.hicks@example.com"},{"name":{"title":"miss","first":"gertrude","last":"murray"},"email":"gertrude.murray@example.com"},{"name":{"title":"mr","first":"george","last":"sanders"},"email":"george.sanders@example.com"},{"name":{"title":"mr","first":"theodore","last":"kelley"},"email":"theodore.kelley@example.com"},{"name":{"title":"miss","first":"jennie","last":"lucas"},"email":"jennie.lucas@example.com"},{"name":{"title":"mr","first":"howard","last":"castillo"},"email":"howard.castillo@example.com"},{"name":{"title":"mr","first":"steve","last":"alvarez"},"email":"steve.alvarez@example.com"}],"info":{"seed":"97303f7097649415","results":30,"page":1,"version":"1.2"}};
///////////end global constants/////////////////



///////////////global functions/////////////////////
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

function populateNames(data, elemId, placeholder) {
    const section = document.getElementById(elemId);
    for(let i=0;section.innerHTML.includes(placeholder);i++) {
      const firstName = data.results[i].name.first.replace(/\b\w/g, l => l.toUpperCase());
      const lastName = data.results[i].name.last.replace(/\b\w/g, l => l.toUpperCase());
      section.innerHTML = section.innerHTML.replace(placeholder, firstName + ' ' + lastName);
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

// in order for the transiction to take effect
function internalStyleHeight(styleElemId, targetElem) {
  let styleElem = document.getElementById(styleElemId);
  if(!styleElem) {
    const newStyleElem = document.createElement('style');
    newStyleElem.type = 'text/css';
    newStyleElem.id = styleElemId;
    document.querySelector('head').appendChild(newStyleElem);
    styleElem = newStyleElem;
  }
  targetElem.style.height = 'auto';
  styleElem.textContent = `
  .${styleElemId} {
    height: ${targetElem.offsetHeight}px;
  }
  `;
  targetElem.classList.add(styleElemId);
  targetElem.style.height = '';
}

function addNotifications(bellId, panelId) {
  const bell = document.getElementById(bellId);
  const panel = document.getElementById(panelId);
  const linkarrow = bell.querySelector('span:last-child');
  let firstClick = true;

  function setDisplay(value) {
    panel.style.display = value;
    linkarrow.style.display = value;
  }

  function showPanel(e) {
    if(firstClick) {
      bell.removeEventListener('click', showPanel);
      setDisplay('block');
      window.addEventListener('mousedown', hidePanel);
      panel.addEventListener('click', closeNotification);
    } else {
      firstClick = true;
    }
  }

  function hidePanel(e) {
    if(!panel.contains(e.target)) {
      if(bell.contains(e.target)) firstClick = false;
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
          bell.removeChild(bell.querySelector('span'));
        } while (bell.children.length > 1);
      }
    }
  }

  bell.addEventListener('click', showPanel);

}

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

function handleMessageUser(form, data) {
  const input = form.querySelector('input');
  const textarea = form.querySelector('textarea');
  const autoList = form.querySelector(`[data-for='${input.id}']`);
  const autoListUl = autoList.children[0];
  const selectedLiId = 'selecteduser';
  const fullNameLis = (() => {
    let resultArray = [];
    for (let i = 0; i < data.results.length; i++) {
      const firstName = data.results[i].name.first.replace(/\b\w/g, l => l.toUpperCase());
      const lastName = data.results[i].name.last.replace(/\b\w/g, l => l.toUpperCase());
      const fullName = firstName + ' ' + lastName;
      resultArray.push(`<li>${fullName}</li>`);
    }
    return resultArray.sort();
  })();
  const sendBtn = form.querySelector("[type='submit']");
  const feedback = form.parentNode.querySelector(`[data-for='${form.id}']`);

  function filterOptions() {
    let filteredLis = [];
    if(input.value) {
      filteredLis = fullNameLis.filter((fullName) => {
        const upperName = fullName.toUpperCase();
        const upperValue = input.value.toUpperCase();
        return upperName.startsWith(`<LI>${upperValue}`);
      });
      autoListUl.innerHTML = filteredLis.join('');
      if(autoListUl.children[0]) autoListUl.children[0].id = selectedLiId;
    } else {
      autoListUl.innerHTML = fullNameLis.join('');
    }

  }

  function closeAndGoToNext(selected = true) {
    autoList.style.display = 'none';
    if(selected) input.style.backgroundColor = customGrayBg;
    autoList.nextElementSibling.focus();
  }

  autoListUl.innerHTML = fullNameLis.join('');
  input.addEventListener('focus', e => {
    autoList.style.display = 'block';
    input.style.backgroundColor = 'initial';
    filterOptions();
    autoListUl.scrollTop = 0;
    window.addEventListener('mousedown', function closeListOnMouseDown(e) {
      if (e.target != input && e.target != autoListUl) {
        window.removeEventListener('mousedown', closeListOnMouseDown);
        if (!autoList.contains(e.target)) {
          autoList.style.display = 'none';
          if (autoListUl.children.length > 0 && input.value.toUpperCase() == autoListUl.children[0].textContent.toUpperCase()) {
            input.style.backgroundColor = customGrayBg;
            input.value = autoListUl.children[0].textContent;
          }
        } else if (e.target.tagName === 'LI') {
            window.addEventListener('mouseup', function closeListOnMouseUp() {
            window.removeEventListener('mouseup', closeListOnMouseUp);
            input.value = e.target.textContent;
            closeAndGoToNext();
          });
        }
      }
    });
  });
  input.addEventListener('keyup', e=>{
    if(e.keyCode != 13 && e.keyCode != 9 && e.keyCode != 40 && e.keyCode != 38) {
      filterOptions();
    }
  });
  input.addEventListener('keydown', e => {

    if(autoListUl.children[0]) {
      const currentLi = autoListUl.querySelector('#' + selectedLiId);
      switch (e.keyCode) {
        case 13: //enter
        case 9: //tab
        e.preventDefault();
        if(currentLi) {
          input.value = currentLi.textContent;
          closeAndGoToNext();
        } else {
          closeAndGoToNext(false);
        }

          break;
        case 40: //arrowdown
        e.preventDefault();
        if(currentLi) {
          const nextLi = currentLi.nextElementSibling;
          if(nextLi) {
            currentLi.removeAttribute('id');
            nextLi.id = selectedLiId;
            if((nextLi.offsetTop + nextLi.offsetHeight) >  autoListUl.offsetHeight + autoListUl.scrollTop) {
              autoListUl.scrollTop = nextLi.offsetTop - (autoListUl.offsetHeight - nextLi.offsetHeight);
            }
          }
        } else {
          autoListUl.children[0].id = selectedLiId;
        }
          break;
        case 38:
        e.preventDefault();
        if(currentLi.previousElementSibling) {
          const previousLi = currentLi.previousElementSibling;
          currentLi.removeAttribute('id');
          currentLi.previousElementSibling.id = selectedLiId;
          if(previousLi.offsetTop < autoListUl.scrollTop) {
            autoListUl.scrollTop = previousLi.offsetTop;
          }
        }
          break;
      }
    }
  });
  autoListUl.addEventListener('mouseover', (e)=>{
    if(e.target.tagName == 'LI') {
      const currentLi = autoListUl.querySelector('#' + selectedLiId);
      if(currentLi) currentLi.removeAttribute("id");
      e.target.id = selectedLiId;
    }
  });
  autoListUl.addEventListener('mouseleave', e=>{
    const currentLi = autoListUl.querySelector('#' + selectedLiId);
    if(currentLi) currentLi.removeAttribute("id");
    if(input.value) {
      autoListUl.children[0].id = selectedLiId;
    }
  });

  sendBtn.addEventListener('click', e => {
    const span = document.createElement('span');
    const next = feedback.nextElementSibling;
    function closeTip(e) {
      e.target.removeEventListener('keydown', closeTip);
      e.target.removeEventListener('blur', closeTip);
      form.removeChild(span);
    }
    function makeTip(field, text) {
      span.style.top = field.offsetTop + 'px';
      span.textContent = text;
      field.focus();
      field.addEventListener('keydown', closeTip);
      field.addEventListener('blur', closeTip);
    }
    function closeFeedback(e) {
      e.preventDefault();
      if (e.target.tagName == "BUTTON") {
        feedback.classList.remove('success');
        span.innerHTML = '';
        feedback.removeEventListener('click', closeFeedback);
        next.style.marginTop = '';
      }
    }
    e.preventDefault();
    if(feedback.children.length === 2) {
      feedback.removeChild(feedback.children[0]);
    }
    if (input.style.backgroundColor != customGrayBg || textarea.value == '') {
      form.appendChild(span);
      span.className = 'formtip';
      if (input.style.backgroundColor != customGrayBg) {
        makeTip(input, 'Please, select a user');
      } else {
        makeTip(textarea, 'Please, type your message');
      }
    } else {
      feedback.insertBefore(span, feedback.children[0]);
      feedback.classList.add('success');
      span.innerHTML = `<b>Success</b> Message sent to ${input.value}`;
      next.style.marginTop = feedback.offsetHeight + parseInt(window.getComputedStyle(feedback).getPropertyValue('margin-bottom'), 10) + 'px';
      feedback.addEventListener('click', closeFeedback);
      input.value = '';
      textarea.value = '';
    }
  });
}

/////////////end global functions//////////////


///////////////global listeners////////////

window.addEventListener('load', () => {
  internalStyleHeight(alertStyleId, getPlaceholderMessage);
  syncLocalStorage();
  addNotifications('bellbtn', 'notificationpanel');
  populateNames(usersData, 'newmembers', 'Lorem ipsum');
  populateEmails(usersData, 'newmembers', 'lorem@ipsum.com');
  populateNames(usersData, 'recentactivity', 'Lorem ipsum');
  handleMessageUser(getMessageUser, usersData);
});

function alertListener() {
  internalStyleHeight(alertStyleId,getPlaceholderMessage);
}

window.addEventListener('resize', alertListener);

getPlaceholderMessage.addEventListener('click', e => {
  if (e.target.tagName == 'BUTTON') {
    getPlaceholderMessage.classList.add('shrink');
    window.removeEventListener('resize', alertListener);
    document.getElementById(alertStyleId).parentNode.removeChild(document.getElementById(alertStyleId));
  }
});

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
    data: [156, 350, 897, 330, 502, 325, 231, 664, 535, 785, 215, 451],
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31', '1-7'],
  },
  monthly: {
    data: [500, 1350, 987, 1202, 2325, 1902, 1200, 1664, 984, 1535, 1785, 2451],
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
    }
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
    }
  }
});


// charts listeners
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
