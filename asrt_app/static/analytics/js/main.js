
(function ($) {
  // USE STRICT
  "use strict";
  const monthsNamesDict = { 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec", 1: "Jan", 2: "Feb", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August" }
  const daysNamesDict = { 1: "Sun", 2: "Mon", 3: "Tues", 4: "Wed", 5: "Thurs", 6: "Fri", 7: "Sat" }

  function getPastSevenMonths() {
    var day = new Date();
    var month = day.getMonth() + 1;
    let monthsInts = [];
    let monthsNames = [];
    for (var i = 0; i < 7; i++) {
      if (month < 1) {
        month = 12
      }
      monthsInts.push(month)
      month = month - 1;
    }
    monthsNames = monthsInts.map(x => monthsNamesDict[x]);
    return monthsNames;
  }

  function getPastSevenDays() {
    var today = new Date();
    var day = today.getDay() + 1;
    let daysInts = [];
    let daysNames = [];
    for (var i = 0; i < 7; i++) {
      if (day < 1) {
        day = 7
      }
      daysInts.push(day)
      day = day - 1;
    }
    daysNames = daysInts.map(x => daysNamesDict[x]);
    return daysNames;
  }


  function getCountOfCasesPerMonth(month_X, data) {
    var today = new Date();
    var year = today.getFullYear();
    let count = 0;
    for (var i = 0; i < data.length; i++) {
      let dataPoint = data[i];
      let dataTime = new Date(dataPoint.date);
      if (dataTime.getFullYear() == year) {
        if (month_X == monthsNamesDict[dataTime.getMonth() + 1]) {
          count += 1;
        }
      }
    }
    return count;

  }

  function getCountOfCasesPerDay(day_X, data) {
    var day_of_interest = new Date(day_X).getDate();
    let count = 0;
    for (var i = 0; i < data.length; i++) {
      let dataPoint = data[i];
      let dataTime = new Date(dataPoint.date);
      if (dataTime.getDate() == day_of_interest) {
        count += 1;

      }
    }
    return count;

  }

  let pastSevenMonths = getPastSevenMonths();

  // fetchDataOnClick();
  //cases Ajax
  function fetchDataOnClick(){
    $.getJSON("/api/get", function (data) {
      var jsonData = JSON.parse(data).reverse();
  
      let incomingData = [];
      for (var i = 0; i < jsonData.length; i++) {
        incomingData.push(jsonData[i]["fields"]);
      }
      incoming_cases_chart.data.datasets[0].data = [getCountOfCasesPerMonth(pastSevenMonths[0], incomingData), getCountOfCasesPerMonth(pastSevenMonths[1], incomingData), getCountOfCasesPerMonth(pastSevenMonths[2], incomingData), getCountOfCasesPerMonth(pastSevenMonths[3], incomingData), getCountOfCasesPerMonth(pastSevenMonths[4], incomingData), getCountOfCasesPerMonth(pastSevenMonths[5], incomingData), getCountOfCasesPerMonth(pastSevenMonths[6], incomingData)].reverse();
      incoming_cases_chart.update();
  
      var today = new Date();
      cases_daily_chart.data.datasets[0].data = [getCountOfCasesPerDay(today, incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 1), incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 2), incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 3), incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 4), incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 5), incomingData), getCountOfCasesPerDay(today.setDate(today.getDate() - 6), incomingData)].reverse();
      cases_daily_chart.update();
      var arr = cases_daily_chart.data.datasets[0].data;
      var sum = arr.reduce(function (a, b) { return a + b; }, 0);
      $("#casesTodayChartHeader").text(sum)
    });
  
    //Alerts Ajax
    $.getJSON("/api/getalerts", function (data) {
      var jsonData = JSON.parse(data).reverse();
  
      let incomingData = [];
      for (var i = 0; i < jsonData.length; i++) {
        incomingData.push(jsonData[i]["fields"]);
      }
      incoming_alerts_chart.data.datasets[0].data = [getCountOfCasesPerMonth(pastSevenMonths[0], incomingData), getCountOfCasesPerMonth(pastSevenMonths[1], incomingData), getCountOfCasesPerMonth(pastSevenMonths[2], incomingData), getCountOfCasesPerMonth(pastSevenMonths[3], incomingData), getCountOfCasesPerMonth(pastSevenMonths[4], incomingData), getCountOfCasesPerMonth(pastSevenMonths[5], incomingData), getCountOfCasesPerMonth(pastSevenMonths[6], incomingData)].reverse();;
      incoming_alerts_chart.update();
  
    });
  }
  

  try {
    //WidgetChart 1
    var ctx = document.getElementById("widgetChart1");
    if (ctx) {
      ctx.height = 130;
      var incoming_cases_chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: getPastSevenMonths().reverse(),
          type: 'line',
          datasets: [{
            data: [296, 314, 201, 415, 501, 555],
            label: 'Dataset',
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 0
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }


    //WidgetChart 2
    var ctx = document.getElementById("widgetChart2");
    if (ctx) {
      ctx.height = 130;
      var incoming_alerts_chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: getPastSevenMonths().reverse(),
          type: 'line',
          datasets: [{
            data: [15, 7, 22, 9, 65, 12],
            label: 'Dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {

          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              tension: 0.00001,
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }


    //WidgetChart 3
    var ctx = document.getElementById("widgetChart3");
    if (ctx) {
      ctx.height = 130;
      var cases_daily_chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: getPastSevenDays().reverse(),
          type: 'line',
          datasets: [{
            data: [10, 14, 31, 15, 26, 17],
            label: 'Dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {

          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }


    //WidgetChart 4
    var ctx = document.getElementById("widgetChart4");
    if (ctx) {
      ctx.height = 115;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: "My First dataset",
              data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "rgba(255,255,255,.3)"
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }

    // Recent Report
    const brandProduct = 'rgba(0,181,233,0.8)'
    const brandService = 'rgba(0,173,95,0.8)'

    var elements = 10
    var cases = [325, 512, 444, 260, 296, 314, 201, 415, 501, 555]
    var alerts = [19, 21, 23, 12, 15, 7, 22, 9, 65, 12]

    var ctx = document.getElementById("recent-rep-chart");
    if (ctx) {
      ctx.height = 250;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Cases',
              backgroundColor: brandService,
              borderColor: 'transparent',
              pointHoverBackgroundColor: brandService,
              borderWidth: 0,
              data: cases

            },
            {
              label: 'Alerts',
              backgroundColor: brandProduct,
              borderColor: 'black',
              pointHoverBackgroundColor: brandProduct,
              borderWidth: 0,
              data: alerts

            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: true,
                color: '#f2f2f2'
              },
              ticks: {
                fontFamily: "Poppins",
                fontSize: 12
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: 150,
                max: 900,
                fontFamily: "Poppins",
                fontSize: 12
              },
              gridLines: {
                display: true,
                color: '#f2f2f2'

              }
            }]
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3
            }
          }


        }
      });
    }

    // Percent Chart
    var ctx = document.getElementById("percent-chart");
    if (ctx) {
      ctx.height = 280;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: "My First dataset",
              data: [33, 67],
              backgroundColor: [
                '#00b5e9',
                '#fa4251'
              ],
              hoverBackgroundColor: [
                '#00b5e9',
                '#fa4251'
              ],
              borderWidth: [
                0, 0
              ],
              hoverBorderColor: [
                'transparent',
                'transparent'
              ]
            }
          ],
          labels: [
            'Open',
            'Closed'
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutoutPercentage: 55,
          animation: {
            animateScale: true,
            animateRotate: true
          },
          legend: {
            display: false
          },
          tooltips: {
            titleFontFamily: "Poppins",
            xPadding: 15,
            yPadding: 10,
            caretPadding: 0,
            bodyFontSize: 16
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }










  try {

    // Recent Report 2
    const bd_brandProduct2 = 'rgba(0,181,233,0.9)'
    const bd_brandService2 = 'rgba(0,173,95,0.9)'
    const brandProduct2 = 'rgba(0,181,233,0.2)'
    const brandService2 = 'rgba(0,173,95,0.2)'

    var data3 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115]
    var data4 = [102, 70, 80, 100, 56, 53, 80, 75, 65, 90]

    var ctx = document.getElementById("recent-rep2-chart");
    if (ctx) {
      ctx.height = 230;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', ''],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: brandService2,
              borderColor: bd_brandService2,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 0,
              data: data3

            },
            {
              label: 'My Second dataset',
              backgroundColor: brandProduct2,
              borderColor: bd_brandProduct2,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 0,
              data: data4

            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: true,
                color: '#f2f2f2'
              },
              ticks: {
                fontFamily: "Poppins",
                fontSize: 12
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: 50,
                max: 150,
                fontFamily: "Poppins",
                fontSize: 12
              },
              gridLines: {
                display: true,
                color: '#f2f2f2'

              }
            }]
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3
            },
            line: {
              tension: 0
            }
          }


        }
      });
    }

  } catch (error) {
    console.log(error);
  }


  try {

    // Recent Report 3
    const bd_brandProduct3 = 'rgba(0,181,233,0.9)';
    const bd_brandService3 = 'rgba(0,173,95,0.9)';
    const brandProduct3 = 'transparent';
    const brandService3 = 'transparent';

    var data5 = [52, 60, 55, 50, 65, 80, 57, 115];
    var data6 = [102, 70, 80, 100, 56, 53, 80, 90];

    var ctx = document.getElementById("recent-rep3-chart");
    if (ctx) {
      ctx.height = 230;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', ''],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: brandService3,
              borderColor: bd_brandService3,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 0,
              data: data5,
              pointBackgroundColor: bd_brandService3
            },
            {
              label: 'My Second dataset',
              backgroundColor: brandProduct3,
              borderColor: bd_brandProduct3,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 0,
              data: data6,
              pointBackgroundColor: bd_brandProduct3

            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: true,
                color: '#f2f2f2'
              },
              ticks: {
                fontFamily: "Poppins",
                fontSize: 12
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: 50,
                max: 150,
                fontFamily: "Poppins",
                fontSize: 12
              },
              gridLines: {
                display: false,
                color: '#f2f2f2'
              }
            }]
          },
          elements: {
            point: {
              radius: 3,
              hoverRadius: 4,
              hoverBorderWidth: 3,
              backgroundColor: '#333'
            }
          }


        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  try {
    //WidgetChart 5
    var ctx = document.getElementById("widgetChart5");
    if (ctx) {
      ctx.height = 220;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: "My First dataset",
              data: [78, 81, 80, 64, 65, 80, 70, 75, 67, 85, 66, 68],
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "#ccc",
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false
            }]
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  try {

    // Percent Chart 2
    var ctx = document.getElementById("percent-chart2");
    if (ctx) {
      ctx.height = 209;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: "My First dataset",
              data: [60, 40],
              backgroundColor: [
                '#00b5e9',
                '#fa4251'
              ],
              hoverBackgroundColor: [
                '#00b5e9',
                '#fa4251'
              ],
              borderWidth: [
                0, 0
              ],
              hoverBorderColor: [
                'transparent',
                'transparent'
              ]
            }
          ],
          labels: [
            'Open',
            'Closed'
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutoutPercentage: 87,
          animation: {
            animateScale: true,
            animateRotate: true
          },
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              fontSize: 14,
              fontFamily: "Poppins,sans-serif"
            }

          },
          tooltips: {
            titleFontFamily: "Poppins",
            xPadding: 15,
            yPadding: 10,
            caretPadding: 0,
            bodyFontSize: 16,
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  try {
    //Sales chart
    var ctx = document.getElementById("sales-chart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["2011", "2012", "2013", "2014", "2015", "2017", "2018"],
          type: 'line',
          defaultFontFamily: 'Poppins',
          datasets: [{
            label: "Alerts",
            data: [99, 112, 156, 193, 176, 188, 213],
            backgroundColor: 'transparent',
            borderColor: 'rgba(220,53,69,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(220,53,69,0.75)',
          }, {
            label: "Cases",
            data: [3321, 4012, 4576, 4536, 4667, 4873, 5012],
            backgroundColor: 'transparent',
            borderColor: 'rgba(40,167,69,0.75)',
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(40,167,69,0.75)',
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Poppins',
            bodyFontFamily: 'Poppins',
            cornerRadius: 3,
            intersect: false,
          },
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
              fontFamily: 'Poppins',
            },
          },
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              scaleLabel: {
                display: false,
                labelString: 'Month'
              },
              ticks: {
                fontFamily: "Poppins"
              }
            }],
            yAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Value',
                fontFamily: "Poppins"

              },
              ticks: {
                fontFamily: "Poppins"
              }
            }]
          },
          title: {
            display: false,
            text: 'Normal Legend'
          }
        }
      });
    }


  } catch (error) {
    console.log(error);
  }

  try {

    //Team chart
    var ctx = document.getElementById("team-chart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["2011", "2012", "2013", "2014", "2015", "2017", "2018"],
          type: 'line',
          defaultFontFamily: 'Poppins',
          datasets: [{
            data: [0.5, 0.55, 0.67, 0.58, 0.72, 0.73, 0.77],
            label: "Expense",
            backgroundColor: 'rgba(0,103,255,.15)',
            borderColor: 'rgba(0,103,255,0.5)',
            borderWidth: 3.5,
            pointStyle: 'circle',
            pointRadius: 5,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(0,103,255,0.5)',
          },]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Poppins',
            bodyFontFamily: 'Poppins',
            cornerRadius: 3,
            intersect: false,
          },
          legend: {
            display: false,
            position: 'top',
            labels: {
              usePointStyle: true,
              fontFamily: 'Poppins',
            },


          },
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              scaleLabel: {
                display: false,
                labelString: 'Month'
              },
              ticks: {
                fontFamily: "Poppins"
              }
            }],
            yAxes: [{
              display: true,
              gridLines: {
                display: false,
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Value',
                fontFamily: "Poppins"
              },
              ticks: {
                fontFamily: "Poppins"
              }
            }]
          },
          title: {
            display: false,
          }
        }
      });
    }


  } catch (error) {
    console.log(error);
  }

  try {
    //bar chart
    var ctx = document.getElementById("barChart");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'bar',
        defaultFontFamily: 'Poppins',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              data: [65, 59, 80, 81, 56, 55, 40],
              borderColor: "rgba(0, 123, 255, 0.9)",
              borderWidth: "0",
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              fontFamily: "Poppins"
            },
            {
              label: "My Second dataset",
              data: [28, 48, 40, 19, 86, 27, 90],
              borderColor: "rgba(0,0,0,0.09)",
              borderWidth: "0",
              backgroundColor: "rgba(0,0,0,0.07)",
              fontFamily: "Poppins"
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: "Poppins"

              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontFamily: "Poppins"
              }
            }]
          }
        }
      });
    }


  } catch (error) {
    console.log(error);
  }

  try {

    //radar chart
    var ctx = document.getElementById("radarChart");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
          defaultFontFamily: 'Poppins',
          datasets: [
            {
              label: "My First dataset",
              data: [65, 59, 66, 45, 56, 55, 40],
              borderColor: "rgba(0, 123, 255, 0.6)",
              borderWidth: "1",
              backgroundColor: "rgba(0, 123, 255, 0.4)"
            },
            {
              label: "My Second dataset",
              data: [28, 12, 40, 19, 63, 27, 87],
              borderColor: "rgba(0, 123, 255, 0.7",
              borderWidth: "1",
              backgroundColor: "rgba(0, 123, 255, 0.5)"
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          scale: {
            ticks: {
              beginAtZero: true,
              fontFamily: "Poppins"
            }
          }
        }
      });
    }

  } catch (error) {
    console.log(error)
  }

  try {

    //line chart
    var ctx = document.getElementById("lineChart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          defaultFontFamily: "Poppins",
          datasets: [
            {
              label: "My First dataset",
              borderColor: "rgba(0,0,0,.09)",
              borderWidth: "1",
              backgroundColor: "rgba(0,0,0,.07)",
              data: [22, 44, 67, 43, 76, 45, 12]
            },
            {
              label: "My Second dataset",
              borderColor: "rgba(0, 123, 255, 0.9)",
              borderWidth: "1",
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              pointHighlightStroke: "rgba(26,179,148,1)",
              data: [16, 32, 18, 26, 42, 33, 44]
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: "Poppins"

              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontFamily: "Poppins"
              }
            }]
          }

        }
      });
    }


  } catch (error) {
    console.log(error);
  }


  try {

    //doughut chart
    var ctx = document.getElementById("doughutChart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
              "rgba(0, 123, 255,0.9)",
              "rgba(0, 123, 255,0.7)",
              "rgba(0, 123, 255,0.5)",
              "rgba(0,0,0,0.07)"
            ],
            hoverBackgroundColor: [
              "rgba(0, 123, 255,0.9)",
              "rgba(0, 123, 255,0.7)",
              "rgba(0, 123, 255,0.5)",
              "rgba(0,0,0,0.07)"
            ]

          }],
          labels: [
            "Green",
            "Green",
            "Green",
            "Green"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }


  } catch (error) {
    console.log(error);
  }


  try {

    //pie chart
    var ctx = document.getElementById("pieChart1");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [12, 21, 5, 40, 15, 7],
            backgroundColor: [
              "rgba(0, 123, 255,0.9)",
              "rgba(0, 123, 255,0.75)",
              "rgba(0, 123, 255,0.5)",
              "rgba(0, 123, 255,0.35)",
              "rgba(0, 123, 255,0.2)",
              "rgba(0,0,0,0.07)"
            ],
            hoverBackgroundColor: [
              "rgba(0, 123, 255,0.9)",
              "rgba(0, 123, 255,0.75)",
              "rgba(0, 123, 255,0.5)",
              "rgba(0, 123, 255,0.35)",
              "rgba(0, 123, 255,0.2)",
              "rgba(0,0,0,0.07)"
            ]

          }],
          labels: [
            "baby_cry",
            "dog_barking",
            "Emergency_broadcast_sys",
            "glass_break",
            "severe_storm",
            "other",
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }


  } catch (error) {
    console.log(error);
  }
  try {

    //pie chart
    var ctx = document.getElementById("pieChart2");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [45, 25, 5, 9, 16],
            backgroundColor: [
              "rgba(255, 70, 51,0.9)",
              "rgba(255, 70, 51,0.75)",
              "rgba(255, 70, 51,0.5)",
              "rgba(255, 70, 51,0.35)",
              "rgba(255, 70, 51,0.2)",
            ],
            hoverBackgroundColor: [
              "rgba(255, 70, 51,0.9)",
              "rgba(255, 70, 51,0.75)",
              "rgba(255, 70, 51,0.5)",
              "rgba(255, 70, 51,0.35)",
              "rgba(255, 70, 51,0.2)",
            ]

          }],
          labels: [
            "Local Fire",
            "Code-Red",
            "Burglary",
            "Cry For Help",
            "Hard Fall"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }


  } catch (error) {
    console.log(error);
  }

  try {

    //pie chart
    var ctx = document.getElementById("pieChart3");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [57, 22, 6, 10, 3, 2],
            backgroundColor: [
              "rgba(51, 125, 155 ,0.9)",
              "rgba(51, 125, 155, 0.75)",
              "rgba(51, 125, 155, 0.5)",
              "rgba(51, 125, 155, 0.35)",
              "rgba(51, 125, 155, 0.2)",
              "rgba(51, 125, 155, 0.05)",
            ],
            hoverBackgroundColor: [
              "rgba(51, 125, 155 ,0.9)",
              "rgba(51, 125, 155, 0.75)",
              "rgba(51, 125, 155, 0.5)",
              "rgba(51, 125, 155, 0.35)",
              "rgba(51, 125, 155, 0.2)",
              "rgba(51, 125, 155, 0.05)",
            ]

          }],
          labels: [
            "Audio sensor",
            "Security camera",
            "Desktop",
            "Mobile",
            "Smart watch",
            "Smart speakers"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }


  } catch (error) {
    console.log(error);
  }

  try {
    var ctx = document.getElementById("pieChart4");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
            data: [58, 20, 7, 11, 2, 2],
            backgroundColor: [
              "rgba(40, 180, 132, 0.9)",
              "rgba(40, 180, 132, 0.75)",
              "rgba(40, 180, 132, 0.5)",
              "rgba(40, 180, 132, 0.35)",
              "rgba(40, 180, 132, 0.2)",
              "rgba(40, 180, 132, 0.05)",
            ],
            hoverBackgroundColor: [
              "rgba(40, 180, 132, 0.9)",
              "rgba(40, 180, 132, 0.75)",
              "rgba(40, 180, 132, 0.5)",
              "rgba(40, 180, 132, 0.35)",
              "rgba(40, 180, 132, 0.2)",
              "rgba(40, 180, 132, 0.05)",
            ]

          }],
          labels: [
            "Audio sensor",
            "Security camera",
            "Desktop",
            "Mobile",
            "Smart watch",
            "Smart speakers"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {

    // polar chart
    var ctx = document.getElementById("polarChart");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          datasets: [{
            data: [15, 18, 9, 6, 19],
            backgroundColor: [
              "rgba(0, 123, 255,0.9)",
              "rgba(0, 123, 255,0.8)",
              "rgba(0, 123, 255,0.7)",
              "rgba(0,0,0,0.2)",
              "rgba(0, 123, 255,0.5)"
            ]

          }],
          labels: [
            "Green",
            "Green",
            "Green",
            "Green"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  try {

    // single bar chart
    var ctx = document.getElementById("singelBarChart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
          datasets: [
            {
              label: "My First dataset",
              data: [40, 55, 75, 81, 56, 55, 40],
              borderColor: "rgba(0, 123, 255, 0.9)",
              borderWidth: "0",
              backgroundColor: "rgba(0, 123, 255, 0.5)"
            }
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: "Poppins"

              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontFamily: "Poppins"
              }
            }]
          }
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

})(jQuery);



(function ($) {
  // USE STRICT
  "use strict";
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 900,
    outDuration: 900,
    linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
    loading: true,
    loadingParentElement: 'html',
    loadingClass: 'page-loader',
    loadingInner: '<div class="page-loader__spin"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'html',
    transition: function (url) {
      window.location.href = url;
    }
  });


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  $("#map_select_btn").change(changeMapData)
  // Map
  function changeMapData(e) {
    var vmap = $('#vmap');
    vmap[0].childNodes[0].remove();
    vmap[0].childNodes[0].remove();
    vmap[0].childNodes[0].remove();
    if (e.target.value == "alerts") {
      try {
        if (vmap[0]) {
          vmap.vectorMap({
            map: 'world_en',
            backgroundColor: null,
            color: '#ffffff',
            hoverOpacity: 0.7,
            selectedColor: '#1de9b6',
            enableZoom: true,
            showTooltip: true,
            values: alerts_data_map,
            scaleColors: ['#1de9b6', '#03a9f5'],
            normalizeFunction: 'polynomial'
          });
        }
    
      } catch (error) {
        console.log('map is not working')
        console.log(error);
      }
    } else if (e.target.value == "cases") {
      try {
        if (vmap[0]) {
          vmap.vectorMap({
            map: 'world_en',
            backgroundColor: null,
            color: '#ffffff',
            hoverOpacity: 0.7,
            selectedColor: '#1de9b6',
            enableZoom: true,
            showTooltip: true,
            values: cases_data_map,
            scaleColors: ['#1de9b6', '#03a9f5'],
            normalizeFunction: 'polynomial'
          });
        }
    
      } catch (error) {
        console.log('map is not working')
        console.log(error);
      }
    }
  }

  try {
    var vmap = $('#vmap');
    if (vmap[0]) {
      vmap.vectorMap({
        map: 'world_en',
        backgroundColor: null,
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#1de9b6',
        enableZoom: true,
        showTooltip: true,
        values: cases_data_map,
        scaleColors: ['#1de9b6', '#03a9f5'],
        normalizeFunction: 'polynomial'
      });
    }

  } catch (error) {
    console.log('map is not working')
    console.log(error);
  }

  // Europe Map
  try {

    var vmap1 = $('#vmap1');
    if (vmap1[0]) {
      vmap1.vectorMap({
        map: 'europe_en',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        enableZoom: true,
        showTooltip: true
      });
    }

  } catch (error) {
    console.log(error);
  }

  // USA Map
  try {

    var vmap2 = $('#vmap2');

    if (vmap2[0]) {
      vmap2.vectorMap({
        map: 'usa_en',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        enableZoom: true,
        showTooltip: true,
        selectedColor: null,
        hoverColor: null,
        colors: {
          mo: '#001BFF',
          fl: '#001BFF',
          or: '#001BFF'
        },
        onRegionClick: function (event, code, region) {
          event.preventDefault();
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  // Germany Map
  try {

    var vmap3 = $('#vmap3');
    if (vmap3[0]) {
      vmap3.vectorMap({
        map: 'germany_en',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        onRegionClick: function (element, code, region) {
          var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();

          alert(message);
        }
      });
    }

  } catch (error) {
    console.log(error);
  }

  // France Map
  try {

    var vmap4 = $('#vmap4');
    if (vmap4[0]) {
      vmap4.vectorMap({
        map: 'france_fr',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        enableZoom: true,
        showTooltip: true
      });
    }

  } catch (error) {
    console.log(error);
  }

  // Russia Map
  try {
    var vmap5 = $('#vmap5');
    if (vmap5[0]) {
      vmap5.vectorMap({
        map: 'russia_en',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        hoverOpacity: 0.7,
        selectedColor: '#999999',
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'polynomial'
      });
    }


  } catch (error) {
    console.log(error);
  }

  // Brazil Map
  try {

    var vmap6 = $('#vmap6');
    if (vmap6[0]) {
      vmap6.vectorMap({
        map: 'brazil_br',
        color: '#007BFF',
        borderColor: '#fff',
        backgroundColor: '#fff',
        onRegionClick: function (element, code, region) {
          var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
          alert(message);
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
})(jQuery);
(function ($) {
  // Use Strict
  "use strict";
  try {
    var progressbarSimple = $('.js-progressbar-simple');
    progressbarSimple.each(function () {
      var that = $(this);
      var executed = false;
      $(window).on('load', function () {

        that.waypoint(function () {
          if (!executed) {
            executed = true;
            /*progress bar*/
            that.progressbar({
              update: function (current_percentage, $this) {
                $this.find('.js-value').html(current_percentage + '%');
              }
            });
          }
        }, {
            offset: 'bottom-in-view'
          });

      });
    });
  } catch (err) {
    console.log(err);
  }
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Scroll Bar
  try {
    var jscr1 = $('.js-scrollbar1');
    if (jscr1[0]) {
      const ps1 = new PerfectScrollbar('.js-scrollbar1');
    }

    var jscr2 = $('.js-scrollbar2');
    if (jscr2[0]) {
      const ps2 = new PerfectScrollbar('.js-scrollbar2');

    }

  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Select 2
  try {

    $(".js-select2").each(function () {
      $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
      });
    });

  } catch (error) {
    console.log(error);
  }


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Dropdown 
  try {
    var menu = $('.js-item-menu');
    var sub_menu_is_showed = -1;

    for (var i = 0; i < menu.length; i++) {
      $(menu[i]).on('click', function (e) {
        e.preventDefault();
        $('.js-right-sidebar').removeClass("show-sidebar");
        if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = -1;
        }
        else {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).removeClass("show-dropdown");
          }
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = jQuery.inArray(this, menu);
        }
      });
    }
    $(".js-item-menu, .js-dropdown").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
    });

  } catch (error) {
    console.log(error);
  }

  var wW = $(window).width();
  // Right Sidebar
  var right_sidebar = $('.js-right-sidebar');
  var sidebar_btn = $('.js-sidebar-btn');

  sidebar_btn.on('click', function (e) {
    e.preventDefault();
    for (var i = 0; i < menu.length; i++) {
      menu[i].classList.remove("show-dropdown");
    }
    sub_menu_is_showed = -1;
    right_sidebar.toggleClass("show-sidebar");
  });

  $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
    event.stopPropagation();
  });

  $("body,html").on("click", function () {
    right_sidebar.removeClass("show-sidebar");

  });


  // Sublist Sidebar
  try {
    var arrow = $('.js-arrow');
    arrow.each(function () {
      var that = $(this);
      that.on('click', function (e) {
        e.preventDefault();
        that.find(".arrow").toggleClass("up");
        that.toggleClass("open");
        that.parent().find('.js-sub-list').slideToggle("250");
      });
    });

  } catch (error) {
    console.log(error);
  }


  try {
    // Hamburger Menu
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      $('.navbar-mobile').slideToggle('500');
    });
    $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
      $(this).toggleClass('active');
      $(dropdown).slideToggle('500');
      return false;
    });
  } catch (error) {
    console.log(error);
  }
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Load more
  try {
    var list_load = $('.js-list-load');
    if (list_load[0]) {
      list_load.each(function () {
        var that = $(this);
        that.find('.js-load-item').hide();
        var load_btn = that.find('.js-load-btn');
        load_btn.on('click', function (e) {
          $(this).text("Loading...").delay(1500).queue(function (next) {
            $(this).hide();
            that.find(".js-load-item").fadeToggle("slow", 'swing');
          });
          e.preventDefault();
        });
      })

    }
  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  try {

    $('[data-toggle="tooltip"]').tooltip();

  } catch (error) {
    console.log(error);
  }

  // Chatbox
  try {
    var inbox_wrap = $('.js-inbox');
    var message = $('.au-message__item');
    message.each(function () {
      var that = $(this);

      that.on('click', function () {
        $(this).parent().parent().parent().toggleClass('show-chat-box');
      });
    });


  } catch (error) {
    console.log(error);
  }

})(jQuery);