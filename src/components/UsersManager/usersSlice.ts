import { createUser, deleteUser, listUsers } from '@/api/reduxApi/userApi'
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
  addUserStatus: ApiStatus
  deleteUserStatus: ApiStatus
  deletingUserId: User['id'] | null
}

const initialState: UsersState = {
  users: [],
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id)
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
    builder.addCase(addUserB.pending, (state, action) => {
      state.addUserStatus = 'PENDING'
    })
    builder.addCase(addUserB.fulfilled, (state, action) => {
      state.users.push(action.payload.user)
      state.addUserStatus = 'SUCCESS'
    })
    builder.addCase(addUserB.rejected, (state, action) => {
      state.addUserStatus = 'ERROR'
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(removeUserB.pending, (state, action) => {
      state.deletingUserId = action.meta.arg.id
      state.deleteUserStatus = 'PENDING'
    }),
      builder.addCase(removeUserB.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (_user) => _user.id !== action.payload.id
        )
        state.deleteUserStatus = 'SUCCESS'
        state.deletingUserId = null
      })
    builder.addCase(removeUserB.rejected, (state, action) => {
      state.deleteUserStatus = 'ERROR'
      state.deletingUserId = null
    })
  },
})
export const { setUsers, selectUser, removeUser, addUser } = usersSlice.actions
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
