import {
Home,
Files,
Settings,
UserCircle
} from "lucide-react";


export default function Sidebar(){


return(

<aside
className="
w-64
min-h-screen
bg-gray-100
dark:bg-gray-950
border-r
dark:border-gray-800
p-5
"
>


<div className="space-y-3">


<MenuItem 
icon={<Home size={20}/>}
text="Inicio"
/>


<MenuItem 
icon={<Files size={20}/>}
text="Mis archivos"
/>


<MenuItem 
icon={<UserCircle size={20}/>}
text="Perfil"
/>


<MenuItem 
icon={<Settings size={20}/>}
text="Configuración"
/>


</div>


</aside>


)

}



function MenuItem({
icon,
text
}:{
icon:React.ReactNode,
text:string
}){


return(

<div
className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
cursor-pointer
text-gray-700
dark:text-gray-300
hover:bg-blue-600
hover:text-white
transition
"
>

{icon}

<span>
{text}
</span>


</div>

)

}