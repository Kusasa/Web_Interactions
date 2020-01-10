window.onload = init;

//Map View
function init(){
  //Standard Map Controls
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
    source: new ol.source.OSM({
      attributions: 'Credit to <a href=https://www.openstreetmap.org>© OSM</a>'
    }),
    zIndex: 0,
    visible:true,
    title: 'standardOSM'
  });
  //OSM Humanitarian
  const humanitarianOSM = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attributions: 'Credit to <a href=https://www.openstreetmap.org>© OSM</a>'
    }),
    zIndex: 0,
    visible:false,
    title: 'humanitarianOSM'
  });
  // Bing Maps
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "AvYLDCDCkIuh75GSuBR2NlcE-gHGtpuHwbFTMPBzlD__tKA8UTe5bHpIoO7Kmyh9",
      imagerySet: "Aerial",
      attributions: 'Credit to <a href=https://www.bing.com/maps>© Bing Maps</a>'
    }),
    zIndex: 0,
    visible:false,
    title: 'bingMaps'
  });

  const baseMapsGroup = new ol.layer.Group({
    layers: [
      standardOSM,
      humanitarianOSM,
      bingMaps
    ]
  });
  map.addLayer(baseMapsGroup);

  //Base Map Switch Controls
  const baseMapsElements = document.querySelectorAll('.base-maps > input');
  for (let baseMapsElement of baseMapsElements){
  baseMapsElement.addEventListener('change', function(){
    let baseMapsElementValue = this.value;
    baseMapsGroup.getLayers().forEach(function(element, index, array){
      let baseMapTitle = element.get('title');
      element.setVisible(baseMapTitle === baseMapsElementValue);
    })
  })
  }

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
    visible:true,
    title: 'NOAALayer'
  });

  // sa provinces KML
  const examplesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/Examples.kml',
      format: new ol.format.KML()
    }),
    zIndex: 2,
    opacity: 1,
    visible:true,
    title: 'examplesKML'  
  });

  const layersGroup = new ol.layer.Group({
    layers: [
      NOAALayer,
      examplesKML
    ]
  });
  map.addLayer(layersGroup);

  //Layer Switch Controls
  const layerElements = document.querySelectorAll('.layers > input');
  for (let layerElement of layerElements){
  layerElement.addEventListener('change', function(){
    let layerElementValue = this.value;
    let targetLayer;

    layersGroup.getLayers().forEach(function(element, index, array){
      let layerTitle = element.get('title');
      if(layerElementValue === layerTitle){
        targetLayer = element;
      }
    })
    this.checked ? targetLayer.setVisible(true) : targetLayer.setVisible(false)
  })
  }

}