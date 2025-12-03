import React from 'react'

export default function MetricTile({lable, current, current_unit}) {
  return (
    <div className="flex flex-col gap-1 border-2 px-8 py-2 rounded-2xl w-[155px]">
      <p className="pb-2">{lable}</p>
      <p className="text-xl font-bold">{current} <span className="text-sm font-normal text-gray-600">{current_unit}</span></p>
    </div>
  )
}
