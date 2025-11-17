import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

const Auth = () => {
    const [authTab, setAuthTab] = useState('Login')
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const navigate = useNavigate()

    return (
        <div className="relative flex min-h-screen w-full bg-white lg:h-screen">
            {/* Mobile background image with overlay */}
            <div
                className="absolute inset-0 lg:hidden"
                style={{
                    backgroundImage: 'url("https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>
            <div className="absolute inset-0 lg:hidden bg-black/40"></div>

            {/* Back button - visible on mobile */}
            <button onClick={() => navigate({ to: '/' })} className="lg:hidden fixed top-4 left-4 z-20 p-2 hover:bg-white/20 rounded-lg transition-colors flex gap-2 items-center font-bold text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back Home
            </button>

            {/* Left Side - Desktop Hero Image */}
            <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-start bg-emerald-50/60">
                <button onClick={() => navigate({ to: '/' })} className="mb-4 p-2 hover:bg-emerald-100 rounded-lg transition-colors flex gap-2 items-center font-bold">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back Home
                </button>
                <div
                    className="flex-1 bg-center bg-no-repeat bg-cover rounded-xl"
                    style={{
                        backgroundImage: 'url("https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center py-16 px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 min-h-screen lg:min-h-auto lg:h-screen ">
                <div className="flex flex-col max-w-md w-full gap-4 bg-white/95 lg:bg-white/85 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 lg:border-2 lg:border-emerald-200 ">
                    {/* Page Heading */}
                    <div className="flex flex-col gap-2 text-center mb-2">
                        <p className="text-slate-900 text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.033em]">
                            {authTab === 'Login' ? 'Welcome Back!' : 'Join LifeAtlas'}
                        </p>
                        <p className="text-slate-500 text-sm font-normal leading-normal">
                            {authTab === 'Login'
                                ? 'Continue your wildlife adventure'
                                : 'Start exploring and sharing wildlife today'
                            }
                        </p>
                    </div>

                    {/* Google Sign In Button */}
                    <div className="flex px-0 py-2 justify-center">
                        <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-slate-900 gap-3 text-base font-bold leading-normal tracking-[0.015em] border border-emerald-200 hover:bg-emerald-50 transition-colors">
                            <svg className="w-6 h-6" height="100" viewBox="0 0 48 48" width="100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"></path>
                                <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"></path>
                                <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" fill="#4CAF50"></path>
                                <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.678,44,34.008,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"></path>
                            </svg>
                            <span className="truncate">Sign in with Google</span>
                        </button>
                    </div>

                    {/* OR Separator */}
                    <p className="text-slate-600 text-xs font-normal leading-normal py-1 px-4 text-center">OR</p>

                    {/* Segmented Buttons for Login/Register */}
                    <div className="flex px-0 py-2">
                        <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-white p-1 border border-emerald-100">
                            <button
                                onClick={() => setAuthTab('Login')}
                                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all ${authTab === 'Login'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'text-slate-600 hover:text-emerald-600'
                                    }`}
                            >
                                <span className="truncate">Login</span>
                            </button>
                            <button
                                onClick={() => setAuthTab('Register')}
                                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all ${authTab === 'Register'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'text-slate-600 hover:text-emerald-600'
                                    }`}
                            >
                                <span className="truncate">Register</span>
                            </button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form className="flex flex-col gap-3">
                        {authTab === 'Register' && (
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-900" htmlFor="fullname">
                                    Full Name
                                </label>
                                <input
                                    id="fullname"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-slate-900" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-900" htmlFor="password">
                                    Password
                                </label>
                                {authTab === 'Login' && (
                                    <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                                        Forgot Password?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-emerald-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path>
                                            <path d="M15.171 13.576l1.472 1.473a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l1.473 1.473A10.014 10.014 0 00.458 10c1.274 4.057 5.065 7 9.542 7 2.181 0 4.322-.665 6.171-1.906z"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {authTab === 'Register' && (
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-4 h-4 rounded accent-emerald-600 dark:accent-emerald-500"
                                />
                                <label htmlFor="terms" className="text-slate-600 text-sm">
                                    I agree to the{' '}
                                    <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                                        Terms of Service
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        )}

                        {/* Primary Action Button */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-emerald-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-emerald-700 transition-colors focus:ring-4 focus:ring-emerald-200/50 mt-2"
                        >
                            <span>{authTab === 'Login' ? 'Log In' : 'Create Account'}</span>
                        </button>
                    </form>

                    {/* Footer Text */}
                    <p className="text-xs text-center text-slate-500 pt-2 leading-relaxed">
                        By continuing, you agree to our{' '}
                        <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                            Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export const Route = createFileRoute('/auth')({
    component: Auth,
})