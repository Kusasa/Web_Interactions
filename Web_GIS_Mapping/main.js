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
const scaleLineControl = new ol.control.ScaleLine();
const zoomSliderControl = new ol.control.ZoomSlider();
const zoomToExtentControl = new ol.control.ZoomToExtent();

function init(){
    const map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
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
    })
}