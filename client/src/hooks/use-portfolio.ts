import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// GET /api/portfolio
export function usePortfolio() {
  return useQuery({
    queryKey: [api.portfolio.get.path],
    queryFn: async () => {
      const res = await fetch(api.portfolio.get.path);
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      const data = await res.json();
      // Using Zod to parse response ensures type safety
      return api.portfolio.get.responses[200].parse(data);
    },
  });
}

