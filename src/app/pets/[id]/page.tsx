'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Pet = {
  id: string
  name: string
  imageUrl: string
  birthDate: string
  gender: string
  owner: Owner
  weights: Weight[]
}

type Owner = {
  id: string
  name: string
}

type Weight = {
  id: string
  weight: number
  date: string
}

// format date
const formatDate = (date: string) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}/${month}/${day}`
}

// weight check
const weightCheck = (weights: Weight[]) => {
  if (!weights.length) {
    return 'No weight data'
  } else {
    return weights[0].weight + 'kg'
  }
}

export default function Pets({ params }: { params: { id: string } }) {
  const id = params.id

  const [pet, setPet] = useState<Pet>({
    id: '',
    name: '',
    imageUrl: '',
    birthDate: '',
    gender: '',
    owner: { id: '', name: '' },
    weights: [{ id: '', weight: 0, date: '' }],
  })
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/pets/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPet(data.pet)
        setLoading(false)
      })
  }, [id])

  if (isLoading)
    return (
      <>
        <main className="mx-auto max-w-[1960px] p-4">
          <p className="text-lg">Loading...</p>
        </main>
      </>
    )
  if (!pet) return <p>No profile data</p>

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="flex rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <Image
              alt={pet.name}
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              src={pet.imageUrl}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </div>
          <div className="p-6">
            <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {pet.name}
            </p>
            <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {formatDate(pet.birthDate)}
            </p>
            <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {pet.gender}
            </p>
            <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {pet.owner.name}
            </p>
            <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {weightCheck(pet.weights)}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
