import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: any) => {
  if (!source) {
    return {
      url: () => 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200'
    }
  }
  return builder.image(source)
}
