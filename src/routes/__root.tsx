import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <>
        {/* <header className="bg-linear-to-r from-slate-900 to-slate-800 text-white sticky top-0 z-50 shadow-lg">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight hover:text-emerald-400 transition-colors">
                    LifeAtlas
                </Link>
                <div className="flex gap-8 items-center">
                    <Link
                        to="/"
                        className="text-sm font-medium hover:text-emerald-400 transition-colors [&.active]:text-emerald-400 [&.active]:border-b-2 [&.active]:border-emerald-400 pb-1"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-sm font-medium hover:text-emerald-400 transition-colors [&.active]:text-emerald-400 [&.active]:border-b-2 [&.active]:border-emerald-400 pb-1"
                    >
                        About
                    </Link>
                    <a
                        href="#contribute"
                        className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
                    >
                        Contribute
                    </a>
                </div>
            </nav>
        </header> */}
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })