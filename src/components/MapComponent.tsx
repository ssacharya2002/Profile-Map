import React, { useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { Profile, MapViewState } from '../types';
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

interface MapComponentProps {
  profile: Profile;
}

export function MapComponent({ profile }: MapComponentProps) {
  const [viewState, setViewState] = React.useState<MapViewState>({
    longitude: 0,
    latitude: 0,
    zoom: 12
  });

  useEffect(() => {
    if (profile && profile.longitude && profile.latitude) {
      setViewState(state => ({
        ...state,
        longitude: profile.longitude,
        latitude: profile.latitude
      }));
    }
  }, [profile]);

  if (!profile || !profile.longitude || !profile.latitude) {
    return <div className="h-[400px] w-full rounded-lg bg-gray-100" />;
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={profile.longitude}
          latitude={profile.latitude}
          anchor="bottom"
        >
          <MapPin className="text-red-500" size={24} />
        </Marker>
      </Map>
    </div>
  );
}