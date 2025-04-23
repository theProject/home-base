import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          {/* LOGO */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 226.28 266.77"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-auto"
          >
            <defs>
              <style>{`
                .cls-1 { fill: #e20074; }     /* pink – always */
                .cls-2 { fill: #000; }        /* black in light mode  */
                .dark .cls-2 { fill: teal; }  /* teal in dark mode   */
              `}</style>
            </defs>

            <g id="cubeLayer">
              <g id="cubeGroup">
                <path
                  className="cls-1"
                  d="M138.29.23c11.21-2.12,17.12,11.03,8.99,18.11l-114.61,63.47c-4.45,2.52-8.07,5.6-9.41,10.75.35,29.27-2.26,60.59-.55,89.74.42,7.2,2.19,10.84,8.22,14.82,16.21,10.68,34.72,20.13,51.47,30.13,4.61,2.75,21.62,12.48,23.86,15.98,4.98,7.77-2.87,18.63-11.77,13.21-27.25-17.14-56.29-31.77-83.42-49.06-7.1-4.52-10.28-6.35-10.91-15.49-.54-7.73.48-15.85.52-23.52.1-17.29.09-34.6,0-51.88-.05-9.02-.99-18.26-.52-27.36.5-9.79,2.1-12.86,10.43-17.89,6.72-4.06,14.63-7.6,21.6-11.52,27.65-15.58,55.34-31.06,83.04-46.56,4.72-2.64,19-12.16,23.07-12.93Z"
                />
                <path
                  className="cls-1"
                  d="M54.42,198.83c-1.01.1-1.8,0-2.75-.37-2.78-1.08-12.43-6.93-15.16-8.83s-4.49-3.52-5-7l-.14-83.89c.15-6.5,5.9-8.97,10.74-11.82,18.16-10.71,37.79-20.33,56.32-30.56,12.41-6.84,26-15.98,38.55-21.93,8.8-4.18,11.39-2.72,19.53,1.61,16.59,8.83,37.33,21.11,52.92,31.56,1.76,1.18,5.5,2.67,2.9,4.74-2.29,1.82-7.84,4.5-10.7,6.1-7.98,4.47-18.31,10.79-26.4,14.4-2.93,1.31-3.67.85-6.41-.47-12.38-5.99-25.45-17.09-37.74-22.26-6.83-2.87-12.63-2.52-19.37.48-16.59,7.4-33.08,19.78-49.75,27.53-3.04,1.76-7.52,7.68-7.52,11.2v89.52Z"
                />
                <path
                  className="cls-2"
                  d="M120.06,77.52c7.11-.87,17.62,7.32,23.88,10.91,5.41,3.1,12.34,6.23,17.37,9.51.46.3,1.28.55,1.1,1.29l-45.75,25.3c-7.45,4.61-8.87,6.95-9.47,15.97-1.19,17.82.36,36.43.52,54.24.06,7.07.54,15.69-.03,22.57-1.33,16.17-15.52,3.43-22.41-.61-5.75-3.37-19.76-9.43-21.15-16.29-1.66-8.2-.15-18.46-.09-26.75.14-20.63-.19-41.26.03-61.89.49-4.04,2.41-5.74,5.56-7.88,14.74-7.11,29.31-17.28,43.98-24.18,1.69-.79,4.64-1.97,6.45-2.19Z"
                />
                <path
                  className="cls-1"
                  d="M119.86,264.91c-.87-.85-1.87-3.21-2.04-4.44-.49-3.51-.39-12.16-.06-15.82.58-6.48,7.64-9.75,12.66-12.78,18.49-11.2,39.55-20.58,57.59-32.17,5.44-3.5,10.26-7.62,10.91-14.53l.2-86.2c.62-3.95,2.48-6.07,5.58-8.34,2.43-1.78,14.09-8.28,16.57-8.41,4.05-.2,4.95,4.2,5.02,7.39v113.8c-.48,3.81-1.23,7.55-4.08,10.32-30.63,18.21-62,35.56-93.38,52.53-2.49.97-7.02.52-8.96-1.36Z"
                />
                <path
                  className="cls-2"
                  d="M120.72,224.2c-.12-.08-.85-2.28-.92-2.68-3.95-24.57.75-53.89-1.1-79.11.33-3.9,3.5-6.76,6.6-8.76,3.54-2.28,25.03-14.03,27.87-14.37,7.33-.9,9.56,4.77,11.87,10.44.52-.47.95-1.09,1.1-1.78.73-3.49.43-8.42,1.14-12.3.79-4.31,1.44-4.94,5.04-7.44,5.89-4.09,16.25-9.41,17.94,1.58-1.29,23.18,1.65,48.1,0,71.08-.53,7.35-3.51,8.85-9.38,12.22-5.44,3.12-11.37,5.56-16.88,8.56-11.71,6.38-23.14,13.6-34.88,19.84-1.72.92-6.71,3.81-8.41,2.73Z"
                />
              </g>
            </g>
          </svg>

          <span className="font-geist text-xl font-medium text-black dark:text-white">
            theProject<span className="text-magenta">.</span>
          </span>
        </div>

        {/* NAV LINKS – desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/projects"
            className="text-sm font-geist text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/services"
            className="text-sm font-geist text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="text-sm font-geist text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-geist text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-geist text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <ThemeToggle />
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
          aria-label="Open main navigation"
            className="text-black dark:text-white"
                  >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
