import Sidebar from "./tmSidebar";

export default function telMeisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex md:grid md:grid-cols-[200px_1fr]"> 
    <Sidebar />
          <div className="container mx-auto  ms-2">
            <main>{children}</main>
          </div>
        </div>
  );
}
