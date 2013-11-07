var pollCatModule = angular.module('PollCatApp');

pollCatModule.directive("candidateResultsChart", function() {
    return {
        scope: {
            panelTitle:'@',
            list:'='
        },
        link: function(scope, element) {
            var dataColumn = {
                chart: {
                    type: 'column'
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: 'Mayor'
                },
                xAxis: {
                    categories: ['Rob Ford', 'Chris Onysko', 'Lee Done', 'Jasper Belevou-thompson'],
                    labels: {
                        rotation: -35,
                        align: 'right',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Same votes (%)'
                    },
                    gridLineColor: 'transparent'
                },

                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold'
                            },
                            formatter: function() {
                                return this.y +'%';
                            }
                        }
                    }
                },
                series: [{
                    name: "series name",
                    data: [
                        {
                            y: 86,
                            color: '#00B'
                        },
                        {
                            y: 76,
                            color: '#117'
                        },
                        {
                            y: 50,
                            color: '#224'
                        },
                        {
                            y: 20,
                            color: '#223'
                        }
                    ]
                }],
                credits: {
                    enabled: false
                }
            };


            var dataBar = {
                chart: {
                    type: 'bar'
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: 'Mayor'
                },
                xAxis: {
                    categories: ['Rob Ford', 'Chris Onysko', 'Lee Done', 'Jasper Belevou-thompson'],
                    labels: {
                        align: 'right'
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Same votes (%)'
                    },
                    gridLineColor: 'transparent'
                },

                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold'
                            },
                            formatter: function() {
                                return this.y +'%';
                            }
                        }
                    }
                },
                series: [{
                    name: "series name",
                    data: [
                        {
                            y: 86,
                            color: '#00B'
                        },
                        {
                            y: 76,
                            color: '#117'
                        },
                        {
                            y: 50,
                            color: '#224'
                        },
                        {
                            y: 20,
                            color: '#223'
                        }
                    ]
                }],
                credits: {
                    enabled: false
                }
            };

            var minimal = {
                chart: {
                    type: 'bar',
                    height: 175
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: 'Candidates for Mayor'
                },
                xAxis: {
                    categories: ['Rob Ford', 'Chris Onysko', 'Lee Done', 'Jasper Belevou-thompson'],
                    labels: {
                        align: 'right'
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineColor: 'transparent'
                },

                plotOptions: {
                    series: {
                        pointPadding: 0.08,
                        groupPadding: 0,
                        borderWidth: 0,
                        shadow: false
                    },
                    bar: {
                        dataLabels: {
                            enabled: true,
                            color: '#333333',
                            style: {
                                fontWeight: 'bold'
                            },
                            formatter: function() {
                                return this.y +'%';
                            }
                        }
                    }
                },
                series: [{
                    name: "Percent of topics you agreed on",
                    data: [
                        {
                            y: 96,
                            color: '#428BCA'
                        },
                        {
                            y: 76,
                            color: '#5E99C9'
                        },
                        {
                            y: 50,
                            color: '#79A5C6'
                        },
                        {
                            y: 20,
                            color: '#9BB3C4'
                        }
                    ]
                }],
                credits: {
                    enabled: false
                }
            };

            element.highcharts(minimal);


        }

    };
});