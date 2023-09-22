import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({children}) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="w-full flex flex-1">
        <Sidebar />
         <div className="pl-64 flex-1 max-w-screen-2xl h-full mx-auto mt-14 ">{children}</div> 
      </div>
    </div>
  );
};

export default Layout;
