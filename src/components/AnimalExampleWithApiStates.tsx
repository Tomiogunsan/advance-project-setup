import { fetchDog } from '@/api/animalApi'
import { withAsync } from '@/helpers/WithAsync'
import { useEffect, useState } from 'react'

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

const useFetchDog = () => {
  const [dog, setDog] = useState<string>()
  const [fetchDogStatus, setFetchDogStatus] = useState<ApiStatus>('IDLE')

  const initFetchDog = async () => {
    setFetchDogStatus('PENDING')
    const { response, error } = await withAsync(() => fetchDog())
    if (error) {
      setFetchDogStatus('ERROR')
    } else if (response) {
      setDog(response.data.message)
      setFetchDogStatus('SUCCESS')
    }
  }
}
