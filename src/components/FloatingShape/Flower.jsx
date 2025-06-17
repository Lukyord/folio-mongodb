import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from './FloatingShape'

export default function Flower({
  modelPath,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotationSpeed = 0.1,
  visible = true,
}) {
  const { nodes } = useGLTF(modelPath)
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={position} visible={visible}>
      {Object.values(nodes).map((node) => (
        <Mesh key={node.id} node={node} />
      ))}
    </group>
  )
}

// Preload all flower models
useGLTF.preload('/3d/flower-pot-bit.gltf')
useGLTF.preload('/3d/flower-pot-bit-2.gltf')
useGLTF.preload('/3d/flower-pot-bit-3.gltf')
