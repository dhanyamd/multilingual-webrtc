import { redirect } from "next/navigation";

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export default function Home() {
  const randomId = generateRandomId();

  // Redirect to /parties/<party_id>
  redirect(`/parties/${randomId}`);

  return null; 
}