'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Flower from './Flower'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useScreenSize } from '@/hooks/useScreenSize'

const getResponsiveProps = (screenWidth) => {
  if (screenWidth < 768) {
    return {
      scales: [1, 1.5, 0.05],
      positions: [0, 0, 0],
      cameraZoom: 400,
    }
  } else {
    return {
      scales: [1.2, 1.75, 0.06],
      positions: [0, -0.1, 0],
      cameraZoom: 500,
    }
  }
}

export default function FloatingShape() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const flowersRef = useRef([])
  const screenSize = useScreenSize()
  const responsiveProps = getResponsiveProps(screenSize.width)

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
        position: [400, 200, 400],
        zoom: responsiveProps.cameraZoom,
      }}
    >
      <Flower
        ref={(el) => (flowersRef.current[0] = el)}
        modelPath="/3d/flower-pot-bit.gltf"
        scale={[responsiveProps.scales[0], responsiveProps.scales[0], responsiveProps.scales[0]]}
        position={[
          responsiveProps.positions[0],
          responsiveProps.positions[1],
          responsiveProps.positions[2],
        ]}
        visible={activeIndex === 0}
      />
      <Flower
        ref={(el) => (flowersRef.current[1] = el)}
        modelPath="/3d/flower-poppy.gltf"
        scale={[responsiveProps.scales[1], responsiveProps.scales[1], responsiveProps.scales[1]]}
        position={[
          responsiveProps.positions[0],
          responsiveProps.positions[1],
          responsiveProps.positions[2],
        ]}
        visible={activeIndex === 1}
      />
      <Flower
        ref={(el) => (flowersRef.current[2] = el)}
        modelPath="/3d/flower-bee.gltf"
        rotation={[Math.PI / -2, 0, 0]}
        scale={[responsiveProps.scales[2], responsiveProps.scales[2], responsiveProps.scales[2]]}
        position={[
          responsiveProps.positions[0],
          responsiveProps.positions[1],
          responsiveProps.positions[2],
        ]}
        visible={activeIndex === 2}
      />

      <Environment preset="sunset" />
    </Canvas>
  )
}
