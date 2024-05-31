import { NextResponse } from 'next/server';
import Supercluster from 'supercluster';
import { point } from '@turf/helpers';


const generateRandomLatLongPoints = (n) => {
  const points = [];
  for (let i = 0; i < n; i++) {
    const lat = Math.random() * 180 - 90;
    const long = Math.random() * 360 - 180;
    points.push(point([long, lat]));
  }
  return points;
};

const convertClustersToGeoJSON = (clusters) => {
  return {
    type: "FeatureCollection",
    features: clusters,
  };
};

const points = generateRandomLatLongPoints(1_000_000);
const index = new Supercluster({ radius: 40, maxZoom: 16 });
index.load(points);

export default function handler(req, res) {
  const bbox = req.query.bbox.split(',').map(Number);
  const zoom = parseInt(req.query.zoom, 10);

  const clusters = index.getClusters(bbox, zoom);
  const geojsonClusters = convertClustersToGeoJSON(clusters);

  res.status(200).json(geojsonClusters);
}
