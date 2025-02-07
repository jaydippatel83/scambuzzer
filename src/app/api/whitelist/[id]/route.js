import connectToDatabase from '@/app/lib/mongodb';
import Whitelist from '@/models/Whitelist'; 
import { NextResponse } from 'next/server';  

export async function POST(req) {
  await connectToDatabase();
  const { id } = await req.json();
  await Whitelist.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Entry deleted' }, { status: 200 });
}