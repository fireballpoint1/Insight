window.onload = function () {
    
    function graphing(handshake) {
        
        function genDps(list_y) {
            var dps = [];
            for (var j=list_y.length-2000; j<list_y.length; j++) {
                dps.push({
                    y: list_y[j]
                });
            }
            return dps;
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            title :{
                text: "Live Statistics",
                fontFamily: 'verdana',
                horizontalAlign: "left"
            },
            axisY: {
                includeZero: false
            },      
            data: [{
                type: "line",
                axisYType: "secondary",
                name: "Forecast",
                showInLegend: true,
                markerSize: 0,
                dataPoints: genDps(handshake.yhat)
            },
                  {
                type: "line",
                axisYType: "secondary",
                name: "Real-Time Data",
                showInLegend: true,
                markerSize: 0,
                dataPoints: []
            }]
        });
        
        var updateInterval = 1000;
        var dataLength = 50; // number of dataPoints visible at any point
        var progress = 0;
        var handshake = handshake;

        function updateChart (count) {
            console.log(progress)
            
            // Poll server for latest data
            var msg = {
                subj: 'polling',
                entity: 'client',
                event_name: 'fL'
            }

            Http.open("POST", url, true);
            Http.send(JSON.stringify(msg));

            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(Http.getResponseHeader('Content-Type'))
//                     console.log(Http.responseText)
                    if (Http.getResponseHeader('Content-Type') == 'application/json') {
//                         console.log(JSON.parse(Http.responseText))
                        var polling = JSON.parse(Http.responseText)

                        var length = chart.options.data[1].dataPoints.length;
                        chart.options.data[0].dataPoints.push({ y: handshake.yhat[progress+2000]})
                        chart.options.data[1].dataPoints.push({ y: polling.y});
                        if (length+1 > dataLength) {
                            chart.options.data[0].dataPoints.shift();
                            chart.options.data[1].dataPoints.shift();
                        }
                        chart.render();
                        progress+=1;
                    }
                }
            }
        }

        updateChart(dataLength);
        setInterval(function(){updateChart()}, updateInterval);
    }
    
    
    // Client-Server Handshake
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:9090'

    var msg = {
        subj: 'handshake',
        entity: 'client',
        event_name: 'fL'
    }

    Http.open("POST", url, true);
    Http.send(JSON.stringify(msg));

    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.getResponseHeader('Content-Type'));
            console.log(Http.responseText);
            if (Http.getResponseHeader('Content-Type') == 'application/json') {
                console.log(JSON.parse(Http.responseText));
                var handshake = JSON.parse(Http.responseText);
                graphing(handshake);
            }
        }
    }
}