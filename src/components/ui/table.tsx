import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<div className='relative w-full overflow-auto'>
		<table
			className={cn("w-full caption-top text-sm", className)}
			{...props}
			ref={ref}></table>
	</div>
));

Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead className={cn("[&_tr]:border-b", className)} {...props} ref={ref} />
));

TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		className={cn("[&_tr:last-child]:border-0", className)}
		{...props}
		ref={ref}></tbody>
));

TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		className={cn(
			"border-t bg-slate-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-slate-800/50",
			className
		)}
		{...props}
		ref={ref}></tfoot>
));

TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		className={cn(
			"border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800",
			className
		)}
		{...props}
		ref={ref}></tr>
));

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		className={cn(
			"h-12 px-4 text-center align-middle font-semibold [&:has([role=checkbox])]:pr-0 uppercase",
			className
		)}
		{...props}
		ref={ref}></th>
));

TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		className={cn(
			"p-4 align-middle [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
		ref={ref}></td>
));

TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		className={cn(
			"mt-4 text-sm text-slate-500 dark:text-slate-400",
			className
		)}
		{...props}
		ref={ref}></caption>
));

TableCaption.displayName = "TableCaption";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
