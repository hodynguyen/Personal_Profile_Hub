import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type ContactInput, type PortfolioResponse } from "@shared/routes";

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

// POST /api/contact
export function useContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      return api.contact.submit.responses[201].parse(await res.json());
    },
  });
}
