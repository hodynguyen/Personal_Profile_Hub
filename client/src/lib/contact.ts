// Single source for contact details shown across the site

export const EMAIL = "hodynguyen.forwork@gmail.com";
export const PHONE_DISPLAY = "0968 320 336";
export const PHONE_TEL = "+84968320336";
export const LINKEDIN_URL = "https://linkedin.com/in/hodynguyen";
export const GITHUB_URL = "https://github.com/hodynguyen";
export const INSTAGRAM_URL = "https://www.instagram.com/hodysheet/";
export const LOCATION = "Hanoi, Vietnam (GMT+7)";

export function mailto(subject: string, body = ""): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally
  return `mailto:${EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

export const HIRING_MAILTO = mailto(
  "Job opportunity for Nguyen Thanh Dat (Hody)",
  "Hi Hody,\n\nRole:\nCompany:\nWork mode (remote / hybrid / on-site):\n\n",
);

export const COLLAB_MAILTO = mailto(
  "Collaboration with Hody",
  "Hi Hody,\n\nWhat we're building:\nWhat we'd like to work on together:\n\n",
);
