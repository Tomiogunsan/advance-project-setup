import GlobalSpinner from '@/components/GlobalSpinner'
import { useToggleState } from '@/hooks/useToggleState'
import { createContext } from 'react'

export type GlobalSpinnerContextValue = {
  isSpinnerVisible: boolean
  showSpinner: () => void
  hideSpinner: () => void
  toggleSpinner: () => void
}
export const GlobalSpinnerContext = createContext<
  GlobalSpinnerContextValue | undefined
>(undefined)
type GlobalSpinnerContextProviderProps = {
  children: React.ReactNode
}
const GlobalSpinnerContextProvider = (
  props: GlobalSpinnerContextProviderProps
) => {
  const { children } = props
  const {
    state: isSpinnerVisible,
    open: showSpinner,
    close: hideSpinner,
    toggle: toggleSpinner,
  } = useToggleState(false)

  const values = useMemo(() => {
    return {
      isSpinnerVisible,
      showSpinner,
      hideSpinner,
      toggleSpinner,
    }
  }, [isSpinnerVisible])
  return (
    <GlobalSpinnerContext.Provider
      value={values}
    >
      {children}
      <GlobalSpinner show={isSpinnerVisible} />
    </GlobalSpinnerContext.Provider>
  )
}
export default GlobalSpinnerContextProvider
