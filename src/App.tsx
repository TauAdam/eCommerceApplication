import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addContact, removeContact } from './redux/slices/contactSlice'
import { RootState } from './redux/store/store'

function App() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts)
  const dispatch = useDispatch()

  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      name: 'New Contact',
    }
    dispatch(addContact(newContact))
  }

  const handleRemoveContact = (contactId: number) => {
    dispatch(removeContact(contactId))
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit" onClick={handleAddContact}>
              New
            </button>
          </form>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <Link to={`contacts/${contact.id}`}>{contact.name}</Link>
                <button onClick={() => handleRemoveContact(contact.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

export default App
