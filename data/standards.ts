
export interface StandardDetail {
  id: string;
  title: string;
  summary: string;
  details: string[];
  exemptions?: string;
}

export const MINIMUM_STANDARDS: StandardDetail[] = [
  {
    id: "01",
    title: "Sustainability Strategy",
    summary: "Formally approved strategy covering environmental and social considerations.",
    details: [
      "Share your sustainability/ESG strategy covering both environmental and social aspects.",
      "Strategy must include commitments to international pledges (e.g., SBTI, UNGC, ILO).",
      "Indicate approval by management, board, or c-suite.",
      "Describe review and monitoring processes (e.g., annual reports, internal check-ins).",
      "Identify the team responsible for delivery on strategy and targets."
    ]
  },
  {
    id: "02",
    title: "DEIB Guidelines",
    summary: "Guidelines and structures for equal opportunities and hiring processes.",
    details: [
      "Share DEIB policy (e.g., company handbook, targets/commitments).",
      "Documentation should link to inclusive hiring, bias training, or structures enabling equal opportunity.",
      "Identify departments or roles that have received training for inclusive hiring.",
      "Describe how hiring processes reflect DEIB considerations for potential future hires."
    ]
  },
  {
    id: "03",
    title: "Zero Inventory Destruction",
    summary: "Prohibition of destroying unsold clothes and samples from previous collections.",
    details: [
      "Process in place for leftovers and unsold inventory.",
      "Destruction of unsold clothes includes landfill elimination.",
      "Note: Exceptions allowed for consumer health reasons (e.g., if chemically non-compliant)."
    ]
  },
  {
    id: "04",
    title: "Quality & Longevity",
    summary: "Criteria to ensure product durability and informing customers of its value.",
    details: [
      "Inform on selection criteria when sourcing materials regarding longevity and durability.",
      "Explain how these criteria connect to manufacturing quality.",
      "Incorporate customer feedback into the quality improvement process.",
      "Share how the value of longevity is communicated to the customer."
    ]
  },
  {
    id: "05",
    title: "Circularity Implementation",
    summary: "Integration of circular principles into operations (resell, reuse, deadstock).",
    details: [
      "Implementation of collection schemes or resell/reuse options.",
      "Use of deadstock materials and recycled content.",
      "Consideration of product recyclability at the design stage."
    ]
  },
  {
    id: "06",
    title: "Preferred Materials List",
    summary: "A list considering environmental and social impacts of material choices.",
    details: [
      "Maintain a link to your preferred materials list.",
      "Conventional natural fibers are not preferred unless organic or recycled.",
      "Describe approach for evaluating and updating the list based on trade-offs."
    ]
  },
  {
    id: "07",
    title: "60% Certified Fiber Threshold",
    summary: "At least 60% of collection must be certified, preferred, or deadstock.",
    details: [
      "Share list of materials used and their quantities in % of the collection.",
      "Provide documentation/links for certified or preferred materials.",
      "Encouragement for brands to be certified themselves beyond just the materials."
    ]
  },
  {
    id: "08",
    title: "REACH-Compliant RSL",
    summary: "List of restricted substances following EU REACH Directive.",
    details: [
      "Share Restricted Substances List (RSL) or Code of Conduct.",
      "Maintain a test program to ensure compliance from all suppliers.",
      "Describe engagement with suppliers on testing and chemical compliance."
    ],
    exemptions: "Brands using only secondary materials (e.g., flea market, second-hand) are exempt if sourced within the EU."
  },
  {
    id: "09",
    title: "Animal Welfare & Exotics Ban",
    summary: "Collection free from virgin fur, wild animal skins, and feathers.",
    details: [
      "No fur usage regardless of species or production method unless recycled.",
      "Ban on all animal skins except domesticated cattle, sheep, goats, and pigs.",
      "Ban on all feathers except as a by-product of the meat industry (turkey, chicken, duck, goose)."
    ]
  },
  {
    id: "10",
    title: "Supplier Code of Conduct",
    summary: "CoC according to international guidelines with supplier capacity building.",
    details: [
      "Share official Code of Conduct (CoC).",
      "Work with suppliers via self-assessments or third-party audits.",
      "Help build supplier capacity to meet the CoC standards."
    ],
    exemptions: "Not expected for brands with <30 employees."
  },
  {
    id: "11",
    title: "Purchasing Ethics",
    summary: "Control measures to prevent contributing to harm via purchasing practices.",
    details: [
      "Evaluate purchasing practices (lead times, payment terms, order changes).",
      "Assess potential negative impacts on suppliers and workers.",
      "Implement commitments to responsible purchasing based on the Common Framework."
    ],
    exemptions: "Not expected for brands with <10 employees."
  },
  {
    id: "12",
    title: "Safe Working Environment",
    summary: "Guidelines for a healthy, respectful workspace free from harassment.",
    details: [
      "Share guidelines and processes (e.g., company handbook, DEIB strategy).",
      "Inform employees about the policy and provide training to identify discrimination.",
      "Establish clear processes for handling complaints regarding harassment or ability-based discrimination."
    ],
    exemptions: "Not expected for brands with <10 employees."
  },
  {
    id: "13",
    title: "Staff Sustainability Training",
    summary: "Customer service staff informed on sustainability strategy.",
    details: [
      "Educate employees through training programs or educational material.",
      "Track information sharing and education of relevant staff.",
      "Share examples of educational material used."
    ]
  },
  {
    id: "14",
    title: "Customer Transparency",
    summary: "Sustainability education on at least two platforms.",
    details: [
      "Share links to examples of sustainability communication.",
      "Platforms can include website, social media, or in-store displays."
    ]
  },
  {
    id: "15",
    title: "Eco-Packaging",
    summary: "Constant work to reduce the environmental footprint of packaging.",
    details: [
      "Share progress on reducing the footprint for both in-store and online orders.",
      "Focus on material reduction and recycled content."
    ]
  },
  {
    id: "16",
    title: "Circular Showcase Production",
    summary: "No single-use props; emphasis on rental and long-term reuse.",
    details: [
      "Describe planned show/event production and partners.",
      "Preferred use of rental options for sets and props.",
      "Finding a long-term second life for all props that are not rented."
    ]
  },
  {
    id: "17",
    title: "Plastic-Free Show Events",
    summary: "No single-use plastic packaging and German waste sorting compliance.",
    details: [
      "Share alternatives to single-use plastic planned for the showcase.",
      "Establish clearly labeled bins on site to ensure correct waste sorting.",
      "Adhere to German waste sorting requirements for all event-related waste."
    ]
  },
  {
    id: "18",
    title: "Supply Chain Act Compliance",
    summary: "Measures ensuring human rights and environmental risks are minimized.",
    details: [
      "Provide evidence of how human rights and environmental considerations are addressed.",
      "Indicate who is responsible for overseeing this process.",
      "Describe division of responsibilities regarding supply chain compliance."
    ],
    exemptions: "Only relevant for companies/brands with >1000 employees."
  },
  {
    id: "19",
    title: "BFW Charter Signatory",
    summary: "Official signatory of the Berlin Fashion Week Charter.",
    details: [
      "Confirm company complies with the official Charter rules.",
      "Upload a signed copy of the BFW Charter."
    ]
  }
];
