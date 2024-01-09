import { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios.ts";
import { IRent } from "../types/modules.ts";
import { LatLngExpression } from "leaflet";

export function useGetRents() {
  const [rents, setRents] = useState<IRent[]>([]);
  const [markers, setMarkers] = useState<
    Record<string, LatLngExpression | string>[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRents = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const data = await axios.get<unknown, IRent[]>("/rents");

      setRents(data);
      setMarkers(
        data.map(
          (item) =>
            ({
              geocode: [item.latitude ?? 0, item.longitude ?? 0],
              id: item._id ?? "",
            }) as Record<string, LatLngExpression | string>
        )
      );
    } catch (e) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRents();
  }, []);

  const pushRent = (rent: IRent) => {
    setRents((prev) => [...prev, rent]);
  };

  return {
    rents,
    error,
    loading,
    markers,
    pushRent,
    setRents,
    fetchRents,
  };
}
