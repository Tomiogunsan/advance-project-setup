import { listUsers } from '@/api/reduxApi/userApi'
import { RootState } from '@/store'
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { User } from './UsersManager.types'
type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'
export type UsersState = {
  users: User[]
  selectedUserId: User['id'] | null
  fetchUsersStatus: ApiStatus
}
const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  fetchUsersStatus: 'IDLE',
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers)
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.fetchUsersStatus = 'PENDING'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = 'SUCCESS'
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.fetchUsersStatus = 'ERROR'
    })
  },
})
export const { setUsers, selectUser } = usersSlice.actions
export const getSelectedUser = createSelector(
  (state: RootState) => state.users,
  (users) => {
    if (users.selectedUserId) {
      return users.users.find((user) => user.id === users.selectedUserId)
    }
    return null
  }
)
export default usersSlice.reducer
