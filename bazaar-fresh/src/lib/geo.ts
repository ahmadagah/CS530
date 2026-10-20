import { siteConfig, type StoreLocation } from "@/config/site";

/** Straight-line distance in km between two points. */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function nearestStore(lat: number, lng: number): StoreLocation {
  return [...siteConfig.stores].sort(
    (a, b) => distanceKm({ lat, lng }, a.coords) - distanceKm({ lat, lng }, b.coords),
  )[0];
}
