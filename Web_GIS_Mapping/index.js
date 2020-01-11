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
      center: [2000000,-1000000],
      zoom: 1
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
    visible:false,
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
    visible:true,
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
  // sa district municipalities KML
  const sa_district_municipalityKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/sa_district_municipality.kml',
      format: new ol.format.KML()
    }),
    zIndex: 1,
    opacity: 1,
    visible:true,
    title: 'sa_district_municipalityKML' 
  });

  // sa inland provinces KML
  const sa_inland_provincesKML = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/sa_inland_provinces.kml',
      format: new ol.format.KML()
    }),
    zIndex: 1,
    opacity: 1,
    visible:true,
    title: 'sa_inland_provincesKML'  
  });

  //NOAA WMS Layer
  const NOAALayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_relhumidity_offsets/MapServer/WMSServer?',
      params: {
        LAYERS: 1,
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: 'Credit to <a href=https://nowcoast.noaa.gov/>© NOAA</a>'
    }),
    zIndex: 1,
    opacity: 1,
    visible:true,
    title: 'NOAALayer'
  });

  const layersGroup = new ol.layer.Group({
    layers: [
      sa_inland_provincesKML,
      sa_district_municipalityKML,
      NOAALayer
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