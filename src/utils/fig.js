import Plotly from 'plotly.js-dist-min';

const figureTypes = [
    'line',
    'pie',
    'bar',
];

const fromOptions = [
    'dataframe',
    'list',
];

const plotlyUtils = {
    create(id, figureData){
        const cntr = document.getElementById(id)
        if(cntr){
            Plotly.newPlot(cntr, figureData);
        }
    },
}

export {
    figureTypes,
    fromOptions,
    plotlyUtils,
}