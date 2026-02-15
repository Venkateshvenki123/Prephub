import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const CoursesTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        header: "Course Name",
        accessorKey: "name",
        cell: (info) => (
          <strong style={{ color: "#60a5fa" }}>
            {info.getValue()}
          </strong>
        ),
      },
      {
        header: "Description",
        accessorKey: "desc",
        cell: (info) => (
          <span style={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Certificate",
        accessorKey: "cert_status",
        cell: ({ getValue }) => (
          <span
            style={{
              color: getValue()?.includes('FREE') ? '#10b981' : '#94a3b8',
              fontWeight: getValue()?.includes('FREE') ? 'bold' : 'normal',
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              backgroundColor: getValue()?.includes('FREE') ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.1)',
              display: 'inline-block'
            }}
          >
            {getValue() || 'Premium'}
          </span>
        ),
      },
      {
        header: "Link",
        accessorKey: "link",
        cell: (info) => (
          <a
            href={info.getValue()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Open
          </a>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ overflowX: "auto", marginTop: "1.5rem" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "rgba(30,41,59,0.5)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(100,116,139,0.2)",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{
                borderBottom: "2px solid rgba(100,116,139,0.3)",
                backgroundColor: "rgba(30,41,59,0.8)",
              }}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "#60a5fa",
                    fontWeight: "600",
                    borderRight: "1px solid rgba(100,116,139,0.2)",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{
                borderBottom: "1px solid rgba(100,116,139,0.2)",
                hover: {
                  backgroundColor: "rgba(60,165,245,0.05)",
                },
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(60,165,245,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "1rem",
                    color: "#e2e8f0",
                    borderRight: "1px solid rgba(100,116,139,0.2)",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 && (
        <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>
          No courses available
        </div>
      )}
    </div>
  );
};

export default CoursesTable;
