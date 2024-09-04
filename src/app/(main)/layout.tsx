import React from 'react'

const ServersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full bg-zinc-800 min-h-screen">
      <div className="md:w-[720px] mx-auto">{children}</div>
    </main>
  );
}

export default ServersLayout