'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function RegisterPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`)
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Failed to fetch event:', error)
      }
    }
    
    if (id) {
      fetchEvent()
    }
  }, [id])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Register for {event.title}</h1>
      {/* Your registration form components */}
    </div>
  )
}
