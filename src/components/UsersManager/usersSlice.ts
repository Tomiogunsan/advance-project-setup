import { createUser, deleteUser, listUsers } from '@/api/reduxApi/userApi'
import { RootState } from '@/store'
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { User } from './UsersManager.types'

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

export type UsersState = {
  selectedUserId: User['id'] | null
  fetchUsersStatus: ApiStatus
  addUserStatus: ApiStatus
  deleteUserStatus: ApiStatus
  deletingUserId: User['id'] | null
}

const initialState: UsersState = {
  selectedUserId: null,
  fetchUsersStatus: 'IDLE',
  addUserStatus: 'IDLE',
  deleteUserStatus: 'IDLE',
  deletingUserId: null,
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers)
export const addUserB = createAsyncThunk('users/addUser', createUser)
export const removeUserB = createAsyncThunk(
  'users/removeUser',
  async (userData: User) => {
    await deleteUser(userData.id)
    return userData
  }
)

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.email.localeCompare(b.email),
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UsersState>(initialState),
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      usersAdapter.setAll(state, action.payload)
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
    // addUser: (state, action: PayloadAction<User>) => {
    //   state.usersAdapter.push(action.payload)
    // },
    // removeUser: (state, action: PayloadAction<User>) => {
    //   state.users = state.users.filter((user) => user.id !== action.payload.id)
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.fetchUsersStatus = 'PENDING'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = 'SUCCESS'
      usersAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.fetchUsersStatus = 'ERROR'
    })
    builder.addCase(addUserB.pending, (state, action) => {
      state.addUserStatus = 'PENDING'
    })
    builder.addCase(addUserB.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload.user)
      state.addUserStatus = 'SUCCESS'
    })
    builder.addCase(addUserB.rejected, (state, action) => {
      state.addUserStatus = 'ERROR'
    })
    builder.addCase(removeUserB.pending, (state, action) => {
      state.deletingUserId = action.meta.arg.id
      state.deleteUserStatus = 'PENDING'
    })
    builder.addCase(removeUserB.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.payload.id)
      state.deleteUserStatus = 'SUCCESS'
      state.deletingUserId = null
    })
    builder.addCase(removeUserB.rejected, (state, action) => {
      state.deleteUserStatus = 'ERROR'
      state.deletingUserId = null
    })
  },
})
export const { setUsers, selectUser } = usersSlice.actions

export const usersSelector = usersAdapter.getSelectors<RootState>(
  (state) => state.users
)
export const getSelectedUser = (state: RootState) => {
  return state.users.selectedUserId
    ? usersSelector.selectById(state, state.users.selectedUserId)
    : null
}
export const { selectAll: selectAllUsers } = usersSelector
export default usersSlice.reducer
