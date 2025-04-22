import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Loader } from '../components/Loader'
import { Navbar } from '../components/Navbar'

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <Loader size="large" />
          </div>
        }
      >
        <main className="flex-1">
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </div>
  )
}

export default MainLayout