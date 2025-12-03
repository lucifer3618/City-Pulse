import React from 'react';
import {LucideChevronRight} from "lucide-react";
import RandomWaveChart from "@/components/dashboard/tabs/Dashboard/RandomWaveChart.jsx";

// Pass the Icon component directly (e.g., Icon={Droplets})
const AdditionalInfoCard = ({ label, value, unit, Icon, color = '#3B82F6'}) => {

  return (
    <div className="flex flex-col w-full h-full border-2 border-gray-300 rounded-2xl p-2">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <Icon size={20} color={color}/>
          <p className="font-bold">{label}</p>
        </div>
        <div className="flex items-center">
          <div className="text-[#6b7282] text-[14px]">Today</div>
          <LucideChevronRight size={19} color="#6b7282" />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col pt-1 pl-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-[15px] text-gray-600">{unit}</div>
        </div>
        <RandomWaveChart color={color} width={150} height={45} />
      </div>
    </div>
  );
};

export default AdditionalInfoCard;