import { test } from 'vitest'
import { expect } from 'vitest'

import { Point } from '../src/Point'
import { Camera } from '../src/Camera'
import { Size } from '../src/Size'

test('Camera position', () => {
  const camera = new Camera(new Point(0, 1), new Size(2, 3))
  expect(camera.getPosition()).toEqual(new Point(0, 1))

  camera.setPosition(new Point(4, 5))
  expect(camera.getPosition()).toEqual(new Point(4, 5))
})

test('Camera size', () => {
  const camera = new Camera(new Point(0, 1), new Size(2, 3))
  expect(camera.getSize()).toEqual(new Size(2, 3))

  camera.setSize(new Size(4, 5))
  expect(camera.getSize()).toEqual(new Size(4, 5))
})
