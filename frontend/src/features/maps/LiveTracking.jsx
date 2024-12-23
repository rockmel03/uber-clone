import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;

const center = {
  lat: 0,
  lng: 0,
};

// Included libraries
const libraries = ["marker"];

export const LiveTracking = () => {
  const { isLoaded } = useLoadScript({
    id: "google-map",
    googleMapsApiKey: apiKey,
    libraries: libraries, // Include the 'marker' library
  });

  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => console.error("Error watching position:", error),
      {
        enableHighAccuracy: true,
      }
    );
    // Cleanup the watcher on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;

    map.setOptions({
      mapId: mapId,
    });

    const MarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: currentPosition,
    });
    if (MarkerElement) {
      mapRef.current.marker = MarkerElement;
    }
  };

  if (!isLoaded)
    return (
      <div className="w-full h-full grid place-items-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={currentPosition}
      zoom={15}
      onLoad={onLoad}
    />
  );
};
