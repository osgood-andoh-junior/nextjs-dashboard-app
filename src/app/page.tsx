import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '../component/logoutButton';

export default async function Dashboard() {
  const cookieStore = await cookies(); // await here
  const userEmail = cookieStore.get('user_email')?.value ?? null;

  if (!userEmail) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="text-blue-400">{userEmail}</span>
        </h1>
        <LogoutButton />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value="1,240" />
        <Card title="Projects" value="56" />
        <Card title="Tasks" value="342" />
        <Card title="Revenue" value="$9,420" />
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-lg text-gray-300">{title}</h2>
      <p className="text-3xl font-bold text-blue-400 mt-2">{value}</p>
    </div>
  );
}