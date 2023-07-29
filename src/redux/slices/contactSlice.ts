import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Contact {
  id: number
  name: string
}

export interface ContactState {
  contacts: Contact[]
}

const initialState: ContactState = {
  contacts: [
    { id: 1, name: 'Your Name' },
    { id: 2, name: 'Your Friend' },
  ],
}

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload)
    },
  },
})

export const { addContact, removeContact } = contactSlice.actions
export default contactSlice.reducer
