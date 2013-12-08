var pollCatModule = angular.module('PollCatApp');

pollCatModule.directive("candidateResultsChart", function(constants) {
    return {
        scope: {
            chartTitle: '@',
            candidateScoreList: '='
        },
        link: function(scope, element) {

            var nameList = [];
            var scoreData = [];

            for (var i = 0; i < scope.candidateScoreList.length; i++) {
                var curCandidateInfo = scope.candidateScoreList[i];
                nameList[i] = curCandidateInfo.name;

                curColor = tinycolor({
                    h: constants.primaryColor.hue,
                    s: constants.primaryColor.saturation * curCandidateInfo.score,
                    v: constants.primaryColor.value
                });

                scoreData[i] = {
                    y: Math.round(curCandidateInfo.score * 100),
                    color: curColor.toHexString()
                };
            }

            var minimal = {
                chart: {
                    type: 'bar',
                    height: 175
                },
                legend: {
                    enabled: false
                },
                title: {
                    text: scope.chartTitle
                },
                xAxis: {
                    categories: nameList,
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
                                return this.y + '%';
                            }
                        }
                    }
                },
                series: [
                    {
                        name: "Percent of topics you agreed on",
                        data: scoreData
                    }
                ],
                credits: {
                    enabled: false
                }
            };

            element.highcharts(minimal);


        }

    };
});