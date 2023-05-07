import { expect, test } from 'vitest'

import { Size } from '../src/Size'

test('Clone size', () => {
  const size = new Size(0, 1)
  const clonedSize = size.clone()

  expect(clonedSize).toEqual(new Size(0, 1))
})
