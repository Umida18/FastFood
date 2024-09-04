// src/react-geocode.d.ts
declare module "react-geocode" {
  interface GeocodeResult {
    formatted_address: string;
    // Add more fields as needed
  }

  interface GeocodeResponse {
    results: GeocodeResult[];
    // Add more fields as needed
  }

  interface Geocode {
    fromLatLng(
      lat: string | number,
      lng: string | number
    ): Promise<GeocodeResponse>;
    setApiKey(apiKey: string): void;
  }

  const geocode: Geocode;
  export default geocode;
}
