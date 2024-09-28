
import { resumeDataSchema } from 'apps/easyAccess/libs/schema';
import { z } from 'zod';

// builders: '&id, title, visibility, locked, createdAt, updatedAt',
export const DB_BuilderSchema = z.object({
    title: z.string(),
    visibility: z.enum(['public', 'private']),
    locked: z.boolean(),
    data: resumeDataSchema
});

export type DB_Builder = z.infer<typeof DB_BuilderSchema>;
