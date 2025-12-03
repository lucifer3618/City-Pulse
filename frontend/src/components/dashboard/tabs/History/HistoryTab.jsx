import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import HistoryPopupCard from "@/components/dashboard/tabs/History/HistoryPopupCard.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Helper to center map
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

export default function HistoryTab({ className, locations }) {
  // Safety check
  if (!locations || locations.length === 0) {
    return <div className={`p-4 text-center text-gray-500 ${className}`}>No locations found</div>;
  }

  const centerLat = locations[0].coordinates.lat;
  const centerLon = locations[0].coordinates.lon;

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={9}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.coordinates.lat, loc.coordinates.lon]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
            }}
          >
            <Popup className="custom-popup" closeButton={false}>
              <HistoryPopupCard name={loc.name} temp={loc.weather.main.temp} feelsLike={loc.weather.main.feels_like} condition={loc.weather.weather[0]} windSpeed={loc.weather.wind.speed} humidity={loc.weather.main.humidity} />
            </Popup>
          </Marker>
        ))}

        <ChangeMapView coords={[centerLat, centerLon]} />
      </MapContainer>
    </div>
  );
}