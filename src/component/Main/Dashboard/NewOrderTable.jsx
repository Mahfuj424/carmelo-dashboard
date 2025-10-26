// src/components/NewOrdersTable.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const STATUS_OPTIONS = [
  "Pending",
  "Packing",
  "Processing",
  "Shipping",
  "Shipped",
];
const STATUS_STYLES = {
  Pending: "bg-purple-100 text-purple-700 border-purple-200",
  Packing: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Processing: "bg-amber-100 text-amber-700 border-amber-200",
  Shipping: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-green-100 text-green-700 border-green-200",
};

function StatusSelect({ value, onChange }) {
  const color =
    STATUS_STYLES[value] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-full border px-3 py-1.5 pr-8 text-xs font-medium ${color} cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {/* chevron */}
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.25 7.5 10 12.25 14.75 7.5h-9.5z" />
      </svg>
    </div>
  );
}

export default function NewOrdersTable() {
  // demo data (API এলে এখানে বসিয়ে দিও)
  const data = useMemo(
    () => [
      {
        id: 1,
        orderNo: "#86475",
        email: "damiemail@gmail.com",
        items: 4,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Pending",
      },
      {
        id: 2,
        orderNo: "#86476",
        email: "damiemail@gmail.com",
        items: 5,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Pending",
      },
      {
        id: 3,
        orderNo: "#86477",
        email: "damiemail@gmail.com",
        items: 1,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Pending",
      },
      {
        id: 4,
        orderNo: "#86478",
        email: "damiemail@gmail.com",
        items: 3,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Packing",
      },
      {
        id: 5,
        orderNo: "#86479",
        email: "damiemail@gmail.com",
        items: 2,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Processing",
      },
      {
        id: 6,
        orderNo: "#86480",
        email: "damiemail@gmail.com",
        items: 6,
        price: 2415,
        tid: "65235465",
        delivery: "05-12-25",
        status: "Shipping",
      },
    ],
    []
  );

  // local status state (rowId -> status)
  const [statusMap, setStatusMap] = useState(
    Object.fromEntries(data.map((r) => [r.id, r.status]))
  );
  const setRowStatus = (rowId, status) =>
    setStatusMap((prev) => ({ ...prev, [rowId]: status }));

  const currency = (v) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-base font-semibold">New Order</span>
        <a href="#" className="text-sm text-gray-600 hover:underline">
          View all
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-t text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Order No</th>
              <th className="px-4 py-3 font-medium">User Email</th>
              <th className="hidden md:table-cell px-4 py-3 font-medium text-center">
                Total Items
              </th>
              <th className="hidden md:table-cell px-4 py-3 font-medium text-right">
                Price
              </th>
              <th className="hidden lg:table-cell px-4 py-3 font-medium">
                T.ID
              </th>
              <th className="hidden md:table-cell px-4 py-3 font-medium text-center">
                Delivery Time
              </th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/60">
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-800">
                  {row.orderNo}
                </td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="hidden md:table-cell px-4 py-3 text-center tabular-nums">
                  {String(row.items).padStart(2, "0")}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-right tabular-nums">
                  {currency(row.price)}
                </td>
                <td className="hidden lg:table-cell px-4 py-3">{row.tid}</td>
                <td className="hidden md:table-cell px-4 py-3 text-center">
                  {row.delivery}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusSelect
                    value={statusMap[row.id]}
                    onChange={(val) => setRowStatus(row.id, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
