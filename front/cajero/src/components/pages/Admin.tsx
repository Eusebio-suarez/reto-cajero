import { AdminBilletes } from "../layouts/AdminBilletes";
import AñadirBilletes from "../layouts/AñadirBilletes";
import { Saldo } from "../layouts/Saldo";


export default function Admin() {
  return (
    <div className="flex flex-col gap-8">
        <Saldo></Saldo>
        <AdminBilletes></AdminBilletes>
        <AñadirBilletes></AñadirBilletes>
    </div>
  )
}
