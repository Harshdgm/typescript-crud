// types/leaflet-routing-machine.d.ts
import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    interface LineStyle {
      color?: string;
      weight?: number;
      opacity?: number;
    }

    interface RoutingOptions {
      waypoints?: L.LatLngExpression[];
      lineOptions?: {
        styles?: LineStyle[];
      };
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      showAlternatives?: boolean;
      routeWhileDragging?: boolean;
    }

    class Control extends L.Control {
      constructor(options?: RoutingOptions);
    }

    function control(options?: RoutingOptions): Control;
  }

  // Augment L with Routing
  const Routing: typeof Routing;
}

declare module "leaflet-routing-machine" {
  import * as L from "leaflet";
  export = L.Routing; // use export = syntax
}
