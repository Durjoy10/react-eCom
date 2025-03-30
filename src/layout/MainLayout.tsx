import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Loader } from '../components/Loader'
import { Suspense, useState, useEffect } from 'react'

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Shorter duration since it's not the root loader
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense 
        fallback={
          <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <Loader size="large" />
          </div>
        }
      >
        <div className='flex-1'>
          <Outlet />       
        </div>             
      </Suspense>
    </div>
  )
}

export default MainLayout