'use client'

import React, { useEffect, useCallback, useRef } from 'react'

export default function BlocksHover() {
  const blocksContainerRef = useRef<HTMLDivElement>(null)
  const lastHoveredBlockRef = useRef<HTMLElement | null>(null)

  // Memoized neighbor calculation
  const getNeighbors = useCallback(
    (block: HTMLElement, blocksPerRow: number, totalRows: number): HTMLElement[] => {
      const index = parseInt(block.dataset.index || '0')
      const currentRow = Math.floor(index / blocksPerRow)
      const currentCol = index % blocksPerRow

      const neighbors: HTMLElement[] = []
      const directions: [number, number][] = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
      ]

      directions.forEach(([rowOffset, colOffset]: [number, number]) => {
        const newRow = currentRow + rowOffset
        const newCol = currentCol + colOffset

        if (newRow >= 0 && newRow < totalRows && newCol >= 0 && newCol < blocksPerRow) {
          const neighborIndex = newRow * blocksPerRow + newCol
          const neighbor = block.parentElement?.querySelector(
            `[data-index="${neighborIndex}"]`,
          ) as HTMLElement
          if (neighbor) {
            neighbors.push(neighbor)
          }
        }
      })

      return neighbors
    },
    [],
  )

  // Optimized highlight function
  const highlightBlockAndNeighbors = useCallback(
    (event: Event) => {
      const block = event.target as HTMLElement

      if (block === lastHoveredBlockRef.current) {
        return
      }

      lastHoveredBlockRef.current = block

      const blockSize = 0.05 * window.innerWidth
      const blocksPerRow = Math.floor(block.parentElement!.clientWidth / blockSize)
      const totalRows = Math.floor(block.parentElement!.clientHeight / blockSize)

      const allNeighbors = getNeighbors(block, blocksPerRow, totalRows)

      block.classList.add('highlight')
      setTimeout(() => {
        block.classList.remove('highlight')
      }, 1000)

      // Random selection (1-3 neighbors)
      const minNeighbors = 1
      const maxNeighbors = 3
      const numberOfNeighborsToHighlight = Math.floor(
        Math.random() * (maxNeighbors - minNeighbors + 1) + minNeighbors,
      )

      const shuffledNeighbors = allNeighbors.sort(() => Math.random() - 0.5)

      const selectedNeighbors = shuffledNeighbors.slice(0, numberOfNeighborsToHighlight)

      selectedNeighbors.forEach((neighbor) => {
        neighbor.classList.add('highlight')
        setTimeout(() => {
          neighbor.classList.remove('highlight')
        }, 1000)
      })

      // Reset lastHoveredBlock after animation
      setTimeout(() => {
        if (lastHoveredBlockRef.current === block) {
          lastHoveredBlockRef.current = null
        }
      }, 1000)
    },
    [getNeighbors],
  )

  useEffect(() => {
    const blocksContainer = blocksContainerRef.current
    if (!blocksContainer) return

    blocksContainer.innerHTML = ''

    const blockSize = 0.05 * window.innerWidth
    const containerWidth = blocksContainer.clientWidth
    const containerHeight = blocksContainer.clientHeight
    const numberOfBlocks =
      Math.floor(containerWidth / blockSize) * Math.floor(containerHeight / blockSize)

    // Create document fragment for performance
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < numberOfBlocks; i++) {
      const block = document.createElement('div')
      block.className = 'block'
      block.dataset.index = i.toString()
      block.dataset.type = Math.floor(Math.random() * 4 + 1).toString()
      block.addEventListener('mouseenter', highlightBlockAndNeighbors, { passive: true })
      fragment.appendChild(block)
    }

    blocksContainer.appendChild(fragment)

    return () => {
      const blocks = blocksContainer.querySelectorAll('.block')
      blocks.forEach((block) => {
        block.removeEventListener('mouseenter', highlightBlockAndNeighbors)
      })
    }
  }, [highlightBlockAndNeighbors])

  return (
    <div className="block-container">
      <div ref={blocksContainerRef} id="blocks"></div>
    </div>
  )
}
