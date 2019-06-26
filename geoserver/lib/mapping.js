var mymap = L.map('mapid',{
    zoom: 4,
    center: [-21.95876,34.55524],
    });                

var baselayer = new L.TileLayer.WMS('http://196.41.13.52:7777/geoserver/ramm-live-data/wms?Tiled=true&',{
    layers: 'ramm-live-data:new_cape_town',
    format: 'image/png',
    transparent: true,
    attribution: 'Map data &copy; <a href="https://www.ramm.co.za/">RAMM Technologies</a> contributors, Kusasa, Imagery © <a href="http://geoserver.org/">GeoServer</a>'
    });

var scale = L.control.scale();

baselayer.addTo(mymap);
scale.addTo(mymap);