import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

function ChangeMapView({ lat, lon }) {
  const map = useMap();
  map.setView([lat, lon], map.getZoom(), { animate: true });
  return null;
}

export default function MapCard({ className, lat, lon, pinName }) {

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lon]}>
        <Popup>{pinName}</Popup>
      </Marker>

      <ChangeMapView lat={lat} lon={lon} />

    </MapContainer>
  )
}
