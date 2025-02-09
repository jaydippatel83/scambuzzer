import connectToDatabase from '@/app/lib/mongodb'; 
import { NextResponse } from 'next/server';
import Reports from '../../../models/Reports';

export async function GET() {
  try {
    await connectToDatabase();
    const entries = await Reports.find().populate('user'); 
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { link, type, targeting, user } = await req.json(); 
    const newEntry = new Reports({ link, type, targeting, user });
    await newEntry.save();
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    await Reports.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Entry deleted' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...data } = await req.json();
    await Reports.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: 'Entry updated' }, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}