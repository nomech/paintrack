import { useQuery } from "@tanstack/react-query";
import { getHealth } from "../lib/api";

export default function LandingPage() {
  const { data } = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });

  if (!data) {
    return <div>Loading...</div>;
  }
  if (data.status !== "OK") {
    return <div>Something went wrong</div>;
  }

  return <div>Lets go</div>;
}
