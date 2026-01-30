import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './blockContentType';
import { blockImageType } from './blockImageType';
import { vanType } from './vanType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blockImageType, vanType],
};
