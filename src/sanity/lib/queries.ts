import { groq } from 'next-sanity'

export const PROKERS_QUERY = groq`*[_type == "proker" && !(_id in path('drafts.**'))] | order(date desc) {
  "id": _id,
  title,
  division,
  "programType": coalesce(programType, "pendukung"),
  status,
  date,
  location,
  description,
  "coverImage": coverImage.asset->url
}`

export const VILLAGE_POTENCY_QUERY = groq`*[_type == "villagePotency" && !(_id in path('drafts.**'))] | order(name asc) {
  "id": _id,
  name,
  "title": coalesce(title, name),
  category,
  gmapsUrl,
  latitude,
  longitude,
  description,
  whatsappContact,
  "coverImage": coalesce(coverImage.asset->url, image.asset->url)
}`

export const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember" && !(_id in path('drafts.**'))] | order(order asc) {
  "id": _id,
  name,
  role,
  division,
  order,
  "photo": photo.asset->url,
  instagram,
  linkedin,
  bio
}`

export const STORYBOOK_QUERY = groq`*[_type == "storybook" && !(_id in path('drafts.**'))] | order(publishDate desc, _createdAt desc) {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  publishDate,
  category,
  summary,
  excerpt,
  "author": author->name,
  "authorName": author->name,
  "authorRole": author->role,
  "authorPhoto": author->photo.asset->url,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  "coverImageUrl": coverImage.asset->url,
  body,
  content,
  views,
  "readingTime": "5 min read"
}`

export const STORYBOOK_BY_SLUG_QUERY = groq`*[_type == "storybook" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  publishDate,
  category,
  summary,
  excerpt,
  "author": author->name,
  "authorName": author->name,
  "authorRole": author->role,
  "authorPhoto": author->photo.asset->url,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  "coverImageUrl": coverImage.asset->url,
  body,
  content,
  views,
  "readingTime": "5 min read"
}`
