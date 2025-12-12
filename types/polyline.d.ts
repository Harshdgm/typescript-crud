declare module "@mapbox/polyline" {
  const polyline: {
    encode(coords: [number, number][]): string;
    decode(str: string): [number, number][];
  };
  export default polyline;
}
