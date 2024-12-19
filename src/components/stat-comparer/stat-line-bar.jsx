function StatLineBar({ stat }) {

    return (
        <div className="flex items-end gap-4">
          {/* Nombre del equipo */}
          <span
            className="w-9 text-right font-semibold"
            style={{ color: stat.team.color }} // Color dinámico del equipo
          >
            {stat.team.code}
          </span>
      
          {/* Contenedor principal */}
          <div className="flex flex-col gap-2 w-full">
            {/* Información estadística */}
            {stat.isPercentage ? (
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-orange-300">{stat.made} / {stat.attempted}</span>
                <span className="text-2xl font-bold text-blue-300">{`${((stat.made / stat.attempted) * 100).toFixed(2)}%`}</span>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-400">{stat.made}</span>
              </div>
            )}
      
            {/* Barra de progreso */}
            <div className="w-64 h-4 bg-gray-300 rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(stat.made / stat.attempted) * 100}%`,
                  backgroundColor: stat.team.color, // Color dinámico de la barra
                }}
              ></div>
            </div>
          </div>
        </div>
      );
      
      
}

export default StatLineBar;