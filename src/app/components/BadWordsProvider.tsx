// app/BadWordsProvider.tsx

import { createFilter } from '@/app/store/badWordsFilter';

export async function BadWordsProvider() {
  const filter = await createFilter();

  // Pass the filter down to child components
  return { filter };
}
