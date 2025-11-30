import InfoTask from "@/components/InfoTask";
import SideMenu from "@/components/SideMenu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <main className="flex justify-between min-h-screen">
        <SideMenu />
        {children}
        <InfoTask />
      </main>
    </main>
  );
}
