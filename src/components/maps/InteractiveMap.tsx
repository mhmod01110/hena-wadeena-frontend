import { useEffect, useState, lazy, Suspense } from "react";
import "leaflet/dist/leaflet.css";

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

// Lazy load the actual map to avoid SSR issues
const MapContent = lazy(() => import("./MapContent"));

export function InteractiveMap({
  locations,
  center = [25.4500, 30.5500],
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
    <Suspense
      fallback={
        <div className={`${className} bg-muted/50 flex items-center justify-center`}>
          <span className="text-muted-foreground">جاري تحميل الخريطة...</span>
        </div>
      }
    >
      <MapContent
        locations={locations}
        center={center}
        zoom={zoom}
        className={className}
        onMarkerClick={onMarkerClick}
      />
    </Suspense>
  );
}
