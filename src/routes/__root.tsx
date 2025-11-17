import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header, Footer } from '../components'

const RootLayout = () => {
    const location = useLocation()
    const isGalleryPage = location.pathname === '/gallery'
    const isUploadPage = location.pathname === '/upload'
    const hideHeaderFooter = isGalleryPage || isUploadPage

    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeaderFooter && <Header />}
            <main className="flex-1">
                <Outlet />
            </main>
            {!hideHeaderFooter && <Footer />}
            <TanStackRouterDevtools />
        </div>
    )
}

export const Route = createRootRoute({ component: RootLayout })