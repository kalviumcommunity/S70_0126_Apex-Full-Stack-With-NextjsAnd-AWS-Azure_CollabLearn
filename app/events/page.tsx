export const revalidate = 60;

export default async function EventsPage() {
  const time = new Date().toISOString();

  return (
    <main>
      <h1>Events Page (Hybrid Rendering)</h1>
      <p>Revalidated every 60 seconds</p>
      <p>Last Generated At: {time}</p>
    </main>
  );
}
