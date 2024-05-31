import Supercluster from 'supercluster';
import { point } from '@turf/helpers';

let index = null;
let points = null;

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
console.log(`Available memory: ${JSON.stringify(process.memoryUsage(), null, 2)}`);

const initializeIndex = async () => {
  points = generateRandomLatLongPoints(1_000_000); // Adjust the number of points based on your performance needs
  index = new Supercluster({ radius: 40, maxZoom: 16 });
  index.load(points);
  const sizeInBytes = Buffer.byteLength(JSON.stringify(points));
  console.log(`Size of points: ${sizeInBytes / 1024 / 1024} MB`);
};

export default async function handler(req, res) {
  try {
    if (!index) {
      console.log('Initializing Supercluster index');
      await initializeIndex();
    }

    const bbox = req.query.bbox.split(',').map(Number);
    const zoom = parseInt(req.query.zoom, 10);

    const clusters = index.getClusters(bbox, zoom);
    const geojsonClusters = convertClustersToGeoJSON(clusters);

    return res.status(200).json(geojsonClusters);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
