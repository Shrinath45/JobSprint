// import * as React from "react"

// import { cn } from "@/lib/utils"

// const Table = React.forwardRef(({ className, ...props }, ref) => (
//   <div className="relative w-full overflow-auto">
//     <table
//       ref={ref}
//       className={cn("w-full caption-bottom text-sm", className)}
//       {...props} />
//   </div>
// ))
// Table.displayName = "Table"

// const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
// ))
// TableHeader.displayName = "TableHeader"

// const TableBody = React.forwardRef(({ className, ...props }, ref) => (
//   <tbody
//     ref={ref}
//     className={cn("[&_tr:last-child]:border-0", className)}
//     {...props} />
// ))
// TableBody.displayName = "TableBody"

// const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
//   <tfoot
//     ref={ref}
//     className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
//     {...props} />
// ))
// TableFooter.displayName = "TableFooter"

// const TableRow = React.forwardRef(({ className, ...props }, ref) => (
//   <tr
//     ref={ref}
//     className={cn(
//       "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
//       className
//     )}
//     {...props} />
// ))
// TableRow.displayName = "TableRow"

// const TableHead = React.forwardRef(({ className, ...props }, ref) => (
//   <th
//     ref={ref}
//     className={cn(
//       "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
//       className
//     )}
//     {...props} />
// ))
// TableHead.displayName = "TableHead"

// const TableCell = React.forwardRef(({ className, ...props }, ref) => (
//   <td
//     ref={ref}
//     className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
//     {...props} />
// ))
// TableCell.displayName = "TableCell"

// const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
//   <caption
//     ref={ref}
//     className={cn("mt-4 text-sm text-muted-foreground", className)}
//     {...props} />
// ))
// TableCaption.displayName = "TableCaption"

// export {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption,
// }


import * as React from "react";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableFooter as MuiTableFooter,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Paper,
  Typography,
} from "@mui/material";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
    <MuiTable ref={ref} sx={{ minWidth: 650 }} {...props} />
  </TableContainer>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableHead
    ref={ref}
    sx={{
      backgroundColor: "#f5f5f5",
      "& th": {
        fontWeight: "bold",
        color: "#555",
      },
    }}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableBody
    ref={ref}
    sx={{
      "& tr:last-child td": {
        borderBottom: "none",
      },
    }}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableFooter
    ref={ref}
    sx={{
      backgroundColor: "#fafafa",
      fontWeight: "medium",
    }}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableRow
    ref={ref}
    sx={{
      borderBottom: "1px solid #eee",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableCell
    ref={ref}
    sx={{
      padding: "16px",
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "#666",
    }}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <MuiTableCell
    ref={ref}
    sx={{
      padding: "16px",
      fontSize: "0.9rem",
      color: "#333",
    }}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    style={{
      captionSide: "bottom",
      paddingTop: "16px",
      fontSize: "0.875rem",
      color: "#6b7280", // Tailwind's text-muted equivalent
      textAlign: "center",
    }}
    {...props}
  />
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
