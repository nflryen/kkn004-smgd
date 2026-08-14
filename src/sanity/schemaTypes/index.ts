import { type SchemaTypeDefinition } from 'sanity'

import proker from './proker'
import villagePotency from './villagePotency'
import teamMember from './teamMember'
import storybook from './storybook'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [proker, villagePotency, teamMember, storybook],
}
