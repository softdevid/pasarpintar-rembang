import { Link } from '@inertiajs/react'
import React from 'react'

const MidFooter = () => {
  return (
    <>
      <footer className="bg-gray-50 rounded-lg shadow">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://pasarpintar.biz" className="flex items-center justify-center mb-4 sm:mb-0">
              <img src="https://res.cloudinary.com/dbsgoesdj/image/upload/v1685780726/SAVE_20230603_101357_csrq3s.jpg" className="h-12 mr-3" alt="Pasar Pintar" />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pasar Pintar</span> */}
            </a>
            <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span> */}
        </div>
      </footer>
    </>
  )
}

export default MidFooter
