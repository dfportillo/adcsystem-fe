import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";
import { AlertCircle } from "lucide-react";
import type { ProductionOrder } from "../../../api_adcsystem/model";

type Props = {
  orders: ProductionOrder[] | undefined;
  isLoading?: boolean;
};

// Definimos los colores neobrutalistas o corporativos según la prioridad
const COLORS = {
  alta: "#ef4444",    // Rojo Tailwind
  mediana: "#f59e0b", // Ámbar/Naranja Tailwind
  baja: "#10b981",    // Verde Tailwind
  desconocida: "#9ca3af" // Gris
};

export default function OrdersPriorityChart({ orders, isLoading }: Props) {
  
  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const counts = { alta: 0, mediana: 0, baja: 0 };

    orders.forEach((order) => {
      const priority = order.priority_name?.toLowerCase().trim();
      if (priority === "alta" || priority === "high") counts.alta++;
      else if (priority === "mediana" || priority === "media" || priority === "medium") counts.mediana++;
      else if (priority === "baja" || priority === "low") counts.baja++;
    });

    // ⚡ Asignamos la propiedad 'fill' directamente a cada objeto de datos
    return [
      { name: "Prioridad Alta", value: counts.alta, fill: COLORS.alta },
      { name: "Prioridad Mediana", value: counts.mediana, fill: COLORS.mediana },
      { name: "Prioridad Baja", value: counts.baja, fill: COLORS.baja },
    ].filter(item => item.value > 0);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm text-gray-400 animate-pulse">Procesando métricas de planta...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="h-64 w-full flex flex-col items-center justify-center bg-gray-50 border border-gray-200 border-dashed rounded-lg p-4">
        <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-500">No hay órdenes de producción activas</p>
      </div>
    );
  }

  return (
    <div className="
    bg-white p-3 shadow-sm border border-gray-200 flex flex-col
    w-[92%] lg:w-2/5 
                px-4 py-3 mx-2 my-2
                rounded-4xl 
                md:rounded-4xl
                md:w-2/3
                lg:p-4
                lg:ml-0 lg:m-1 
    
    ">
      <div>
        <h3 className="font-bold text-gray-800 text-lg capitalize">Distribución de Órdenes</h3>
        <p className="text-xs text-gray-400 mt-0.5">Carga de trabajo actual según prioridad</p>
      </div>

      <div className="w-full h-62.5 mt-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* ⚡ Eliminamos las Cells internas. Ahora Pie lee automáticamente 
                la propiedad 'fill' que viene dentro de cada objeto en 'chartData' */}
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            />
            
            <Tooltip 
              contentStyle={{ background: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb" }}
              itemStyle={{ fontSize: "14px", fontWeight: "500" }}
            />
            
            <Legend 
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="border-t border-gray-100 pt-3 mt-2 text-right">
        <span className="text-xs text-gray-500 font-medium">
          Total: <strong className="text-gray-800 text-sm">{orders.length}</strong> OPs
        </span>
      </div>
    </div>
  );
}