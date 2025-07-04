import { Pjl } from "@/feature/(admin)/distrik/type";
import React from "react";

interface PjlTableProps {
  pjlList: Pjl[];
  distrikName: string;
}

const PjlTable = ({ pjlList, distrikName }: PjlTableProps) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-lg">
      <div className="border-b p-6 border-b-black">
        <h4 className="text-2xl font-bold text-primary-500">
          PJL {distrikName}
        </h4>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full text-left">
          <thead className="text-black text-lg">
            <tr>
              <th className="py-4 px-6 font-bold">Nama</th>
              <th className="py-4 px-6 font-bold">NIM</th>
              <th className="py-4 px-6 font-bold">Prodi</th>
              <th className="py-4 px-6 font-bold">Line</th>
            </tr>
          </thead>
          <tbody>
            {pjlList.map((pjl, index) => (
              <tr
                key={pjl.nim}
                className={index % 2 === 0 ? "bg-primary-500/10" : "bg-white-default"}
              >
                <td className="py-5 px-6 text-default-dark">
                  {pjl.nama}
                </td>
                <td className="py-5 px-6 text-default-dark">
                  {pjl.nim}
                </td>
                <td className="py-5 px-6 text-default-dark">-</td>
                <td className="py-5 px-6 text-default-dark">
                  {pjl.line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PjlTable;
