import Maintenance from "@/components/layout/Maintenance";

export default function Home() {
  return (
    <main className="w-full">
      { process.env.APP_STATUS=='development' &&
          <Maintenance />
      }
    </main>
  );
}
