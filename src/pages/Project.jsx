import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Project(){

const {name} = useParams()

return(

<div className="min-h-screen bg-gray-900 text-white">

<Navbar/>

<div className="p-10">

<h1 className="text-3xl font-bold">
Project : {name}
</h1>

<p className="text-gray-400 mt-4">
Here you can collaborate, chat and manage tasks.
</p>

</div>

</div>

)

}