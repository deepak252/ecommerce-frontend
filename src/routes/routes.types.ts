export type RouteData = {
  id: string
  path?: string
  element?: React.ReactNode
  children?: RouteData[]
}
