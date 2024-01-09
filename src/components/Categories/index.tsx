import React, { useState } from 'react'
import { Category, categories } from 'components/share/categories'
import { getProductsFromCategory } from 'utils/requests'
import { useAppDispatch } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import './style.css'

export default function Categories() {
  const [chain, setChain] = useState([] as string[])
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const showOrHide = (isOpen: boolean) => (isOpen ? 'скрыть' : 'показать')
  const hasChild = (length: number) => (length === 0 ? 'category-child' : '')

  const showCategory = (element: Category) => {
    const children = [] as Category[]
    for (const key in categories) {
      if (categories[key].parent?.id === element.id) {
        children.push(categories[key])
      }
    }

    return (
      <li
        key={element.id}
        onClick={async (event) => {
          event.stopPropagation()
          try {
            dispatch(productsRequested())

            const products = await getProductsFromCategory(element.id)
            const productDetails = parseFetchedData(products)

            dispatch(productsLoaded(productDetails))
          } catch (error) {
            if (error instanceof Error) {
              dispatch(productsError(error.message))
            }
          }

          const chain = updateCategoryChain(event, element.id)
          setChain(chain)
        }}
      >
        <span className={hasChild(children.length)}>{element.title}</span>
        {children.length > 0 && (
          <ul>
            {children.map((child) => {
              return <div key={child.id}>{showCategory(child)}</div>
            })}
          </ul>
        )}
      </li>
    )
  }

  const updateCategoryChain = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
    event.stopPropagation()
    let current
    const result = [] as string[]
    for (const key in categories) {
      if (categories[key].id === id) {
        current = categories[key]
      }
    }
    if (current) result.push(current.title)
    while (current?.parent) {
      for (const key in categories) {
        if (current.parent && categories[key].id === current.parent.id) {
          current = categories[key]
          break
        }
      }
      result.unshift(current.title)
    }
    return result
  }

  const showChain = (elements: string[]) => {
    const lastIndex = elements.length - 1
    const addDivider = (index: number, lastIndex: number) => (index === lastIndex ? '' : ' > ')
    const setActive = (index: number, lastIndex: number) =>
      index === lastIndex ? 'category__element active' : 'category__element'
    return elements.map((element, index) => (
      <span key={index} className={setActive(index, lastIndex)}>
        {element}
        {addDivider(index, lastIndex)}
      </span>
    ))
  }

  return (
    <>
      <div className="chain-wrapper">{showChain(chain) || ''}</div>
      <span
        onClick={() => {
          setOpen(!open)
        }}
      >
        <span className="categories__button">{showOrHide(open)}</span> категории
      </span>
      {open && (
        <ul className="categories__wrapper">
          {showCategory(categories.men)}
          {showCategory(categories.women)}
          {showCategory(categories.kids)}
        </ul>
      )}
    </>
  )
}
