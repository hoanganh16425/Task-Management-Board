import { NextResponse } from 'next/server'

const ASSIGNEE = [
  { id: '1', name: 'John Doe', avatar: '/johnDoe.jpg' },
  { id: '2', name: 'Jane Smith', avatar: '/JaneSmith.jpg' },
  { id: '3', name: 'Alice Johnson', avatar: '/AliceJohnson.jpg' },
]

export async function GET() {
  return NextResponse.json(ASSIGNEE)
}
