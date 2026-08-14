import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const rawClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to bypass CDN cache and fetch live Sanity Studio updates immediately
})

// Wrap fetch function with safe revalidation options and fallbacks
export const client = {
  ...rawClient,
  fetch: async <T>(query: string, params: any = {}, options: any = {}): Promise<T | []> => {
    if (!projectId || projectId === 'dummy-project-id') {
      console.warn('Bypassing Sanity API call because projectId is dummy or missing.');
      return [] as T; 
    }
    return rawClient.fetch<T>(query, params, {
      next: { revalidate: 10, tags: ['storybook', 'proker', 'tim', 'peta'] },
      ...options,
    });
  }
}
