'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Flower from './Flower'
import { useState, useEffect } from 'react'

export function Mesh({ node }) {
  const { castShadow, receiveShadow, geometry, material, position, rotation, scale } = node

  return (
    <mesh
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default function FloatingShape() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 200],
        zoom: 500,
      }}
    >
      <Flower
        modelPath="/3d/flower-pot-bit.gltf"
        scale={[1.2, 1.2, 1.2]}
        position={[0, -0.35, 0]}
        visible={activeIndex === 0}
      />
      <Flower
        modelPath="/3d/flower-pot-bit-2.gltf"
        scale={[1, 1, 1]}
        position={[0, -0.35, 0]}
        visible={activeIndex === 1}
      />
      <Flower
        modelPath="/3d/flower-pot-bit-3.gltf"
        scale={[0.7, 0.7, 0.7]}
        position={[0, -0.33, 0]}
        visible={activeIndex === 2}
      />
      <Environment preset="sunset" />
    </Canvas>
  )
}
