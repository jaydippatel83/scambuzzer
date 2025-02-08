import connectToDatabase from '@/app/lib/mongodb';
import Whitelist from '@/models/Whitelist'; 
import { NextResponse } from 'next/server';  

export async function POST(req, { params }) {
  const { id } = params;
  try {
    await connectToDatabase();
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await Whitelist.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Entry deleted' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting whitelist:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}