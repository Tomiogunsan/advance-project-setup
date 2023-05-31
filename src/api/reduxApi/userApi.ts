import { User } from '@/components/UsersManager/UsersManager.types'
import api from '../api'

export const listUsers = () => {
  return api
    .get<{ users: User[] }>('/user/all')
    .then((res: { data: { users: User[] } }) => res.data.users)
}
export const createUser = (user: User) => {
  return api
    .post<{ user: User }>('/user', user)
    .then((res: { data: any }) => res.data)
}
export const deleteUser = (id: string) => {
  return api.delete(`/user/${id}`)
}
