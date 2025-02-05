import Image from "next/image";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout> 
      <div className="flex flex-col items-center justify-center h-screen"> 
        <h1 className="text-4xl font-bold h-52">Welcome to Scambuzzer</h1>
        <p className="text-lg text-gray-600">Your AI-powered scam detection tool</p>
      </div>
    </Layout>
  );
}
