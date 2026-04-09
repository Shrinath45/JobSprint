// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner"

// const Toaster = ({
//   ...props
// }) => {
//   const { theme = "system" } = useTheme()

//   return (
//     (<Sonner
//       theme={theme}
//       className="toaster group"
//       toastOptions={{
//         classNames: {
//           toast:
//             "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
//           description: "group-[.toast]:text-muted-foreground",
//           actionButton:
//             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
//           cancelButton:
//             "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
//         },
//       }}
//       {...props} />)
//   );
// }

// export { Toaster }

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      position="top-center"
      duration={2500}
      className="toaster group"
      toastOptions={{
        style: {
          borderRadius: "12px",
          padding: "14px 20px",
          fontSize: "15px",
          fontWeight: "500",
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        },
        classNames: {
          toast:
            "group toast border bg-white dark:bg-neutral-900 text-gray-800 dark:text-white border-gray-300 dark:border-neutral-700 shadow-md",
          description: "group-[.toast]:text-sm text-gray-600 dark:text-gray-300",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white px-3 py-1 rounded-md hover:bg-blue-700",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-800 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
