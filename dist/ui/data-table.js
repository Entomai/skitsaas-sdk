'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
const DEFAULT_LABELS = {
    filterPlaceholder: 'Filter...',
    columns: 'Columns',
    noResults: 'No results.',
    showingRows: 'Showing {shown} of {filtered} rows',
    previous: 'Previous',
    next: 'Next'
};
function replaceCountLabel(template, values) {
    return template
        .replace('{shown}', String(values.shown))
        .replace('{filtered}', String(values.filtered));
}
export function DataTable({ columns, data, labels, filterColumn, filterPlaceholder, emptyMessage, initialColumnVisibility }) {
    const mergedLabels = {
        ...DEFAULT_LABELS,
        ...(labels ?? {})
    };
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState(() => initialColumnVisibility ?? {});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility
        }
    });
    const hideableColumns = table
        .getAllColumns()
        .filter((column) => column.getCanHide());
    const filterableColumn = filterColumn ? table.getColumn(filterColumn) : undefined;
    const shownRows = table.getRowModel().rows.length;
    const filteredRows = table.getFilteredRowModel().rows.length;
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [filterableColumn ? (_jsx("input", { placeholder: filterPlaceholder || mergedLabels.filterPlaceholder, value: filterableColumn.getFilterValue() ?? '', onChange: (event) => filterableColumn.setFilterValue(event.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm md:max-w-sm" })) : (_jsx("div", {})), hideableColumns.length > 0 ? (_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-xs font-medium text-muted-foreground", children: mergedLabels.columns }), hideableColumns.map((column) => (_jsxs("label", { className: "inline-flex items-center gap-2 rounded-md border border-border/70 px-2 py-1 text-xs", children: [_jsx("input", { type: "checkbox", checked: column.getIsVisible(), onChange: (event) => column.toggleVisibility(event.target.checked) }), _jsx("span", { children: column.id })] }, column.id)))] })) : null] }), _jsx("div", { className: "overflow-x-auto rounded-lg border border-border/70", children: _jsxs("table", { className: "w-full text-left text-sm", children: [_jsx("thead", { className: "bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground", children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { children: headerGroup.headers.map((header) => (_jsx("th", { className: "px-3 py-2", children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), _jsx("tbody", { children: table.getRowModel().rows.length > 0 ? (table.getRowModel().rows.map((row) => (_jsx("tr", { className: "border-t border-border/60", children: row.getVisibleCells().map((cell) => (_jsx("td", { className: "px-3 py-2 align-top", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "px-3 py-6 text-center text-sm text-muted-foreground", children: emptyMessage ?? mergedLabels.noResults }) })) })] }) }), _jsxs("div", { className: "flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between", children: [_jsx("p", { className: "text-muted-foreground", children: replaceCountLabel(mergedLabels.showingRows, {
                            shown: shownRows,
                            filtered: filteredRows
                        }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", className: "inline-flex h-9 items-center rounded-md border border-border/70 px-3 disabled:cursor-not-allowed disabled:opacity-50", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), children: mergedLabels.previous }), _jsx("button", { type: "button", className: "inline-flex h-9 items-center rounded-md border border-border/70 px-3 disabled:cursor-not-allowed disabled:opacity-50", onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), children: mergedLabels.next })] })] })] }));
}
