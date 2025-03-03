import React from 'react'

function Main({ children }) {
  return (
    <main className="h-full overflow-y-auto mt-[60px] md:mt-0">
  {children}
    </main>
  )
}

export default Main
