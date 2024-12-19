(function () {
  let weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let indicatorsIncome = [

    {
      id: 1,
      title: 'Выручка, руб',
      currentDay: 500521,
      yesterday: 480521,
      dayOfWeek: 4805121,
      compose: [
        {
          id: 2,
          title: 'Наличные',
          currentDay: 300000,
          yesterday: 300000,
          dayOfWeek: 300000,
        },
        {
          id: 3,
          title: 'Безналичный расчет',
          currentDay: 100000,
          yesterday: 100000,
          dayOfWeek: 100000,
        },
        {
          id: 4,
          title: 'Кредитные карты',
          currentDay: 100521,
          yesterday: 100521,
          dayOfWeek: 100521,
        }
      ]
    },
    {
      id: 5,
      title: 'Средний чек, руб',
      currentDay: 1300,
      yesterday: 900,
      dayOfWeek: 900
    },
    {
      id: 6,
      title: 'Средний гость, руб',
      currentDay: 1200,
      yesterday: 800,
      dayOfWeek: 800
    },
    {
      id: 7,
      title: 'Удаление из чека после оплаты, руб',
      currentDay: 1000,
      yesterday: 1100,
      dayOfWeek: 900
    },
    {
      id: 8,
      title: 'Удаление из чека до оплаты, руб',
      currentDay: 1300,
      yesterday: 1300,
      dayOfWeek: 900
    },
    {
      id: 9,
      title: 'Количество чеков, руб',
      currentDay: 34,
      yesterday: 36,
      dayOfWeek: 34
    },
    {
      id: 10,
      title: 'Количество гостей',
      currentDay: 34,
      yesterday: 36,
      dayOfWeek: 32
    }
  ];
  let chartsData = [
    {
      id: 1,
      data: [43934, 486546, 65165, 81827, 1142143, 142383, 171533]
    },
    {
      id: 2,
      data: [43934, 48656, 65165, 81827, 11243, 142383, 171533]
    },
    {
      id: 3,
      data: [43934, 4656, 65165, 81827, 112143, 14283, 171333]
    },
    {
      id: 4,
      data: [43934, 48556, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 5,
      data: [439534, 48656, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 6,
      data: [43934, 4856, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 7,
      data: [43934, 48656, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 8,
      data: [43934, 48656, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 9,
      data: [43934, 48656, 65165, 81827, 112143, 142383, 171533]
    },
    {
      id: 10,
      data: [43934, 48656, 65165, 81827, 112143, 142383, 171533]
    },
    ];

  let createNewElement = function (tag, classes, content) {
    let element = document.createElement(tag);

    if (classes) {
      for (let classOfElement of classes) {

        element.classList.add(classOfElement);
      }

    }
    if (content) {
      element.textContent = content;
    }
    return element;
  }

  let createAppTitle = function (title) {
    let appTitle = createNewElement('h1', '', title);
    return appTitle;
  };


  let createTable = function () {

    let table = createNewElement('table');
    let tbody = createNewElement('tbody');
    let headerTable = createThead(['Показатель', 'Текущий день', 'Вчера', 'Этот день недели']);

    table.append(headerTable);
    table.append(tbody);
    table.classList.add('table');

    return table;
  }
  let createThead = function (headers) {
    let headerTable = createNewElement('thead');
    let headerLine = createNewElement('tr');

    for (let i = 0; i < headers.length; i++) {
      let element = createNewElement('th', '', headers[i]);
      element.classList.add('header__col');
      headerLine.append(element);
    }
    headerLine.classList.add('table__row', 'header');
    headerTable.append(headerLine);
    return headerTable;
  }

  let createItem = function (indicators, compose) {
    let item = createNewElement('tr', ['table__row', 'row']);

    let title = createNewElement('td', ['row__col', 'row-title'], indicators.title);
    let currentDay = createNewElement('td', ['row__col', 'current-day'], indicators.currentDay);
    let yesterday = createNewElement('td', ['row__col', 'yesterday'], indicators.yesterday);
    let dayOfWeek = createNewElement('td', ['row__col', 'day-of-week'], indicators.dayOfWeek);

    if (compose) {
      item.classList.add('compose', 'hide');
    }
    item.append(title);
    item.append(currentDay);
    item.append(yesterday);
    item.append(dayOfWeek);
    
    item.addEventListener('click', event => openCloseChart(event, item, indicators));

    return item;
  };

  openCompose = function (item) {
    
    let current = item.nextElementSibling;
    
    if (!current) return;
    while (current.classList.contains('compose')) {
      console.log(current.classList)
      current.classList.toggle('hide');
      current = current.nextElementSibling;
    }
    
  };

  let openCloseChart = function (e, item, properties) {
    let chartExist = document.querySelector('#chart-' + properties.id);
    
    if (chartExist) {
      console.log(chartExist.classList);
      const rowChart = chartExist.closest('.row-chart');
      rowChart.classList.toggle('opened-chart');
      openCompose(rowChart);
      return;
    }

    openCompose(item);
    let itemChart = createNewElement('tr', ['table__row', 'row', 'row-chart']);
    let itemColChart = createNewElement('td');

    itemColChart.colSpan = 4;
    itemColChart.id = 'chart-' + properties.id;
    itemChart.append(itemColChart);
    itemChart.classList.toggle('opened-chart');

    item.after(itemChart);
    
    drawChart(properties);
    
  };


  let getWeekDays = function() {
    let date = new Date();
    let current = date.getDay();
    let listDays = weekdays.slice(0, current + 1);
    let listDays2 = weekdays.slice(current + 1, 7);
    
    let arrResult = listDays2.concat(listDays);
    
    return arrResult;
  }

  let drawChart = function (properties) {
    
    let points = [];
    for (let element of chartsData) {
      if (element.id === properties.id) {
        console.log(element.data);
        points = element.data;
        break;
      }
    }

    let container = 'chart-' + properties.id;
    

    Highcharts.chart(container, {

      legend: {
        enabled: false
      },

      yAxis: {
        title: {
          text: properties.title
        },        
      },

      xAxis: {
        title: {
          text: 'Дни недели'
        },
        categories: getWeekDays()
      },


      series: [{
        data: points
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
            }
          }
        }]
      }

    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    let container = document.getElementById('income-app');

    let appTitle = createAppTitle('Показатели прибыли');
    container.append(appTitle);

    let table = createTable();

    let tbody = table.querySelector('tbody');

    for (let i = 0; i < indicatorsIncome.length; i++) {
      let itemLine = createItem(indicatorsIncome[i]);

      tbody.append(itemLine);
      let compose = indicatorsIncome[i].compose;
      if (compose) {
        for (let j = 0; j < compose.length; j++) {
          let itemCompose = createItem(compose[j], true);
          tbody.append(itemCompose);
        }
      }
    }
    container.append(table);

    // console.log(Highcharts);



  });

})();
