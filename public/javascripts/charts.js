let app = {

    charts: [],

    // Top 10 councils with the largest population in Portugal, in 2018
    cities: ['Lisboa', 'Sintra', 'Vila Nova de Gaia', 'Porto', 'Cascais', 'Loures', 'Braga', 'Amadora', 'Oeiras', 'Matosinhos'],
    pop2018: [507220, 388434, 299938, 215284, 212474, 211359, 181919, 181724, 176218, 174382],
    // Populations of those this.cities in 2011
    pop2011: [547733, 377835, 302295, 237591, 206479, 205054, 181494, 175136, 172120, 175478],
    //colors pallet
    colors: [
        'rgba(109, 198, 42, 0.7)',
        'rgba(23, 54, 120, 0.7)',
        'rgba(23, 120, 105, 0.7)',
        'rgba(23, 120, 54, 0.7)',
        'rgba(120, 120, 23, 0.7)',
        'rgba(120, 86, 23, 0.7)',
        'rgba(120, 23, 23, 0.7)',
        'rgba(120, 23, 58, 0.7)',
        'rgba(120, 23, 102, 0.7)',
        'rgba(102, 23, 120, 0.7)',
        'rgba(58, 23, 120, 0.7)',
        'rgba(29, 23, 120, 0.7)'
    ],
    /**
     * Used to get the chartjs object based on the layout position
     * @param pos
     * @return {null|*}
     */
    getChart: function (pos) {

        if(this.charts[pos] === undefined)
            return null;

        return this.charts[pos];

    },

    init: function () {
        
        // Longitude and latitude (x, y)
        const citGeo = [
            {x: -9.13333, y: 38.71667},
            {x: -9.37826, y: 38.80097},
            {x: -8.61742, y: 41.13363},
            {x: -8.61099, y: 41.14961},
            {x: -9.42146, y: 38.69790},
            {x: -9.16845, y: 38.83091},
            {x: -8.42005, y: 41.55032},
            {x: -9.23083, y: 38.75382},
            {x: -9.31460, y: 38.69690},
            {x: -8.69630, y: 41.18440}
        ];
        // Longitude, latitude and population in 2018 (x, y, r)
        const citGeoPop = [  // population divided by 10000 for scale
            {x: -9.13333, y: 38.71667, r: 50.7220},
            {x: -9.37826, y: 38.80097, r: 38.8434},
            {x: -8.61742, y: 41.13363, r: 29.9938},
            {x: -8.61099, y: 41.14961, r: 21.5284},
            {x: -9.42146, y: 38.69790, r: 21.2474},
            {x: -9.16845, y: 38.83091, r: 21.1359},
            {x: -8.42005, y: 41.55032, r: 18.1919},
            {x: -9.23083, y: 38.75382, r: 18.1724},
            {x: -9.31460, y: 38.69690, r: 17.6218},
            {x: -8.69630, y: 41.18440, r: 17.4382}
        ];

        this.charts.push(new Chart(document.getElementById("myChart_1"), {
            type: 'bar',

            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population",
                    data: this.pop2018,
                    backgroundColor: 'rgba(109, 198, 42, 0.9)'
                }]
            },
            options: {
            }
        }));

        this.charts.push(new Chart(document.getElementById("myChart_2"), {
            type: 'line',
            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population",
                    data: this.pop2018,
                    backgroundColor: 'rgba(109, 198, 42, 1)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }));

        this.charts.push(new Chart(document.getElementById("myChart_3"), {
            type: 'pie', // doughnut, pie
            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population",
                    data: this.pop2018,
                    backgroundColor: this.colors
                }]
            },
            options: {}
        }));

        this.charts.push(new Chart(document.getElementById("myChart_4"), {
            type: 'radar',
            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population in 2018",
                    data: this.pop2018,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                }, {
                    label: "Population in 2011",
                    data: this.pop2011,
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        }));

        this.charts.push(new Chart(document.getElementById("myChart_5"), {
            type: 'scatter',
            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population",
                    data: citGeo,
                    backgroundColor: this.colors
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        }));

        this.charts.push(new Chart(document.getElementById("myChart_6"), {
            type: 'bubble',
            data: {
                labels: this.cities,
                datasets: [{
                    label: "Population",
                    data: citGeoPop,
                    backgroundColor: this.colors
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        }));

    }

};