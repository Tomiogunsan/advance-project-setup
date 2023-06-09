import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import AddUsers from './components/AddUsers'
import DisplayUsers from './components/DisplayUsers'
import SelectedUserDetails from './components/SelectedUserDetails'
import { fetchUsers, selectTotalUsers } from './usersSlice'

type UsersManagerProps = {}

const UsersManager = (props: UsersManagerProps) => {
  const dispatch = useAppDispatch()
  const fetchUsersStatus = useAppSelector(
    (state) => state.users.fetchUsersStatus
  )

  const totalUsers = useAppSelector(selectTotalUsers)

  useEffect(() => {
    if (totalUsers) return
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      {fetchUsersStatus === 'SUCCESS' ? (
        <div className='grid grid-cols-12 gap-4 px-4'>
          {' '}
          <div className='col-span-4'>
            <AddUsers />
          </div>
          <div className='col-span-4'>
            <DisplayUsers />
          </div>
          <div className='col-span-4'>
            <SelectedUserDetails />
          </div>{' '}
        </div>
      ) : null}
      {fetchUsersStatus === 'ERROR' ? (
        <p>There was a problem fetching users</p>
      ) : null}
    </div>
  )
}
export default UsersManager
