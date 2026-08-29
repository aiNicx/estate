import type { StyleSpecification } from "maplibre-gl";
import positron from "./openfreemap-positron.json";

const LAND = "#e7e0d2";
const LAND_DEEP = "#d8d0c0";
const SEA = "#1b3a4a";
const SEA_DEEP = "#122830";
const FOAM = "#e4eef0";
const LEAF = "#3c4f3d";
const LINE = "#cfc4b3";
const PAPER = "#f3efe6";
const ROAD = "#f7f1e6";

const FILL: Record<string, string> = {
  background: LAND,
  park: "#d4d0c2",
  water: SEA,
  landcover_ice_shelf: PAPER,
  landcover_glacier: PAPER,
  landuse_residential: LAND_DEEP,
  landcover_wood: LEAF,
  building: "#ddd4c4",
  "aeroway-area": LAND,
  road_area_pier: LAND,
};

const LINE_COLOR: Record<string, string> = {
  waterway: "#2d6a78",
  tunnel_motorway_casing: LINE,
  tunnel_motorway_inner: ROAD,
  "aeroway-taxiway": LINE,
  "aeroway-runway-casing": LINE,
  "aeroway-runway": PAPER,
  road_pier: LAND,
  highway_path: "#e4dccb",
  highway_minor: "#e8e0d0",
  highway_major_casing: LINE,
  highway_major_inner: ROAD,
  highway_major_subtle: LINE,
  highway_motorway_casing: LINE,
  highway_motorway_inner: ROAD,
  highway_motorway_subtle: LINE,
  railway_transit: LINE,
  railway_transit_dashline: PAPER,
  railway_service: LINE,
  railway_service_dashline: PAPER,
  railway: "#b7ab99",
  railway_dashline: PAPER,
  highway_motorway_bridge_casing: LINE,
  highway_motorway_bridge_inner: ROAD,
  boundary_3: "rgba(28,25,20,0.18)",
  boundary_2: "rgba(28,25,20,0.22)",
  boundary_disputed: "rgba(28,25,20,0.18)",
};

export function estateMapStyle(): StyleSpecification {
  const style = structuredClone(positron) as StyleSpecification;
  style.layers = (style.layers ?? []).filter((layer) => layer.type !== "symbol");

  for (const layer of style.layers) {
    if (layer.type === "background" && layer.paint) {
      layer.paint["background-color"] = LAND;
    }
    if (layer.type === "fill" && layer.paint && FILL[layer.id]) {
      layer.paint["fill-color"] = FILL[layer.id];
      if (layer.id === "building") {
        layer.paint["fill-outline-color"] = LINE;
      }
      if (layer.id === "landcover_wood") {
        layer.paint["fill-opacity"] = 0.28;
      }
      if (layer.id === "water") {
        layer.paint["fill-color"] = SEA;
      }
    }
    if (layer.type === "line" && layer.paint && LINE_COLOR[layer.id]) {
      layer.paint["line-color"] = LINE_COLOR[layer.id];
    }
  }

  style.sources = {
    ...style.sources,
    terrain: {
      type: "raster-dem",
      tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 15,
    },
  };

  const waterIndex = style.layers.findIndex((layer) => layer.id === "water");
  style.layers.splice(waterIndex >= 0 ? waterIndex + 1 : 1, 0, {
    id: "hillshade",
    type: "hillshade",
    source: "terrain",
    paint: {
      "hillshade-exaggeration": 0.55,
      "hillshade-shadow-color": LEAF,
      "hillshade-highlight-color": FOAM,
      "hillshade-accent-color": SEA_DEEP,
      "hillshade-illumination-direction": 315,
    },
  });

  return style;
}
