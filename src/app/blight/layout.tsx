import Sidebar from '../Sidebar';

export default function BlightLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-[220px_1fr] p-7 md:gird-cols-[120px_1fr] lg:grid-cols-[220px_1fr]"> 
        <Sidebar />
          <div className="container mx-auto  ms-2">
            <main>{children}</main>
          </div>
        </div>
  );
}
