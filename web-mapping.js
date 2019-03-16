/*specifying map extent*/
var extents = new OpenLayers.Bounds(1834497, -4341911, 3283012, -2509131); 


/*loading controls to the map*/
var control, controls = [];

   var map = new OpenLayers.Map("map", {
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement('dropdown-content')}),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.KeyboardDefaults()
        ],
        maxExtent: extents,
        minExtent: "auto",
        restrictedExtent: extents
    },
        {projection: new OpenLayers.Projection("EPSG:900913")},
        {units: 'm'},
        {allOverlays: true}
        );


/*setting OSM as the base layer*/
 var OSM = new OpenLayers.Layer.OSM("OpenStreetMap");

/*loading the overlay layers from GeoServer as WMS*/
  var district = new OpenLayers.Layer.WMS (
        "sa_district_municipality",
        "http://localhost:8085/geoserver/RSAcontext/wms",
        {layers:"RSAcontext:sa_district_municipality",transparent: true, format: "image/gif"},
        {visibility: true},
        {'displayInLayerSwitcher':true}
);

 var local = new OpenLayers.Layer.WMS (
        "sa_local_municipality",
        "http://localhost:8085/geoserver/RSAcontext/wms",
        {layers:"RSAcontext:sa_local_municipality",transparent: true, format: "image/gif"},
        {visibility: false},
        {'displayInLayerSwitcher':true}
);

 var province = new OpenLayers.Layer.WMS (
        "sa_province",
        "http://localhost:8085/geoserver/RSAcontext/wms",
        {layers:"RSAcontext:sa_province",transparent: true, format: "image/gif"},
        {visibility: false},
        {'displayInLayerSwitcher':true}
);

 var railway = new OpenLayers.Layer.WMS (
        "sa_railway",
        "http://localhost:8085/geoserver/RSAcontext/wms",
        {layers:"RSAcontext:sa_railway",transparent: true, format: "image/gif"},
        {visibility: false},
        {'displayInLayerSwitcher':true}
);

 var road = new OpenLayers.Layer.WMS (
    "sa_road_2018_12_05",
    "http://localhost:8085/geoserver/RSAcontext/wms",
    {layers:"RSAcontext:sa_road_2018_12_05",transparent: true, format: "image/gif"},
    {visibility: true},
    {'displayInLayerSwitcher':true}
);

 var town = new OpenLayers.Layer.WMS (
    "town_city",
    "http://localhost:8085/geoserver/RSAcontext/wms",
    {layers:"RSAcontext:town_city",transparent: true, format: "image/gif"},
    {visibility: true},
    {'displayInLayerSwitcher':true}
);


/*adding the overlayings to the map object*/ 
map.addLayers([OSM,road,railway,local,district,province,town]);


/*specifying the map center and the default zoom level*/
map.setCenter(new OpenLayers.LonLat(2734497,-3409131),6);