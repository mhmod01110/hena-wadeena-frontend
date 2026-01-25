import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapLocation {
  id: number | string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  type?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMarkerClick?: (location: MapLocation) => void;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function InteractiveMap({
  locations,
  center = [25.4500, 30.5500], // New Valley default center
  zoom = 8,
  className = "h-[400px] w-full rounded-xl",
  onMarkerClick,
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className} bg-muted/50 flex items-center justify-center`}>
        <span className="text-muted-foreground">جاري تحميل الخريطة...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={true}
      key={`map-${center[0]}-${center[1]}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} zoom={zoom} />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          eventHandlers={{
            click: () => onMarkerClick?.(location),
          }}
        >
          <Popup>
            <div className="text-center p-1">
              <h4 className="font-semibold text-sm">{location.name}</h4>
              {location.type && (
                <span className="text-xs text-gray-500">{location.type}</span>
              )}
              {location.description && (
                <p className="text-xs mt-1">{location.description}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
