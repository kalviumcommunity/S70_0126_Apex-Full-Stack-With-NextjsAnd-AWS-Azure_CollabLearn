export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const time = new Date().toISOString();

  return (
    <main>
      <h1>Dashboard (Dynamic Rendering)</h1>
      <p>Rendered on every request</p>
      <p>Current Time: {time}</p>
    </main>
  );
}
