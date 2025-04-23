export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 bg-white dark:bg-black border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="font-geist text-lg text-black dark:text-white">
              theProject<span className="text-magenta">.</span>
            </p>
            <p className="text-sm text-black/60 dark:text-neutral-400 mt-2">
              © {currentYear} theProject. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
