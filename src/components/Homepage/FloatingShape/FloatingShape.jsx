'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Flower from './Flower'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useScreenSize } from '@/hooks/useScreenSize'

// Helper function to get responsive scales and positions
const getResponsiveProps = (screenWidth) => {
  if (screenWidth < 768) {
    // Mobile screens
    return {
      scales: [1, 0.65, 0.5, 1.5],
      positions: [0, 0, 0],
      cameraZoom: 400,
    }
  } else {
    return {
      scales: [1.2, 0.85, 0.7, 1.75],
      positions: [0, 0, 0],
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
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const z = (event.clientY / window.innerHeight) * 2 - 1

      gsap.to(position, {
        x: x,
        z: z,
        duration: 5,
        ease: 'power2.out',
        onUpdate: () => {
          flowersRef.current.forEach((flower) => {
            if (flower) {
              const targetX = position.x
              const targetZ = position.z

              flower.position.x += (targetX - flower.position.x) * 0.1
              flower.position.z += (targetZ - flower.position.z) * 0.1
            }
          })
        },
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [position])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
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
        modelPath="/3d/flower-pot-bit-2.gltf"
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
        modelPath="/3d/flower-pot-bit-3.gltf"
        scale={[responsiveProps.scales[2], responsiveProps.scales[2], responsiveProps.scales[2]]}
        position={[
          responsiveProps.positions[0],
          responsiveProps.positions[1],
          responsiveProps.positions[2],
        ]}
        visible={activeIndex === 2}
      />
      <Flower
        ref={(el) => (flowersRef.current[3] = el)}
        modelPath="/3d/flower-poppy.gltf"
        scale={[responsiveProps.scales[3], responsiveProps.scales[3], responsiveProps.scales[3]]}
        position={[
          responsiveProps.positions[0],
          responsiveProps.positions[1],
          responsiveProps.positions[2],
        ]}
        visible={activeIndex === 3}
      />
      <Environment preset="sunset" />
    </Canvas>
  )
}
