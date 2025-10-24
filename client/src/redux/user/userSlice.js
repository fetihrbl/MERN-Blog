import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null

const initialState = {
  currentUser: storedUser,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
      localStorage.setItem('currentUser', JSON.stringify(action.payload))
    },
    signInFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    signOut: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
      localStorage.removeItem('currentUser')
    },
  },
})

export const { signInStart, signInSuccess, signInFailure, signOut } = userSlice.actions

export default userSlice.reducer
