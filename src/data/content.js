export const MOCK_STATIONS = {
  "90001": [
    { name: "Downtown Express Hub - L1", address: "555 S Flower St, Los Angeles", ccs: 4, nacs: 2, status: "Available", speed: "350kW", lat: 34.0522, lon: -118.2437 },
    { name: "EVRE Lounge Westside", address: "10250 Santa Monica Blvd, Los Angeles", ccs: 2, nacs: 4, status: "Busy (1 Free)", speed: "150kW", lat: 34.0594, lon: -118.4208 }
  ],
  seattle: [
    { name: "Capitol Hill Central", address: "1201 E Pine St, Seattle", ccs: 3, nacs: 3, status: "Available", speed: "350kW", lat: 47.6140, lon: -122.3200 },
    { name: "Seattle Waterfront Hub", address: "1001 Alaskan Way, Seattle", ccs: 0, nacs: 2, status: "Full", speed: "150kW", lat: 47.6050, lon: -122.3390 }
  ],
  default: [
    { name: "Silicon Valley Gateway", address: "3000 Sand Hill Rd, Menlo Park", ccs: 6, nacs: 4, status: "Available", speed: "350kW", lat: 37.4275, lon: -122.1697 },
    { name: "Soho Lifestyle Hub", address: "529 Broadway, New York", ccs: 2, nacs: 2, status: "Busy (2 Free)", speed: "150kW", lat: 40.7233, lon: -74.0008 }
  ]
};

export const TESTIMONIALS = [
  {
    name: "Marcus Vance",
    role: "Tesla Model Y Owner",
    ecoBadge: "Saved 640kg CO2",
    rating: 5,
    quote: "EVRE completely changed my charging routine. I book my slot in advance, walk into the lounge, grab an espresso, and catch up on work. 15 minutes later, I am at 80% charge and back on the road.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    name: "Elena Rostova",
    role: "Rivian R1S Owner",
    ecoBadge: "Saved 890kg CO2",
    rating: 5,
    quote: "Finding high-speed chargers that actually work has been a nightmare until I found EVRE. The 350kW speed is blazing fast and the customer lounge is safer, cleaner, and more comfortable than any other network.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    name: "David Chen",
    role: "Logistics Manager at Flash Courier",
    ecoBadge: "Saved 4.2 Tons CO2",
    rating: 5,
    quote: "We migrated our commercial delivery van fleet to EVRE's smart schedule program. The bulk charging rates and guaranteed reservation system have reduced our vehicle downtime by 30%.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

export const GALLERY_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
    alt: "350kW DC Charger Canopy",
    tag: "Station Bay",
    tagColor: "text-[#34D399] bg-[#34D399]/10",
    title: "Liquid-Cooled 350kW Terminal"
  },
  {
    image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=600",
    alt: "Workspace passenger Lounge",
    tag: "Lifestyle Lounge",
    tagColor: "text-[#06B6D4] bg-[#06B6D4]/10",
    title: "Premium Coworking Lounges"
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    alt: "Lounge desk cafe",
    tag: "Cafe Station",
    tagColor: "text-amber-500 bg-amber-500/10",
    title: "Local Roasted Espresso Bar"
  }
];

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/advantages", label: "Advantages" },
  { href: "/calculator", label: "Impact Calculator" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
