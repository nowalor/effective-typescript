interface LngLat {
  lng: number;
  lat: number;
}

type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

interface Camera {
  center: LngLat;
}
