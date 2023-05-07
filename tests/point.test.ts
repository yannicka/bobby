import { assert, test } from 'vitest'

import { Point } from '../src/Point'

test('Clone point', () => {
  const point = new Point(2, 2)

  const clonedPoint = point.clone()

  point.x = 4
  point.y = 8

  assert.deepEqual(clonedPoint, new Point(2, 2))
})

test('Angle between points', () => {
  const point1 = new Point(2, 2)
  const point2 = new Point(8, 20)

  const angleBetween = Point.angleBetween(point1, point2)

  assert.equal(angleBetween, 1.2490457723982544)
})
