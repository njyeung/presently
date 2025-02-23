import { redirect } from 'next/navigation';
import Listings from "@/components/Listings"

export default async function Results({searchParams}: {
  searchParams: { info?: string };
}) {
//   // If there's no info query parameter, redirect to a default page.
//   if (!searchParams.info) {
//     redirect('/');
//   }

//   // Parse the info parameter from the URL query string.
//   // Make sure your info is properly encoded/decoded.
//   const formData = JSON.parse(searchParams.info);

//   // Optionally, perform additional asynchronous fetching here if needed.
//   // e.g., const additionalData = await fetch(...).then(res => res.json());

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Results</h1>
//       <pre className="bg-gray-100 p-4 rounded">
//         <Listings />
//       </pre>
//     </div>
//   );
}