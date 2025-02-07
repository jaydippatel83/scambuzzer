"use client"; 
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from "next/navigation";
import RadarBackground from './RadarBackground';

export default function HomeComponent() {
  const { ready, authenticated, login, user } = usePrivy();
  const router = useRouter();

  async function createAggent() {
    if (ready && authenticated && user) {
      router.push("/dashboard/subscription");
    } else {  
      await login();
      router.push("/dashboard/subscription");
    }
  }

  return (
    <div className="container mx-auto max-w-5xl section-padding relative">
        <RadarBackground />
      <div className="flex flex-col items-center justify-center text-foreground transition duration-3">

        <h1 className="text-3xl lg:text-4xl font-bold text-center">
          Create an Agent that Detects, Alerts, and Protects Crypto Users from Scams!
        </h1>
        <p className="text-xl text-center mt-2 text-red-600">
          No more: Phishing, Social impersonation, and transactions with Scam Contracts!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl px-4">
          {/* Card 1 */}
          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition">
            <p className="mb-4">
              Protect and secure your brand by creating a commando agent at ScamBuzzer that stops your community from getting scammed.
            </p>
            <button className="px-4 py-2 text-sm text-foreground dark:text-green-300 border border-transparent rounded-md dark:hover:bg-green-400/10 transition-colors hover:bg-green-400/10" onClick={createAggent}>
              Create Agent
            </button>
          </div>

          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition">
            <p className="mb-4">
              Report scam contracts, phishing URLs, or social accounts and earn points for your contribution.
            </p>
            <button className="border border-red-600 px-6 py-2 rounded-md text-red-600 hover:bg-red-600 hover:text-black transition">
              Report & Earn
            </button>
          </div>

          {/* Card 3 */}
          <div className="border border-border-light p-6 rounded-lg text-center hover:border-border-hover transition">
            <p className="mb-4">
              Get a browser extension that stops you from interacting with phishing URLs and explored contracts.
            </p>
            <button className="bg-green-400 text-black px-6 py-2 rounded-md hover:bg-green-500 transition">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
