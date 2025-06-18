'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Flower from './Flower'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FloatingShape() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const flowersRef = useRef([])

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
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Canvas
      orthographic
      camera={{
        position: [400, 200, 400],
        zoom: 500,
      }}
    >
      <Flower
        ref={(el) => (flowersRef.current[0] = el)}
        modelPath="/3d/flower-pot-bit.gltf"
        scale={[1.2, 1.2, 1.2]}
        position={[0, 0, 0]}
        visible={activeIndex === 0}
      />
      <Flower
        ref={(el) => (flowersRef.current[1] = el)}
        modelPath="/3d/flower-pot-bit-2.gltf"
        scale={[0.85, 0.85, 0.85]}
        position={[0, 0, 0]}
        visible={activeIndex === 1}
      />
      <Flower
        ref={(el) => (flowersRef.current[2] = el)}
        modelPath="/3d/flower-pot-bit-3.gltf"
        scale={[0.7, 0.7, 0.7]}
        position={[0, 0, 0]}
        visible={activeIndex === 2}
      />
      <Environment preset="sunset" />
    </Canvas>
  )
}
