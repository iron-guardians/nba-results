function StatLineBar({ stat }) {

    return(
        <div className="flex items-end gap-4">

            <span className="text-gray-600 w-9 text-">{stat.team.code}</span>
            
            <div >
                {/* Progress Bar */}
                {stat.isPercentage
                    ? <div className="flex justify-end items-end gap-5">
                        <span className="text-xs font-bold">{stat.made} / {stat.attempted}</span>
                        <span className="text-2xl font-bold">{`${((stat.made /stat.attempted)*100).toFixed(2)}%`}</span>
                    </div>
                    : <div className="flex justify-end items-end gap-5">
                        <span className="text-2xl font-bold">{stat.made}</span>
                    </div>     
                }
                <div className="w-64 h-2 bg-gray-300 rounded-full">
                    <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stat.made / stat.attempted) * 100}%` }}
                    ></div>
                </div>
            </div>
        
            
        </div>
    )
}

export default StatLineBar;