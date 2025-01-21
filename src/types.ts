export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  email: string;
  phone: string;
  interests: string[];
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}