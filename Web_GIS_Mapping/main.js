window.onload = init;

//Map Controls
//Standard Controls
const mapOverviewControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ]
});
const mapFullScreenControl = new ol.control.FullScreen();
const scaleLineControl = new ol.control.ScaleLine({
  target: document.getElementById('scaling')
});
const zoomSliderControl = new ol.control.ZoomSlider();
const zoomToExtentControl = new ol.control.ZoomToExtent();

//Base Map Switch Controls


//Layer Switch Controls


//Map View
function init(){
  // Map Object
  const map = new ol.Map({
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      zoom: 4
    }),
    controls: ol.control.defaults().extend([
      mapOverviewControl,
      mapFullScreenControl,
      scaleLineControl,
      zoomSliderControl,
      zoomToExtentControl
    ])
  });

  // Base Map LayerGroup 
  //Standard OSM
  const standardOSM = new ol.layer.Tile({
    source: new ol.source.OSM(),
    zIndex: 0,
    visible:true
  });
  //OSM Humanitarian
  const humanitarianOSM = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    zIndex: 0,
    visible:false
  });
  // Bing Maps
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "AvYLDCDCkIuh75GSuBR2NlcE-gHGtpuHwbFTMPBzlD__tKA8UTe5bHpIoO7Kmyh9",
      imagerySet: "Aerial"
    }),
    zIndex: 0,
    visible:false
  });

  const baseMaps = new ol.layer.Group({
    layers: [
      standardOSM,
      humanitarianOSM,
      bingMaps
    ]
  });
  map.addLayer(baseMaps);

  // Layer LayerGroup
  //NOAA WMS Layer
  const NOAALayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer?',
      params: {
        LAYERS: 1,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: 'Credit to <a href=https://nowcoast.noaa.gov/>© NOAA</a>'
    }),
    zIndex: 1,
    opacity: 0.5,
    visible:true
  });

  // sa provinces KML
  const examplesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/Examples.kml',
      format: new ol.format.KML()
    }),
    zIndex: 2,
    opacity: 1,
    visible:true   
  });

  const overLayers = new ol.layer.Group({
    layers: [
      NOAALayer,
      examplesKML
    ]
  });
  map.addLayer(overLayers);
}