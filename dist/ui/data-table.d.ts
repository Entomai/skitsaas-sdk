import { type ColumnDef, type VisibilityState } from '@tanstack/react-table';
export type SdkDataTableLabels = {
    filterPlaceholder: string;
    columns: string;
    noResults: string;
    showingRows: string;
    previous: string;
    next: string;
};
type SdkDataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    labels?: Partial<SdkDataTableLabels>;
    filterColumn?: string;
    filterPlaceholder?: string;
    emptyMessage?: string;
    initialColumnVisibility?: VisibilityState;
};
export declare function DataTable<TData, TValue>({ columns, data, labels, filterColumn, filterPlaceholder, emptyMessage, initialColumnVisibility }: SdkDataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
