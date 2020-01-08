window.onload = init;
const mapOverviewControl = new ol.control.OverviewMap({
    collapsed: false,
    layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ]
});
const mapFullScreenControl = new ol.control.FullScreen();
const mousePositionControl = new ol.control.MousePosition();
const scaleLineControl = new ol.control.ScaleLine({
  target: document.getElementById('scaling')
});
const zoomSliderControl = new ol.control.ZoomSlider();
const zoomToExtentControl = new ol.control.ZoomToExtent();

function init(){
    const map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
            zIndex: 2,
            opacity: 0.2,
            visible:true
          }),
          // Bing Maps
          new ol.layer.Tile({
            source: new ol.source.BingMaps({
              key: "AvYLDCDCkIuh75GSuBR2NlcE-gHGtpuHwbFTMPBzlD__tKA8UTe5bHpIoO7Kmyh9",
              imagerySet: "Aerial"
            }),
            zIndex: 0,
            opacity: 1,
            visible:true
          })
        ],
        view: new ol.View({
          center: [0, 0],
          zoom: 4
        }),
        controls: ol.control.defaults().extend([
            mapOverviewControl,
            mapFullScreenControl,
            //mousePositionControl,
            scaleLineControl,
            zoomSliderControl,
            zoomToExtentControl
        ])
      });

    //Layer Group
    const layerGroup = new ol.layer.Group({
      layers: [
        //OSM Natural Tiles
        new ol.layer.Tile({
          source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
          }),
          zIndex: 1,
          opacity: 0.4,
          visible:true
        })/*,
        // Bing Maps
        new ol.layer.Tile({
          source: new ol.source.BingMaps({
            key: "AvYLDCDCkIuh75GSuBR2NlcE-gHGtpuHwbFTMPBzlD__tKA8UTe5bHpIoO7Kmyh9",
            imagerySet: "Road"
          }),
          zIndex: 0,
          opacity: 1,
          visible:true
        })*/
      ]
    })
    map.addLayer(layerGroup);

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
      zIndex: 5,
      opacity: 1,
      visible:true
    })
    map.addLayer(NOAALayer)
    console.log(NOAALayer.getKeys());

    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'center-left'
    });

    map.addOverlay(popup);
    map.on('click', function(e){
        const clickedCoordinate = e.coordinate;
        popup.setPosition(undefined);
        popup.setPosition(clickedCoordinate);
        popupContainerElement.innerHTML = clickedCoordinate;
        console.log(clickedCoordinate);
    });
}