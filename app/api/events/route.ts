import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import clientPromise from '@/app/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()
    
    // If user is admin, return all events
    if (session.user?.role === 'ADMIN') {
      const events = await db.collection('events').find({}).toArray()
      return NextResponse.json(events)
    }
    
    // For regular users, return only public events
    const events = await db.collection('events')
      .find({ isPublic: true })
      .toArray()
    
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role === 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const client = await clientPromise
    const db = client.db()
    
    const result = await db.collection('events').insertOne(body)
    
    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
} 