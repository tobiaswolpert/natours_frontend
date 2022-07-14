import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9iaWFzd29scGVydCIsImEiOiJjbDRvMHJqNGwwMnpuM2Nwc25sM210N3czIn0.Sa2s6JZsUmMeepaR83Jurw";

const Map = ({ locations }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/tobiaswolpert/cl4o7ttcr001u15mn6rr3glan",
      interactive: false,
    });

    //Create Lng Lat Bounds
    const bounds = new mapboxgl.LngLatBounds();

    //Add Markers
    locations.forEach((element) => {
      //Add marker
      new mapboxgl.Marker().setLngLat(element.coordinates).addTo(map.current);

      //Add popup
      new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
        .setLngLat(element.coordinates)
        .setHTML(`<p>Day ${element.day}: ${element.description}</p>`)
        .addTo(map.current);

      //Extend the map bounds to include the current location
      bounds.extend(element.coordinates);
    });

    //Add padding to map bounds
    map.current.fitBounds(bounds, {
      padding: { top: 200, bottom: 200, left: 100, right: 100 },
    });

    // return () => map.current.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
