// this hook not in use, was created for the opportunity to pagination, also created axios.interseptors for this
// import { useCallback, useEffect, useState } from "react";
// import axios from "../utils/axios.ts";
// import { IRent } from "../types/modules.ts";
//
// export function useRents() {
//   const LIMIT = 12;
//   const [rents, setRents] = useState<IRent[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//
//   const fetchRents = useCallback(async () => {
//     try {
//       setError("");
//       setLoading(true);
//       const { data } = await axios.get<IRent[]>("/rents", {
//         params: {
//           limit: LIMIT,
//           page: page,
//         },
//       });
//       setRents(data);
//     } catch (e) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);
//
//   function changePage(newPage: number) {
//     setPage(newPage);
//   }
//
//   useEffect(() => {
//     fetchRents();
//   }, [fetchRents]);
//
//   return {
//     rents,
//     error,
//     loading,
//     page,
//     fetchRents,
//   };
// }
