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
  center?: LngLatLike;
}

type LngLagBounds =
  | { northeast: LngLatLike; southwest: LngLatLike }
  | [LngLatLike, LngLatLike]
  | [number, number, number, number];

/*
 * Examples of two functions that are very implicit in what they take in and strict in what they produce
 */

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLagBounds): Camera;
