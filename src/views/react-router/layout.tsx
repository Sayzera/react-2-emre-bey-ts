import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <div className="flex items-center">
        <div className="h-screen flex-2 bg-red-500">
          <Navbar />
        </div>

        <div className="flex-8 h-screen">
          <Outlet />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
    // <div>
    //   <div className='flex items-center'>
    //     <div>
    //         Sidebar
    //     </div>
    //       <nav>
    //         Burada Menuler yer alır
    //     </nav>
    //   </div>
    //     <Outlet />
    //      <footer>
    //         Burada sitenin logosu kısa açıklaması, sosyal medya linkleri
    //         adres ve iletişim bilgileri, site kısayollar yer alır
    //     </footer>
    // </div>
  );
}

export default Layout;
