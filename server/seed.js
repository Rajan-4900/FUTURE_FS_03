const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminUser = require('./models/AdminUser');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const GalleryImage = require('./models/GalleryImage');

// Load environment variables
dotenv.config();

const servicesData = [
  {
    title: "Ultra-Fast DC Charging",
    slug: "ultra-fast-dc-charging",
    iconName: "Zap",
    description: "Connect your vehicle to our liquid-cooled 350kW charging ports. Compatible with NACS (Tesla), CCS, and Type 2 connectors for fast energy transfers.",
    features: ["350kW High-output", "Liquid-cooled cables", "Plug-and-Charge compatibility"],
    category: "charging",
    isActive: true
  },
  {
    title: "Premium Passenger Lounges",
    slug: "premium-passenger-lounges",
    iconName: "Coffee",
    description: "Avoid sitting in dark parking lots. Our secure indoor lounges feature high-speed Wi-Fi, work desks, local coffee, clean restrooms, and 24/7 security.",
    features: ["Dedicated workstations", "Espresso Bar", "24/7 Monitored access"],
    category: "lifestyle",
    isActive: true
  },
  {
    title: "Commercial Fleet Solutions",
    slug: "commercial-fleet-solutions",
    iconName: "Building2",
    description: "Customized business platforms for taxi, logistics, and delivery fleets. Access peak schedule shaving, consolidated monthly billing, and driver telemetry API integration.",
    features: ["Consolidated billing", "API telemetry integrations", "Peak schedule shaving"],
    category: "b2b",
    isActive: true
  }
];

const testimonialsData = [
  {
    authorName: "Marcus Vance",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    evModel: "Tesla Model Y Owner",
    ecoImpactBadge: "Saved 640kg CO2",
    rating: 5,
    quote: "EVRE completely changed my charging routine. I book my slot in advance, walk into the lounge, grab an espresso, and catch up on work. 15 minutes later, I am at 80% charge and back on the road.",
    isApproved: true,
    featured: true
  },
  {
    authorName: "Elena Rostova",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    evModel: "Rivian R1S Owner",
    ecoImpactBadge: "Saved 890kg CO2",
    rating: 5,
    quote: "Finding high-speed chargers that actually work has been a nightmare until I found EVRE. The 350kW speed is blazing fast and the customer lounge is safer, cleaner, and more comfortable than any other network.",
    isApproved: true,
    featured: true
  },
  {
    authorName: "David Chen",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    evModel: "Logistics Manager at Flash Courier",
    ecoImpactBadge: "Saved 4.2 Tons CO2",
    rating: 5,
    quote: "We migrated our commercial delivery van fleet to EVRE's smart schedule program. The bulk charging rates and guaranteed reservation system have reduced our vehicle downtime by 30%.",
    isApproved: true,
    featured: true
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/evre_db';
    console.log(`Connecting to database for seeding: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    // Clear existing data
    console.log('Clearing old collections...');
    await AdminUser.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await GalleryImage.deleteMany({});

    // Create Admin User
    console.log('Seeding administrative users...');
    const admin = await AdminUser.create({
      name: "EVRE Superadmin",
      email: "admin@gmail.com",
      passwordHash: "Admin123", // pre-save hook hashes password
      role: "superadmin",
      isActive: true
    });
    console.log(`Admin created: ${admin.email} (Password: Admin123)`);

    // Create Services
    console.log('Seeding service catalogs...');
    await Service.create(servicesData);

    // Create Testimonials
    console.log('Seeding testimonial entries...');
    await Testimonial.create(testimonialsData);

    // Create Gallery Images
    console.log('Seeding gallery image assets...');
    await GalleryImage.create([
      {
        title: "Liquid-Cooled 350kW Terminal",
        url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
        altText: "350kW DC Fast Charger station",
        category: "station",
        uploadedBy: admin._id
      },
      {
        title: "Premium Coworking Lounges",
        url: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=600",
        altText: "Comfortable passenger lounge desks",
        category: "lounge",
        uploadedBy: admin._id
      },
      {
        title: "Local Roasted Espresso Bar",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
        altText: "Barista coffee setup",
        category: "lounge",
        uploadedBy: admin._id
      }
    ]);

    console.log('Database seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding process encountered an error:', error);
    process.exit(1);
  }
};

seedDB();
