import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, forwardRef, useImperativeHandle } from 'react'

function Mesh({ node }) {
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

const Flower = forwardRef(
  (
    {
      modelPath,
      scale = [1, 1, 1],
      position = [0, 0, 0],
      rotationSpeed = 0.3,
      visible = true,
      rotation = [0, 0, 0],
    },
    ref,
  ) => {
    const { nodes } = useGLTF(modelPath)
    const groupRef = useRef()

    useImperativeHandle(ref, () => groupRef.current)

    useFrame((state, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * rotationSpeed
      }
    })

    return (
      <group ref={groupRef} scale={scale} position={position} visible={visible}>
        <group rotation={rotation}>
          {Object.values(nodes).map((node) => (
            <Mesh key={node.id} node={node} />
          ))}
        </group>
      </group>
    )
  },
)

Flower.displayName = 'Flower'

export default Flower

// Preload all flower models
useGLTF.preload('/3d/flower-pot-bit.gltf')
useGLTF.preload('/3d/flower-pot-bit-2.gltf')
useGLTF.preload('/3d/flower-pot-bit-3.gltf')
