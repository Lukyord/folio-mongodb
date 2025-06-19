import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import SortOfFlower from '../../../../public/3d/sort_of_flower/Sort-flower'
import SteelFlower from '../../../../public/3d/steel_flower/Steel_flower'
import { Suspense } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'

// Helper function to get responsive scales and positions
const getResponsiveProps = (screenWidth: number) => {
  if (screenWidth < 768) {
    // Mobile screens
    return {
      sortOfFlowerScale: 0.3,
      sortOfFlowerPosition: [-1.2, 3, -1] as [number, number, number],
      steelFlowerScale: 1.2,
      steelFlowerPosition: [2.5, -4, -1] as [number, number, number],
    }
  } else {
    // Desktop screens
    return {
      sortOfFlowerScale: 0.5,
      sortOfFlowerPosition: [-7, 3, -2] as [number, number, number],
      steelFlowerScale: 1.5,
      steelFlowerPosition: [10, -3, -2] as [number, number, number],
    }
  }
}

export default function Background3d() {
  const screenSize = useScreenSize()
  const responsiveProps = getResponsiveProps(screenSize.width)

  return (
    <Canvas className="canvas-3d">
      <Suspense fallback={null}>
        <Float
          scale={responsiveProps.sortOfFlowerScale}
          position={responsiveProps.sortOfFlowerPosition}
          rotation={[0, 0, 0.5]}
        >
          <SortOfFlower />
        </Float>

        <Float
          scale={responsiveProps.steelFlowerScale}
          position={responsiveProps.steelFlowerPosition}
        >
          <SteelFlower />
        </Float>

        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
