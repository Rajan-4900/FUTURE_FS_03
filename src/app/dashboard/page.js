"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, 
  LayoutDashboard, 
  Inbox, 
  Wrench, 
  Image as ImageIcon, 
  MessageSquare, 
  LogOut, 
  Lock, 
  User, 
  Plus, 
  Edit, 
  Trash, 
  Check, 
  X, 
  AlertCircle,
  FileText,
  UserCheck,
  TrendingUp,
  ExternalLink,
  ChevronRight
} from "lucide-react";

// Local API Base URL configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : "http://localhost:5000/api/v1";

export default function Dashboard() {
  // Authentication & Session
  const [token, setToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "admin@gmail.com", password: "Admin123" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Tab State: 'overview', 'enquiries', 'services', 'gallery', 'testimonials'
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard Data State
  const [stats, setStats] = useState({ pendingContacts: 0, newEnquiries: 0, pendingTestimonials: 0, totalServices: 0 });
  const [enquiries, setEnquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Form Management
  const [serviceForm, setServiceForm] = useState({ id: null, title: "", iconName: "Zap", description: "", features: "", category: "charging", isActive: true });
  const [galleryForm, setGalleryForm] = useState({ title: "", url: "", altText: "", category: "general" });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);

  // Messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("evre_admin_token");
    const savedUser = localStorage.getItem("evre_admin_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setAdminUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch Dashboard Stats & Content
  useEffect(() => {
    if (!token) return;
    fetchAdminProfile();
    fetchStats();
    fetchEnquiries();
    fetchServices();
    fetchGallery();
    fetchTestimonials();
  }, [token]);

  // Alert Timers
  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  // Headers helper
  const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  });

  // API fetches
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setStats(json.data.counters);
    } catch (e) { console.error("Error fetching stats:", e); }
  };

  const fetchAdminProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setAdminUser(json.data);
    } catch (e) { console.error("Error fetching admin profile:", e); }
  };

  const fetchEnquiries = async () => {
    try {
      const resEnq = await fetch(`${API_BASE}/contact/enquiries`, { headers: getHeaders() });
      const jsonEnq = await resEnq.json();
      if (jsonEnq.success) setEnquiries(jsonEnq.data);

      const resCon = await fetch(`${API_BASE}/contact/submissions`, { headers: getHeaders() });
      const jsonCon = await resCon.json();
      if (jsonCon.success) setContacts(jsonCon.data);
    } catch (e) { console.error("Error fetching enquiries:", e); }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE}/services`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setServices(json.data);
    } catch (e) { console.error("Error fetching services:", e); }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      const json = await res.json();
      if (json.success) setGallery(json.data);
    } catch (e) { console.error("Error fetching gallery:", e); }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/testimonials/all`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setTestimonials(json.data);
    } catch (e) { console.error("Error fetching testimonials:", e); }
  };

  // Auth Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const json = await res.json();

      if (json.success) {
        localStorage.setItem("evre_admin_token", json.token);
        localStorage.setItem("evre_admin_user", JSON.stringify(json.data));
        setToken(json.token);
        setAdminUser(json.data);
        setSuccessMessage("Log in successful. Welcome to EVRE Dashboard.");
      } else {
        setLoginError(json.error || "Login credentials rejected.");
      }
    } catch (err) {
      setLoginError("Could not connect to the API server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("evre_admin_token");
    localStorage.removeItem("evre_admin_user");
    setToken(null);
    setAdminUser(null);
    setSuccessMessage("Log out completed successfully.");
  };

  // Enquiry status update
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/contact/enquiries/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage("Enquiry status updated successfully.");
        fetchEnquiries();
        fetchStats();
      } else {
        setErrorMessage(json.error || "Update operation failed.");
      }
    } catch (e) { setErrorMessage("Network error updating status."); }
  };

  // Service CRUD
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const isEdit = serviceForm.id !== null;
    const url = isEdit ? `${API_BASE}/services/${serviceForm.id}` : `${API_BASE}/services`;
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      title: serviceForm.title,
      iconName: serviceForm.iconName,
      description: serviceForm.description,
      features: serviceForm.features.split(",").map(f => f.trim()).filter(Boolean),
      category: serviceForm.category,
      isActive: serviceForm.isActive
    };

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        setSuccessMessage(isEdit ? "Service updated successfully." : "New service created successfully.");
        setShowServiceForm(false);
        setServiceForm({ id: null, title: "", iconName: "Zap", description: "", features: "", category: "charging", isActive: true });
        fetchServices();
        fetchStats();
      } else {
        setErrorMessage(json.error || "Save operation failed.");
      }
    } catch (e) { setErrorMessage("Network error saving service."); }
  };

  const handleEditService = (service) => {
    setServiceForm({
      id: service._id,
      title: service.title,
      iconName: service.iconName,
      description: service.description,
      features: service.features.join(", "),
      category: service.category,
      isActive: service.isActive
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`${API_BASE}/services/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage("Service deleted successfully.");
        fetchServices();
        fetchStats();
      } else {
        setErrorMessage(json.error || "Access Denied. Only superadmin accounts can delete resources.");
      }
    } catch (e) { setErrorMessage("Network error deleting service."); }
  };

  // Gallery CRUD
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(galleryForm)
      });
      const json = await res.json();

      if (json.success) {
        setSuccessMessage("Gallery image reference uploaded successfully.");
        setShowGalleryForm(false);
        setGalleryForm({ title: "", url: "", altText: "", category: "general" });
        fetchGallery();
      } else {
        setErrorMessage(json.error || "Image reference upload failed.");
      }
    } catch (e) { setErrorMessage("Network error uploading image reference."); }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm("Remove this image reference?")) return;
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage("Image reference removed successfully.");
        fetchGallery();
      } else {
        setErrorMessage(json.error || "Delete operation failed.");
      }
    } catch (e) { setErrorMessage("Network error deleting image reference."); }
  };

  // Testimonial Moderation
  const handleModerateTestimonial = async (id, isApproved, featured) => {
    try {
      const res = await fetch(`${API_BASE}/testimonials/${id}/moderate`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ isApproved, featured })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage("Testimonial moderation updated.");
        fetchTestimonials();
        fetchStats();
      } else {
        setErrorMessage(json.error || "Moderation update failed.");
      }
    } catch (e) { setErrorMessage("Network error updating moderation."); }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Delete this testimonial from database?")) return;
    try {
      const res = await fetch(`${API_BASE}/testimonials/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMessage("Testimonial deleted successfully.");
        fetchTestimonials();
        fetchStats();
      } else {
        setErrorMessage(json.error || "Delete operation failed.");
      }
    } catch (e) { setErrorMessage("Network error deleting testimonial."); }
  };

  /* ========================================================
     RENTAL / LOGIN CARD VIEW
     ======================================================== */
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 py-12 text-slate-100 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-[#2E3A4E] bg-[#172033]/60 p-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#059669] to-[#34D399] mb-4">
              <Zap className="h-6 w-6 text-[#0B0F19]" fill="#0B0F19" />
            </div>
            <h2 className="font-outfit text-2xl font-bold tracking-tight text-white">Admin Dashboard Login</h2>
            <p className="text-xs text-slate-400 mt-2">Manage EVRE Hub enquiries, services, and testimonials</p>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs text-rose-400 mb-6">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@gmail.com"
                  className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-lg bg-[#0B0F19] border border-[#2E3A4E] pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 rounded-lg bg-[#059669] hover:bg-[#10B981] disabled:bg-slate-800 text-xs font-bold text-white transition-colors"
            >
              {loading ? "Verifying Credentials..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ========================================================
     MAIN DASHBOARD INTERFACE VIEW
     ======================================================== */
  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-[#2E3A4E]/50 bg-[#172033]/20 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#059669] to-[#34D399]">
              <Zap className="h-5 w-5 text-[#0B0F19]" fill="#0B0F19" />
            </div>
            <span className="font-outfit text-lg font-bold text-white">EVRE<span className="text-[#34D399] font-normal">.admin</span></span>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "overview" ? "bg-[#059669] text-white" : "text-slate-400 hover:bg-[#172033]/60 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab("enquiries")}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "enquiries" ? "bg-[#059669] text-white" : "text-slate-400 hover:bg-[#172033]/60 hover:text-white"
              }`}
            >
              <Inbox className="h-4.5 w-4.5" />
              <span>Enquiries & Forms</span>
            </button>
            <button 
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "services" ? "bg-[#059669] text-white" : "text-slate-400 hover:bg-[#172033]/60 hover:text-white"
              }`}
            >
              <Wrench className="h-4.5 w-4.5" />
              <span>Services</span>
            </button>
            <button 
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "gallery" ? "bg-[#059669] text-white" : "text-slate-400 hover:bg-[#172033]/60 hover:text-white"
              }`}
            >
              <ImageIcon className="h-4.5 w-4.5" />
              <span>Gallery</span>
            </button>
            <button 
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "testimonials" ? "bg-[#059669] text-white" : "text-slate-400 hover:bg-[#172033]/60 hover:text-white"
              }`}
            >
              <MessageSquare className="h-4.5 w-4.5" />
              <span>Testimonials</span>
            </button>
          </nav>
        </div>

        {/* LOGOUT AREA */}
        <div className="p-6 border-t border-[#2E3A4E]/30">
          <div className="mb-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logged In As</p>
            <p className="text-xs font-semibold text-slate-300 mt-1 truncate">{adminUser?.name}</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">{adminUser?.email}</p>
            <p className="text-[10px] text-slate-400 capitalize mt-0.5">{adminUser?.role}</p>
            {adminUser?.lastLoginAt && (
              <p className="text-[9px] text-slate-500 mt-1.5">
                Last login: {new Date(adminUser.lastLoginAt).toLocaleString()}
              </p>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-rose-500/30 hover:bg-rose-500/10 px-4 py-2.5 rounded-lg text-xs font-bold text-rose-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-20 border-b border-[#2E3A4E]/30 bg-[#172033]/10 flex items-center justify-between px-8 shrink-0">
          <h2 className="font-outfit text-xl font-bold capitalize text-white">{activeTab} Manager</h2>
          <div className="flex items-center gap-4">
            {successMessage && (
              <span className="text-xs font-semibold text-[#34D399] bg-[#34D399]/10 px-3 py-1.5 rounded-lg">
                {successMessage}
              </span>
            )}
            {errorMessage && (
              <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg">
                {errorMessage}
              </span>
            )}
            <span className="text-xs text-slate-400 font-mono">Environment: {process.env.NODE_ENV || 'production'}</span>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* ========================================================
             TAB: OVERVIEW
             ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Counters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/30 p-6 flex flex-col justify-between h-36">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Enquiries</span>
                  <div className="text-4xl font-bold font-outfit text-white">{stats.newEnquiries}</div>
                  <span className="text-[9px] text-[#34D399] flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Requires Action</span>
                  </span>
                </div>
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/30 p-6 flex flex-col justify-between h-36">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Form Submissions</span>
                  <div className="text-4xl font-bold font-outfit text-white">{stats.pendingContacts}</div>
                  <span className="text-[9px] text-slate-500">Contact Inbox submissions</span>
                </div>
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/30 p-6 flex flex-col justify-between h-36">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Testimonials</span>
                  <div className="text-4xl font-bold font-outfit text-[#34D399]">{stats.pendingTestimonials}</div>
                  <span className="text-[9px] text-slate-500">Awaiting moderation approvals</span>
                </div>
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/30 p-6 flex flex-col justify-between h-36">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active Services</span>
                  <div className="text-4xl font-bold font-outfit text-white">{stats.totalServices}</div>
                  <span className="text-[9px] text-slate-500">Configured station amenities</span>
                </div>
              </div>

              {/* Grid lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Quick Enquiries */}
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6">
                  <h3 className="font-outfit text-sm font-bold text-white mb-4 flex justify-between items-center">
                    <span>Recent B2B Enquiries</span>
                    <button onClick={() => setActiveTab("enquiries")} className="text-[10px] text-[#34D399] hover:underline flex items-center">
                      <span>View All</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </h3>
                  <div className="divide-y divide-[#2E3A4E]/40 space-y-4">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div key={enq._id} className="pt-4 first:pt-0 flex justify-between items-start">
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{enq.companyName}</p>
                          <p className="text-[10px] text-slate-500 capitalize mt-0.5">{enq.enquiryType} Lead • {enq.contactPerson}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded capitalize ${
                          enq.status === "new" ? "bg-emerald-500/10 text-[#34D399]" : "bg-slate-800 text-slate-400"
                        }`}>{enq.status}</span>
                      </div>
                    ))}
                    {enquiries.length === 0 && <p className="text-xs text-slate-500 py-4">No B2B leads on record.</p>}
                  </div>
                </div>

                {/* Quick Testimonials */}
                <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6">
                  <h3 className="font-outfit text-sm font-bold text-white mb-4 flex justify-between items-center">
                    <span>Testimonial Moderation Queue</span>
                    <button onClick={() => setActiveTab("testimonials")} className="text-[10px] text-[#34D399] hover:underline flex items-center">
                      <span>Moderate</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </h3>
                  <div className="divide-y divide-[#2E3A4E]/40 space-y-4">
                    {testimonials.filter(t => !t.isApproved).slice(0, 4).map((t) => (
                      <div key={t._id} className="pt-4 first:pt-0 flex justify-between items-start">
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{t.authorName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 italic">"{t.quote}"</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleModerateTestimonial(t._id, true, t.featured)}
                            className="h-6 w-6 rounded bg-[#059669]/20 border border-[#059669]/40 hover:bg-[#059669] flex items-center justify-center text-[#34D399] hover:text-white"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {testimonials.filter(t => !t.isApproved).length === 0 && (
                      <p className="text-xs text-slate-500 py-4">Testimonial queue is clean. All active reviews approved.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
             TAB: ENQUIRIES
             ======================================================== */}
          {activeTab === "enquiries" && (
            <div className="space-y-8">
              
              {/* B2B Customer Leads Table */}
              <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6">
                <h3 className="font-outfit text-sm font-bold text-white mb-6">B2B Customer Inquiries (Fleet & Host Partnerships)</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E3A4E] text-slate-400 uppercase tracking-widest text-[9px]">
                        <th className="py-3 px-4">Company</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Email/Phone</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Parameters</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E3A4E]/40 text-slate-300">
                      {enquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-[#172033]/20">
                          <td className="py-3.5 px-4 font-semibold text-white">{enq.companyName}</td>
                          <td className="py-3.5 px-4">{enq.contactPerson}</td>
                          <td className="py-3.5 px-4">
                            <div>{enq.email}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{enq.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 capitalize">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              enq.enquiryType === "fleet" ? "bg-amber-500/10 text-amber-500" : "bg-[#06B6D4]/10 text-[#06B6D4]"
                            }`}>{enq.enquiryType}</span>
                          </td>
                          <td className="py-3.5 px-4 text-[10px] text-slate-400">
                            {enq.enquiryType === "fleet" ? (
                              <span>Vans: {enq.details?.vehicleCount || 0}</span>
                            ) : (
                              <span>Spaces: {enq.details?.parkingSpaces || 0}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 capitalize">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              enq.status === "new" ? "bg-emerald-500/10 text-[#34D399]" :
                              enq.status === "contacted" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-slate-400"
                            }`}>{enq.status}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex gap-2 justify-end">
                              <button 
                                onClick={() => handleUpdateEnquiryStatus(enq._id, "contacted")}
                                className="px-2.5 py-1 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/30 hover:bg-[#06B6D4] text-[10px] font-semibold text-cyan-400 hover:text-[#0B0F19]"
                              >
                                Contacted
                              </button>
                              <button 
                                onClick={() => handleUpdateEnquiryStatus(enq._id, "qualified")}
                                className="px-2.5 py-1 rounded bg-[#059669]/10 border border-[#059669]/30 hover:bg-[#059669] text-[10px] font-semibold text-[#34D399] hover:text-[#0B0F19]"
                              >
                                Qualify
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {enquiries.length === 0 && (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-slate-500">No B2B leads registered in database.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Public Contact Form Submissions Table (includes charging & lounge booking requests) */}
              <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6">
                <h3 className="font-outfit text-sm font-bold text-white mb-2">Bookings & Contact Submissions</h3>
                <p className="text-[10px] text-slate-500 mb-6">
                  Charging pre-bookings, lounge membership requests, and general contact messages appear here.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E3A4E] text-slate-400 uppercase tracking-widest text-[9px]">
                        <th className="py-3 px-4">Submitter</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4 w-1/3">Message</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E3A4E]/40 text-slate-300">
                      {contacts.map((con) => (
                        <tr key={con._id} className="hover:bg-[#172033]/20">
                          <td className="py-3.5 px-4 font-semibold text-white">{con.name}</td>
                          <td className="py-3.5 px-4">{con.email}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-200">
                            <span className={`inline-flex items-center gap-1.5 ${
                              /booking|lounge|charging/i.test(con.subject) ? "text-[#34D399]" : ""
                            }`}>
                              {/booking|charging/i.test(con.subject) && (
                                <span className="text-[8px] font-bold uppercase bg-[#34D399]/10 px-1.5 py-0.5 rounded">Booking</span>
                              )}
                              {con.subject}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400 italic">"{con.message}"</td>
                          <td className="py-3.5 px-4">{new Date(con.createdAt).toLocaleDateString()}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="text-[10px] text-slate-500 font-mono">Logged</span>
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-slate-500">General contact inbox is empty.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
             TAB: SERVICES
             ======================================================== */}
          {activeTab === "services" && (
            <div className="space-y-8">
              
              <div className="flex justify-between items-center">
                <h3 className="font-outfit text-sm font-bold text-white">Active Station Amenities Services</h3>
                <button 
                  onClick={() => {
                    setServiceForm({ id: null, title: "", iconName: "Zap", description: "", features: "", category: "charging", isActive: true });
                    setShowServiceForm(true);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-[#059669] hover:bg-[#10B981] px-4.5 py-2 text-xs font-bold text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Service</span>
                </button>
              </div>

              {/* Service Form Overlay */}
              {showServiceForm && (
                <div className="rounded-xl border border-[#059669]/50 bg-[#172033]/55 p-6 backdrop-blur-md">
                  <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-[#34D399] mb-4">
                    {serviceForm.id ? "Edit Service Properties" : "Create New Service Offering"}
                  </h4>
                  
                  <form onSubmit={serviceFormSubmit => handleServiceSubmit(serviceFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Service Title</label>
                        <input 
                          type="text" 
                          required
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          placeholder="e.g. Liquid Cooled 350kW Port"
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Icon Library Key</label>
                        <select 
                          value={serviceForm.iconName}
                          onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        >
                          <option value="Zap">Zap (Electricity/Fast Charging)</option>
                          <option value="Coffee">Coffee (Lounge Cafe)</option>
                          <option value="Building2">Building2 (Corporate/Fleet)</option>
                          <option value="ShieldCheck">ShieldCheck (Security/Safety)</option>
                          <option value="Leaf">Leaf (Eco/Sustainability)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Category</label>
                        <select 
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        >
                          <option value="charging">Charging (Power/Terminal)</option>
                          <option value="lifestyle">Lifestyle (Amenities/Lounge)</option>
                          <option value="b2b">B2B (Enterprise/Fleet)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Features (comma separated list)</label>
                      <input 
                        type="text"
                        value={serviceForm.features}
                        onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                        placeholder="e.g. Liquid cooling, Dual connector bays, Pre-reservation logic"
                        className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Service Description</label>
                      <textarea 
                        required
                        rows="3"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        placeholder="Provide details on operation and features..."
                        className="w-full rounded bg-[#0B0F19] border border-[#2E3A4E] p-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                      />
                    </div>

                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={serviceForm.isActive}
                          onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                          className="rounded bg-[#0B0F19] border-[#2E3A4E] text-[#059669] focus:ring-0"
                        />
                        <span>Active and Visible on Landing Page</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="submit" 
                        className="h-10 px-6 rounded bg-[#059669] hover:bg-[#10B981] text-xs font-bold text-white transition-colors"
                      >
                        {serviceForm.id ? "Update Service" : "Create Service"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowServiceForm(false)}
                        className="h-10 px-6 rounded border border-[#2E3A4E] text-xs font-semibold text-slate-300 hover:bg-[#172033]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6 flex flex-col justify-between h-72">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                          {service.category}
                        </span>
                        <span className={`h-2.5 w-2.5 rounded-full ${service.isActive ? 'bg-[#34D399]' : 'bg-rose-500'}`} />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-2">{service.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[9px] text-slate-500 bg-[#0B0F19]/40 border border-[#2E3A4E]/20 px-1.5 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-[#2E3A4E]/30 pt-4 mt-4">
                      <button 
                        onClick={() => handleEditService(service)}
                        className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded bg-[#172033] hover:bg-[#2E3A4E] border border-[#2E3A4E] text-[10px] font-bold text-slate-300 transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteService(service._id)}
                        className="h-8 w-8 flex items-center justify-center rounded bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white transition-colors"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================
             TAB: GALLERY
             ======================================================== */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              
              <div className="flex justify-between items-center">
                <h3 className="font-outfit text-sm font-bold text-white">Hub Gallery Database References</h3>
                <button 
                  onClick={() => setShowGalleryForm(!showGalleryForm)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#059669] hover:bg-[#10B981] px-4.5 py-2 text-xs font-bold text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Image Reference</span>
                </button>
              </div>

              {/* Gallery Image Reference Form */}
              {showGalleryForm && (
                <div className="rounded-xl border border-[#059669]/50 bg-[#172033]/55 p-6 backdrop-blur-md">
                  <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-[#34D399] mb-4">
                    Add New Gallery Photo Reference
                  </h4>
                  
                  <form onSubmit={galleryFormSubmit => handleGallerySubmit(galleryFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Image Title</label>
                        <input 
                          type="text" 
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                          placeholder="e.g. Lounge Co-working Workstation"
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Category Tag</label>
                        <select 
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        >
                          <option value="general">General (Placeholder)</option>
                          <option value="lounge">Lounge (Inside coworking amenities)</option>
                          <option value="station">Station (Fast-charging bays/Canopies)</option>
                          <option value="event">Event (Station Launch/Promos)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Image URL (Unsplash or direct asset)</label>
                        <input 
                          type="url" 
                          required
                          value={galleryForm.url}
                          onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Alt Descriptive Text</label>
                        <input 
                          type="text" 
                          required
                          value={galleryForm.altText}
                          onChange={(e) => setGalleryForm({ ...galleryForm, altText: e.target.value })}
                          placeholder="e.g. View of comfortable desks and chairs inside clean lounge"
                          className="w-full h-10 rounded bg-[#0B0F19] border border-[#2E3A4E] px-3 text-xs text-white focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="submit" 
                        className="h-10 px-6 rounded bg-[#059669] hover:bg-[#10B981] text-xs font-bold text-white transition-colors"
                      >
                        Save Reference
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowGalleryForm(false)}
                        className="h-10 px-6 rounded border border-[#2E3A4E] text-xs font-semibold text-slate-300 hover:bg-[#172033]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Gallery List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img) => (
                  <div key={img._id} className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 overflow-hidden flex flex-col justify-between group">
                    <div className="relative h-44 bg-[#0B0F19]">
                      <img 
                        src={img.url} 
                        alt={img.altText} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex justify-between items-start gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-white">{img.title}</h5>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wide mt-1">{img.category}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteImage(img._id)}
                        className="h-7 w-7 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <p className="text-xs text-slate-500 py-4 col-span-3">No images uploaded in database yet.</p>
                )}
              </div>

            </div>
          )}

          {/* ========================================================
             TAB: TESTIMONIALS
             ======================================================== */}
          {activeTab === "testimonials" && (
            <div className="space-y-8">
              
              <div className="rounded-xl border border-[#2E3A4E]/60 bg-[#172033]/20 p-6">
                <h3 className="font-outfit text-sm font-bold text-white mb-6">User Reviews Moderation Queue</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#2E3A4E] text-slate-400 uppercase tracking-widest text-[9px]">
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4">EV Model / Badge</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4 w-1/3">Review Quote</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Featured</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E3A4E]/40 text-slate-300">
                      {testimonials.map((t) => (
                        <tr key={t._id} className="hover:bg-[#172033]/20">
                          <td className="py-3.5 px-4 font-semibold text-white">{t.authorName}</td>
                          <td className="py-3.5 px-4">
                            <div>{t.evModel || 'N/A'}</div>
                            <div className="text-[10px] text-[#34D399] mt-0.5">{t.ecoImpactBadge || 'N/A'}</div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-amber-400">{t.rating} ★</td>
                          <td className="py-3.5 px-4 text-xs text-slate-400 italic">"{t.quote}"</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              t.isApproved ? "bg-emerald-500/10 text-[#34D399]" : "bg-rose-500/10 text-rose-400"
                            }`}>{t.isApproved ? "Approved" : "Pending"}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              t.featured ? "bg-amber-500/10 text-amber-500" : "bg-slate-800 text-slate-500"
                            }`}>{t.featured ? "Featured" : "No"}</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {t.isApproved ? (
                                <button 
                                  onClick={() => handleModerateTestimonial(t._id, false, t.featured)}
                                  className="h-7 w-7 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                                  title="Unapprove review"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleModerateTestimonial(t._id, true, t.featured)}
                                  className="h-7 w-7 rounded bg-[#059669]/10 border border-[#059669]/20 text-[#34D399] hover:text-white flex items-center justify-center hover:bg-[#059669] transition-colors"
                                  title="Approve review"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleModerateTestimonial(t._id, t.isApproved, !t.featured)}
                                className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                                  t.featured ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-slate-800' : 'bg-slate-800 border-[#2E3A4E] text-slate-300 hover:bg-amber-500 hover:text-[#0B0F19] hover:border-transparent'
                                }`}
                              >
                                Feature
                              </button>
                              <button 
                                onClick={() => handleDeleteTestimonial(t._id)}
                                className="h-7 w-7 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center hover:bg-rose-500 transition-colors"
                                title="Delete Testimonial"
                              >
                                <Trash className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {testimonials.length === 0 && (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-slate-500">No testimonials registered in database.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
