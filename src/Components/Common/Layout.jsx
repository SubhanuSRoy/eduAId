import React from "react";

function Layout({ children }) {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center  p-4">
      <nav className="w-full md:w-3/4 rounded-md border-2 border-gray-500 px-3 py-2 flex h-16 items-center justify-between">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <a class="block font-bold text-3xl text-accent" href="/">
            <span className="text-prim">K</span>a
            <span className="text-prim">R</span>m
            <span className="text-prim">A</span>
          </a>
        </div>

        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Chat
                </a>
              </li>

              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a
                class="rounded-md bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/"
              >
                Login
              </a>

              <div class="hidden sm:flex">
                <a
                  class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-pink-600"
                  href="/"
                >
                  Register
                </a>
              </div>
            </div>

            <div class="block md:hidden">
              <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Layout;
