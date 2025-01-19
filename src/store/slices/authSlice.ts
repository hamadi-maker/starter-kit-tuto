import { createSlice } from '@reduxjs/toolkit'

const user = {
  id: '',
  name: '',
  email: '',
  image: '',
  role: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    status: 'unauthenticated' // authenticated, loading
  },
  reducers: {
    setUser: (state, action) => {
      console.log(' action from slice ', action.payload)
      state.user = action.payload
      state.status = 'authenticated'
    },
    clearUser: state => {
      state.user = user
      state.status = 'unauthenticated'
    }
  }
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
