export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/request", label: "Send Requirement" },
  { href: "/about", label: "About" },
  { href: "/compliance", label: "Compliance" },
  { href: "/logistics", label: "Logistics" },
  { href: "/contact", label: "Contact" },
];

export const INCOTERMS = [
  "EXW",
  "FCA",
  "FOB",
  "CIF",
  "CFR",
  "DAP",
  "DDP",
  "Other",
] as const;

export const ENQUIRY_STATUSES = ["NEW", "CONTACTED", "QUOTED", "CLOSED"] as const;

export const REQUIREMENT_STATUSES = ["NEW", "CONTACTED", "QUOTED", "CLOSED"] as const;

export const PRODUCT_STATUSES = ["draft", "published"] as const;
