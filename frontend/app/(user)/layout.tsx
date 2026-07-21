import VehicleNavbar from "@/components/vehicles/v-navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <VehicleNavbar />
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
