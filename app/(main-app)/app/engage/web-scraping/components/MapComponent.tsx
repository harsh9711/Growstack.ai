// web scraping done
"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "leaflet/dist/leaflet.css";
import { useCallback, useRef } from "react";

const MapComponent = ({ places }: { places: Place[] }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: -33.89,
    lng: 151.274,
  };

  const zoom = 10;

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      if (!places || places.length === 0) {
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();
      const svgMarker = {
        path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "red",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(0, 20),
      };

      places.forEach((place) => {
        const { latitude, longitude } = place;
        const position = new window.google.maps.LatLng(latitude, longitude);
        bounds.extend(position);

        new window.google.maps.Marker({
          position,
          map: mapRef.current,
          icon: svgMarker,
        });
      });

      mapRef.current?.fitBounds(bounds);

      const maxZoom = 15;
      mapRef.current?.addListener("zoom_changed", () => {
        const currentZoom = mapRef.current?.getZoom();
        if (currentZoom !== undefined && currentZoom > maxZoom) {
          mapRef.current?.setZoom(maxZoom);
        }
      });
    },
    [places]
  );

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB8uvaGZVlIgN8HaF4zU72wBeMIYmCBVwo">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom} onLoad={onLoad} onUnmount={onUnmount}></GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
