// MUI Imports
import Button from '@mui/material/Button'

import ReduxProvider from '@/providers/reduxProvider'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getMode, getSystemMode } from '@core/utils/serverHelpers'
import { EdgeStoreProvider } from '@/lib/edgestore'

import { auth } from '@/auth'

const Layout = async (props: ChildrenType) => {
  const { children } = props

  const session = await auth()

  // Vars
  const direction = 'ltr'
  const mode = await getMode()
  const systemMode = await getSystemMode()

  return (
    <ReduxProvider session={session}>
      <Providers direction={direction}>
        <EdgeStoreProvider>
          <LayoutWrapper
            systemMode={systemMode}
            verticalLayout={
              <VerticalLayout navigation={<Navigation mode={mode} />} navbar={<Navbar />} footer={<VerticalFooter />}>
                {children}
              </VerticalLayout>
            }
            horizontalLayout={
              <HorizontalLayout header={<Header />} footer={<HorizontalFooter />}>
                {children}
              </HorizontalLayout>
            }
          />
        </EdgeStoreProvider>
        <ScrollToTop className='mui-fixed'>
          <Button
            variant='contained'
            className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
          >
            <i className='tabler-arrow-up' />
          </Button>
        </ScrollToTop>
      </Providers>
    </ReduxProvider>
  )
}

export default Layout
