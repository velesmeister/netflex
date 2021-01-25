export function toggleCharts() {
    const chart1 = new CanvasJS.Chart("chart1", {
        animationEnabled: true,
        title: {
            text: "Решено вопросов"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },

        legend: {
            cursor: "pointer",
            fontSize: 16,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                name: "Статистика по вопросам",
                type: "spline",
                yValueFormatString: "#0.## °C",
                showInLegend: true,
                dataPoints: [
                    {x: new Date(2021, 6, 24), y: 22},
                    {x: new Date(2021, 6, 25), y: 19},
                    {x: new Date(2021, 6, 26), y: 23},
                    {x: new Date(2021, 6, 27), y: 24},
                    {x: new Date(2021, 6, 28), y: 24},
                    {x: new Date(2021, 6, 29), y: 23},
                    {x: new Date(2021, 6, 30), y: 23}
                ]
            }]
    });
    chart1.render();

    const chart2 = new CanvasJS.Chart("chart2", {
        animationEnabled: true,
        title: {
            text: "Решено билетов"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },

        legend: {
            cursor: "pointer",
            fontSize: 16,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                name: "Статистика по билетам",
                type: "spline",
                yValueFormatString: "#0.## °C",
                showInLegend: true,
                dataPoints: [
                    {x: new Date(2021, 6, 24), y: 1},
                    {x: new Date(2021, 6, 25), y: 3},
                    {x: new Date(2021, 6, 26), y: 0},
                    {x: new Date(2021, 6, 27), y: 0},
                    {x: new Date(2021, 6, 28), y: 0},
                    {x: new Date(2021, 6, 29), y: 2},
                    {x: new Date(2021, 6, 30), y: 1}
                ]
            }]
    });
    chart2.render();

    const chart3 = new CanvasJS.Chart("chart3", {
        animationEnabled: true,
        title: {
            text: "Пройдено тем"
        },
        axisX: {
            valueFormatString: "DD MMM,YY"
        },

        legend: {
            cursor: "pointer",
            fontSize: 16,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                name: "Статистика по темам",
                type: "spline",
                yValueFormatString: "#0.## °C",
                showInLegend: true,
                dataPoints: [
                    {x: new Date(2021, 6, 24), y: 0},
                    {x: new Date(2021, 6, 25), y: 0},
                    {x: new Date(2021, 6, 26), y: 0},
                    {x: new Date(2021, 6, 27), y: 1},
                    {x: new Date(2021, 6, 28), y: 1},
                    {x: new Date(2021, 6, 29), y: 0},
                    {x: new Date(2021, 6, 30), y: 0}
                ]
            }]
    });
    chart3.render();
}
