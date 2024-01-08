import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: {},
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload
    },
  },
})

export default postSlice.reducer

export const {getPosts} = postSlice.actions
