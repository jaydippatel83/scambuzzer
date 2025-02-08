import connectToDatabase from '@/app/lib/mongodb';
import Whitelist from '@/models/Whitelist';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const entries = await Whitelist.find();
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error fetching whitelist:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { xHandle, telegram, website, contractAddress } = await req.json();
    const newEntry = new Whitelist({ xHandle, telegram, website, contractAddress });
    await newEntry.save();
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating whitelist:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    await Whitelist.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Entry deleted' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting whitelist:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, ...data } = await req.json();
    await Whitelist.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: 'Entry updated' }, { status: 200 });
  } catch (error) {
    console.error("Error updating whitelist:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}