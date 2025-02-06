import connectToDatabase from '@/app/lib/mongodb';
import Whitelist from '@/models/Whitelist';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const entries = await Whitelist.find();
  return NextResponse.json(entries, { status: 200 });
}

export async function POST(req) {
  await connectToDatabase();
  const { xHandle, telegram, website, contractAddress } = await req.json();
  const newEntry = new Whitelist({ xHandle, telegram, website, contractAddress });
  await newEntry.save();
  return NextResponse.json(newEntry, { status: 201 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  await Whitelist.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Entry deleted' }, { status: 200 });
}

export async function PUT(req) {
  await connectToDatabase();
  const { id, ...data } = await req.json();
  await Whitelist.findByIdAndUpdate(id, data);
  return NextResponse.json({ message: 'Entry updated' }, { status: 200 });
}