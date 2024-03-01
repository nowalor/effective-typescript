interface LngLat {
  lng: number;
  lat: number;
}

type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

interface Camera {
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}

/*
 * Best way to make one field in a big interface optional?
 */
interface CameraOptions extends Omit<Partial<Camera>, "center"> {
  center?: LngLat;
}
