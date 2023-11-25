'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Pet = {
  id: string
  name: string
  imageUrl: string
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pets', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPets(data.pets)
        setLoading(false)
      })
  }, [])

  if (isLoading)
    return (
      <>
        <main className="mx-auto max-w-[1960px] p-4">
          <p className="text-lg">Loading...</p>
        </main>
      </>
    )
  if (!pets) return <p>No profile data</p>

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {pets.map(({ id, imageUrl, name }) => (
            <Link
              key={id}
              href={`/pets/${id}`}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={name}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                src={imageUrl}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
              <div className="absolute bottom-0 left-0 bg-indigo-600 bg-opacity-30 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out w-full rounded-b">
                {name}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
