import type { Brand } from "@paintrack/shared/schemas";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../lib/api";
import { Suspense } from "react";

export const Brands = () => {
  const { data, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <Suspense fallback={<p> Loading ...</p>}>
        <ul>
          {data &&
            data.map((brand: Brand) => <li key={brand.id}> {brand.name} </li>)}
        </ul>
      </Suspense>
    </>
  );
};
