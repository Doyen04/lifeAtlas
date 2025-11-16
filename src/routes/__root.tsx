import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header, Footer } from '../components'

const RootLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
        <TanStackRouterDevtools />
    </div>
)

export const Route = createRootRoute({ component: RootLayout })