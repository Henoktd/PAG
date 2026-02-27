import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline } from 'react-leaflet';
import type { Polyline as LeafletPolyline } from 'leaflet';

const uae: [number, number] = [25.2048, 55.2708]; // Dubai
const djibouti: [number, number] = [11.5721, 43.1456]; // Djibouti City
const ethiopia: [number, number] = [8.9806, 38.7578]; // Addis Ababa

const route: [number, number][] = [uae, djibouti, ethiopia];

export function CorridorMap() {
  const lineRef = useRef<LeafletPolyline | null>(null);

  useEffect(() => {
    let offset = 0;
    const timer = setInterval(() => {
      offset -= 2;
      lineRef.current?.setStyle({ dashOffset: `${offset}px` });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mq-panel overflow-hidden">
      <MapContainer
        center={[15.5, 46.5]}
        zoom={4}
        minZoom={3}
        maxZoom={7}
        scrollWheelZoom={false}
        className="w-full h-[360px] md:h-[440px]"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={route}
          pathOptions={{
            color: '#f39d4c',
            weight: 4,
            opacity: 0.95,
            dashArray: '10 10',
          }}
          ref={(layer) => {
            lineRef.current = layer;
          }}
        />

        <CircleMarker center={uae} radius={8} pathOptions={{ color: '#0f172a', fillColor: '#0f172a', fillOpacity: 1 }}>
          <Tooltip direction="top" offset={[0, -8]} permanent>
            UAE
          </Tooltip>
        </CircleMarker>

        <CircleMarker center={djibouti} radius={8} pathOptions={{ color: '#0f172a', fillColor: '#0f172a', fillOpacity: 1 }}>
          <Tooltip direction="top" offset={[0, -8]} permanent>
            Djibouti
          </Tooltip>
        </CircleMarker>

        <CircleMarker center={ethiopia} radius={8} pathOptions={{ color: '#0f172a', fillColor: '#0f172a', fillOpacity: 1 }}>
          <Tooltip direction="top" offset={[0, -8]} permanent>
            Ethiopia
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
