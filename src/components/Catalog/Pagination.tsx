import React from 'react'
import s from './Catalog.module.css'

type setFunction<T> = (arg: T) => void

interface Props {
  currentPage: number
  setCurrentPage: setFunction<number>
  lastPage: boolean
  limit: number
  setLimit: setFunction<number>
}

const isDisabled = (disabled: boolean) => (disabled ? s.disabled : '')
const isFirstPage = (page: number) => (page === 0 ? true : false)

export function Pagination({ currentPage, setCurrentPage, lastPage, limit, setLimit }: Props) {
  return (
    <>
      <div className={s.paginationWrapper}>
        <button
          className={isDisabled(isFirstPage(currentPage))}
          onClick={() => {
            if (!isFirstPage(currentPage)) {
              setCurrentPage(currentPage - 1)
            }
          }}
        >
          {'<'}
        </button>
        <div>{currentPage + 1}</div>
        <button
          className={isDisabled(lastPage)}
          onClick={() => {
            if (!lastPage) {
              setCurrentPage(currentPage + 1)
            }
          }}
        >
          {'>'}
        </button>
      </div>
      {limit === 10 && (
        <h3
          className={s.limitHandler}
          onClick={() => {
            setLimit(5)
          }}
        >
          Show <span>less</span> products per page
        </h3>
      )}
      {limit !== 10 && (
        <h3
          className={s.limitHandler}
          onClick={() => {
            setLimit(10)
          }}
        >
          Show <span>more</span> products per page
        </h3>
      )}
    </>
  )
}
