import { Moon, Sun, Bell, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


export default function Navbar(){


const {darkMode,toggleTheme}=useTheme();


return(

<nav className="
h-16 
bg-white dark:bg-gray-900
border-b dark:border-gray-800
flex items-center justify-between
px-6
shadow-sm
">


<div className="flex items-center gap-3">


<div className="
bg-blue-600
text-white
font-bold
rounded-xl
px-3
py-2
">
ZF
</div>


<h1 className="
text-xl
font-bold
text-gray-800
dark:text-white
">
ZipFlow
</h1>


</div>



<div className="flex items-center gap-5">


<button onClick={toggleTheme}
className="
text-gray-600
dark:text-gray-300
hover:scale-110
transition
">

{
darkMode 
? <Sun size={22}/>
: <Moon size={22}/>
}

</button>



<Bell
className="text-gray-600 dark:text-gray-300"
/>



<div className="
flex
items-center
w-full
gap-2
text-gray-700
dark:text-white
">

<User size={22}/>

<span>
Usuario
</span>


</div>


</div>


</nav>


)


}