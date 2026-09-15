export const SANITY_PROJECT_ID = 'eyi8ruc3';
export const SANITY_DATASET = 'production';
export const SANITY_API_VERSION = '2024-01-01';
export const SANITY_STUDIO_URL = 'https://kollekta.sanity.studio/';

export function getSanityProjectId() {
  return import.meta.env.SANITY_PROJECT_ID || SANITY_PROJECT_ID;
}

export function getSanityDataset() {
  return import.meta.env.SANITY_DATASET || SANITY_DATASET;
}

export function getSanityStudioUrl() {
  const url = import.meta.env.SANITY_STUDIO_URL || SANITY_STUDIO_URL;
  return url.endsWith('/') ? url : `${url}/`;
}
