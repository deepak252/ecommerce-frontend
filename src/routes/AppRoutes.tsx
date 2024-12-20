import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import { RouteData } from './routes.types'
const HomePage = lazy(() => import('@/pages/HomePage'))

const appRoutes: RouteData[] = [
  {
    id: 'home',
    path: '/',
    element: <HomePage />,
  },
]

const generateRoutes = (routes: RouteData[]) => {
  return routes.map(({ id, path, element, children }) => {
    if (element) {
      element = <Suspense fallback={<Spinner center />}>{element}</Suspense>
    }
    if (path) {
      return (
        <Route key={id} path={path} element={element}>
          {children && generateRoutes(children)}
        </Route>
      )
    } else {
      return <Route key={id} index element={element} />
    }
  })
}

function AppRoutes() {
  return <Routes>{generateRoutes(appRoutes)}</Routes>
}

export default AppRoutes
