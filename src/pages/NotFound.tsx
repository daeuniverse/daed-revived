import { useLocation } from 'react-router-dom'

export const NotFound = () => {
  const location = useLocation()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <p>{location.pathname}</p>

      <p className="text-lg font-bold">404. Not Found</p>
    </div>
  )
}
