"use client";

import "./globals.css";
// import { AuthProvider } from "./context/AuthContext";

// const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(fetchEventsApi());
//     dispatch(fetchTodosApi());
//   }, [dispatch]);

//   return <>{children}</>;
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const screenType = useScreenType();

//   return (
//     <html lang="en" className="h-full w-full">
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </head>
//       <body className="h-full w-full overflow-x-hidden flex flex-col">
//         <Provider store={store}>
//           <Toaster
//             duration={1200}
//             position="top-center"
//             toastOptions={{
//               className: "sonner-center",
//             }}
//           />
//           <LayoutWrapper>
//             <LayoutContent screenType={screenType}>{children}</LayoutContent>
//           </LayoutWrapper>
//         </Provider>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-full w-full overflow-x-hidden flex flex-col">
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider>  */}
      </body>
    </html>
  );
}
