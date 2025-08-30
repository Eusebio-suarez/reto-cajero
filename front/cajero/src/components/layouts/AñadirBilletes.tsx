import { CirclePlus, Landmark, X } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { recargarBilletes } from "../../services/billetesServices"
export default function AñadirBilletes() {

  //estado para el modal
  const [modal,setModal]= useState<boolean>(false)

  //estado para la denominacion
  const [denominacion,setDenominacion] = useState<number | "">("")

  //estado para la acntidad
  const [cantidad,setCantidad] = useState<number>(0)

  //estado para informar que esta cargando
  const [loading,setLoading] = useState<boolean>(false)

  //settear la denominacion cada que cambie
  const handleChange = (e:ChangeEvent<HTMLSelectElement>)=>{
    console.log(e.target.value)
    setDenominacion(Number(e.target.value))
  }

  //settear la cantidad cada que cambie
  const hadlerCuantityChange=(e: FormEvent<HTMLInputElement>)=>{
    console.log(e.currentTarget.value)
    setCantidad(Number(e.currentTarget.value))
  }

  //hacer la peticion al back para agregar billetes
  const handlersubmit= async(e:FormEvent)=>{

    e.preventDefault()

    //cambiar el estado a cargando
    setLoading(true)

    //validar que los datos si sean compatibles
    if(denominacion=="" || denominacion== null){
      swal("advertencia","seleccione una denominacion correcta","warning")
      //cambiar el estado de carga
      setLoading(false)
      return
    }

    //validacion de datos negativos
    if(cantidad<=0){
      swal("advertencia","ingrese una cantidad valida","warning")
      //cambiar el estado de carga
      setLoading(false)
      return
    }

    //hacer la peticion al servicio
     await recargarBilletes(denominacion,cantidad)

    //limpiar los estados
    setLoading(false)
    setCantidad(0)
    setDenominacion(0)
    setModal(false)

  }

  return (
    <div className="flex justify-center">
        <button onClick={()=>setModal(true)} className="flex bg-gray-800 border text-gray-300 font-semibold border-white gap-2 items-center p-2 rounded hover:bg-gray-900 transition duration-300">
            <CirclePlus size={25} className="text-green-500 "></CirclePlus>
            Recargar
        </button>
        {modal&&
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
              <div className="flex flex-col items-center gap-5 py-5 bg-gray-800 border border-white/50 rounded-xl">
                <div className="flex w-full justify-end px-5">
                  <button onClick={()=>setModal(false)} className=" absolute p-1.5 rounded bg-red-500 hover:bg-red-600">
                    <X size={20}></X>
                  </button>
                </div>
                <p className="text-xl font-semibold text-amber-400 px-20">Recargar Billetes</p>
                <div className="bg-blue-950 border border-white/30 rounded-full w-20 h-20 flex items-center justify-center hover:scale-105 transition duration-300">
                  <Landmark className="text-green-500 h-10 w-10"></Landmark>
                </div>
                <div className="w-full px-13 flex flex-col gap-5">                    
                  <select name="opciones" id="opciones" className="bg-gray-700 w-full px-2 py-1.5 rounded border border-white" onChange={handleChange}>
                    <option value="" disabled selected>Denominacion</option>
                    <option value="50000">50000</option>
                    <option value="20000">20000</option>
                    <option value="10000">10000</option>
                  </select>
                  <form onSubmit={handlersubmit} className="flex flex-col items-center w-full gap-5">
                    <input type="number" required placeholder="Cantidad" onInput={(e)=>hadlerCuantityChange(e)}  className="w-full bg-gray-700 p-1 border rounded border-white focus:outline-0"/>
                    
                    {
                      loading ?(
                         <button type="submit" className="text-gray-300 px-3 py-1.5 font-semibold rounded flex items-center gap-2 bg-green-800">
                            <span className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                          Recargando...
                        </button>
       
                      ):(
                        <button type="submit" className="text-gray-300 px-3 py-1.5 font-semibold rounded bg-green-600 hover:bg-green-800 transition duration-300">
                          Recargar
                        </button>
                      )
                    }
                  </form>
                </div>
              </div>
          </div>
        }
    </div>
  )
}