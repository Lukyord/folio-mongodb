import React from 'react'

// Component for rendering category badges
const CategoryBadge = ({ category }: { category: string }) => {
  const trimmedCategory = category.trim()

  if (trimmedCategory === 'In-House') {
    return <span className="category-inhouse">{trimmedCategory}</span>
  }

  if (trimmedCategory === 'Freelance') {
    return <span className="category-freelance">{trimmedCategory}</span>
  }

  return <span>{trimmedCategory}</span>
}

// Component for rendering multiple categories
export default function CategoryList({ categories }: { categories: string }) {
  const categoryArray = categories.split(', ')

  return (
    <>
      {categoryArray.map((category, index) => (
        <React.Fragment key={index}>
          <CategoryBadge category={category} />
          {index < categoryArray.length - 1 && ', '}
        </React.Fragment>
      ))}
    </>
  )
}
