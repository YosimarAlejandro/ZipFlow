import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface Props {
children: React.ReactNode;
}


export default function DashboardLayout({children}:Props){


return (

<div className="min-h-screen bg-white dark:bg-gray-900">


<Navbar />


<div className="flex">


<Sidebar />


<main className="flex-1 p-10">


{children}

</main>


</div>
<Footer />

</div>


)

}