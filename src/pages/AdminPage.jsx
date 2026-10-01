import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, LogOut, Plus, Trash2, Edit3, Save, X, Check,
  Users, Building2, Calendar, Phone, Mail, User, ChevronDown,
  Upload, AlertCircle, CheckCircle2, Clock, TrendingUp
} from 'lucide-react';
import {
  getProperties, addProperty, updateProperty, deleteProperty,
  getLeads, updateLead, deleteLead
} from '../store';

const ADMIN_PASSWORD = '1234';

// ─── LOGIN GATE ──────────────────────────────────────────────────────────────
function LoginGate({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Wrong password. Try again.');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1f16] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-900 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Home className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">
            Leovin <span className="text-[#d4af37] italic font-normal">Admin</span>
          </h1>
          <p className="text-emerald-200/60 text-sm mt-2">Restricted access — authorized personnel only</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`bg-emerald-950/80 border border-emerald-800/60 rounded-2xl p-8 shadow-2xl backdrop-blur-md transition-all ${shaking ? 'animate-[shake_0.5s_ease]' : ''}`}
          style={shaking ? { animation: 'shake 0.5s' } : {}}
        >
          <label className="block text-xs font-semibold text-emerald-200/70 uppercase tracking-wider mb-2">
            Admin Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Enter password..."
            className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all mb-4 placeholder-emerald-700"
            autoFocus
          />
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-xs mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#d4af37] hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
          >
            Access Dashboard
          </button>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="text-xs text-emerald-200/40 hover:text-emerald-200/80 transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─── PROPERTY FORM MODAL ─────────────────────────────────────────────────────
function PropertyModal({ property, onSave, onClose }) {
  const [form, setForm] = useState(
    property || {
      title: '', category: 'Villas', location: '', price: '',
      specs: { beds: '', baths: '', area: '' },
      badge: 'New Listing', image: '', description: '', sold: false,
    }
  );

  const categories = ['Villas', 'Apartments', 'Duplexes', 'Penthouses'];
  const badges = ['Featured', 'New Listing', 'Hot Deal', 'Verified', 'Exclusive', 'Premium', 'Sold'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f291e] border border-emerald-800/60 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-emerald-800/40">
          <h2 className="font-serif text-xl font-bold text-white">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button onClick={onClose} className="text-emerald-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Property Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                placeholder="e.g. Ocean View Villa" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Badge</label>
              <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all">
                {badges.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Location *</label>
              <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                placeholder="e.g. Lekki Phase 1, Lagos" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Price *</label>
              <input required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                placeholder="e.g. ₦350,000,000" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Bedrooms</label>
              <input type="number" min="0" value={form.specs.beds}
                onChange={(e) => setForm({ ...form, specs: { ...form.specs, beds: e.target.value } })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Bathrooms</label>
              <input type="number" min="0" value={form.specs.baths}
                onChange={(e) => setForm({ ...form, specs: { ...form.specs, baths: e.target.value } })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Area</label>
              <input value={form.specs.area}
                onChange={(e) => setForm({ ...form, specs: { ...form.specs, area: e.target.value } })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                placeholder="e.g. 750 sqm" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Image Path or URL</label>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                placeholder="/your-image.jpg  or  https://..." />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-1.5">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all resize-none"
                placeholder="Brief property description..." />
            </div>

            <div className="sm:col-span-2 flex items-center space-x-3">
              <button type="button"
                onClick={() => setForm({ ...form, sold: !form.sold })}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${form.sold ? 'bg-red-500' : 'bg-emerald-800'} relative`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${form.sold ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-sm text-emerald-200/80">Mark as Sold</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-emerald-800 text-emerald-200 hover:bg-emerald-900/40 text-sm transition-all">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#d4af37] hover:bg-yellow-400 text-black font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {property ? 'Save Changes' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingLead, setEditingLead] = useState(null);
  const [inspectionDate, setInspectionDate] = useState('');

  const refresh = () => {
    setProperties(getProperties());
    setLeads(getLeads());
  };

  useEffect(() => { refresh(); }, []);

  const handleSaveProperty = (form) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, form);
    } else {
      addProperty(form);
    }
    setShowModal(false);
    setEditingProperty(null);
    refresh();
  };

  const handleDeleteProperty = (id) => {
    deleteProperty(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleBookLead = (lead) => {
    setEditingLead(lead);
    setInspectionDate(lead.inspectionDate || '');
  };

  const handleSaveLead = () => {
    updateLead(editingLead.id, { booked: true, inspectionDate });
    setEditingLead(null);
    refresh();
  };

  const handleUnbookLead = (id) => {
    updateLead(id, { booked: false, inspectionDate: null });
    refresh();
  };

  const stats = {
    active: properties.filter((p) => !p.sold).length,
    sold: properties.filter((p) => p.sold).length,
    leads: leads.length,
    booked: leads.filter((l) => l.booked).length,
  };

  return (
    <div className="min-h-screen bg-[#0a1f16] text-white">
      {/* Top Nav */}
      <header className="bg-black/70 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-white">
            Leovin <span className="text-[#d4af37] italic font-normal">Admin</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs text-emerald-300/60 hover:text-white transition-colors hidden sm:block">
            View Website
          </Link>
          <button onClick={onLogout}
            className="flex items-center space-x-1.5 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg border border-red-500/20">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: stats.active, icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'Properties Sold', value: stats.sold, icon: CheckCircle2, color: 'text-[#d4af37]', bg: 'bg-[#d4af37]/10 border-[#d4af37]/20' },
            { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Booked Inspections', value: stats.booked, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} border rounded-2xl p-5 flex items-center gap-4`}>
              <div className={`${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-white">{stat.value}</p>
                <p className="text-xs text-emerald-200/60 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6 bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-1 w-fit">
          {['properties', 'leads'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                tab === t ? 'bg-[#d4af37] text-black shadow' : 'text-emerald-200/60 hover:text-white'
              }`}>
              {t === 'properties' ? '🏠 Properties' : '👥 Leads'}
            </button>
          ))}
        </div>

        {/* ── PROPERTIES TAB ── */}
        {tab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-serif font-bold text-white">All Listings</h2>
              <button onClick={() => { setEditingProperty(null); setShowModal(true); }}
                className="flex items-center gap-2 bg-[#d4af37] hover:bg-yellow-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {properties.map((p) => (
                <div key={p.id} className={`bg-emerald-950/50 border rounded-2xl overflow-hidden transition-all ${p.sold ? 'border-red-500/30 opacity-70' : 'border-emerald-800/40'}`}>
                  <div className="relative h-48">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-emerald-900/40 flex items-center justify-center text-emerald-700">
                        <Building2 className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.sold ? 'bg-red-500 text-white' : 'bg-emerald-950/80 text-[#d4af37] border border-[#d4af37]/30'}`}>
                        {p.sold ? 'SOLD' : p.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-white mb-1 line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-emerald-300/60 mb-2">{p.location}</p>
                    <p className="text-[#d4af37] font-bold text-sm mb-4">{p.price}</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingProperty(p); setShowModal(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-xs font-medium text-white transition-all border border-emerald-800/50">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-400 transition-all border border-red-500/20">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LEADS TAB ── */}
        {tab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-serif font-bold text-white">Chatbot Leads</h2>
              <span className="text-xs text-emerald-200/50 bg-emerald-900/30 border border-emerald-800/30 px-3 py-1.5 rounded-lg">
                {leads.length} total · {leads.filter(l => l.booked).length} booked
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-20 text-emerald-200/40">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-base font-serif">No leads yet</p>
                <p className="text-sm mt-1">Leads collected from the chatbot will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id}
                    className={`bg-emerald-950/50 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${lead.booked ? 'border-emerald-600/40' : 'border-emerald-800/30'}`}>
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-[#0f291e] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] font-bold text-base flex-shrink-0">
                      {lead.name ? lead.name[0].toUpperCase() : '?'}
                    </div>

                    {/* Lead Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-white text-sm">
                          {lead.name || 'Unknown Name'}
                        </h3>
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          lead.booked
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                        }`}>
                          {lead.booked ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {lead.booked ? 'Booked' : 'Not Booked'}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-200/60">
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#d4af37]" /> {lead.phone}
                          </span>
                        )}
                        {lead.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#d4af37]" /> {lead.email}
                          </span>
                        )}
                        {lead.interest && (
                          <span className="flex items-center gap-1 italic">
                            Interest: {lead.interest}
                          </span>
                        )}
                        {lead.booked && lead.inspectionDate && (
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <Calendar className="w-3 h-3" /> Inspection: {new Date(lead.inspectionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {!lead.booked && (
                          <span className="flex items-center gap-1 text-orange-400/70">
                            <Calendar className="w-3 h-3" /> Inspection: —
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      {!lead.booked ? (
                        <button onClick={() => handleBookLead(lead)}
                          className="flex items-center gap-1.5 bg-emerald-700/50 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-2 rounded-lg border border-emerald-700/50 transition-all">
                          <Calendar className="w-3.5 h-3.5" /> Book
                        </button>
                      ) : (
                        <button onClick={() => handleUnbookLead(lead.id)}
                          className="flex items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-medium px-3 py-2 rounded-lg border border-orange-500/20 transition-all">
                          <X className="w-3.5 h-3.5" /> Unbook
                        </button>
                      )}
                      <button onClick={() => deleteLead(lead.id) || refresh()}
                        className="text-red-400/60 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Property Modal */}
      {showModal && (
        <PropertyModal
          property={editingProperty}
          onSave={handleSaveProperty}
          onClose={() => { setShowModal(false); setEditingProperty(null); }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f291e] border border-red-500/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-white text-xl mb-2">Delete Property?</h3>
            <p className="text-emerald-200/60 text-sm mb-6">This cannot be undone. The listing will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-emerald-800 text-emerald-200 hover:bg-emerald-900/40 text-sm transition-all">Cancel</button>
              <button onClick={() => handleDeleteProperty(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Book Inspection Dialog */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f291e] border border-emerald-800/60 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="font-serif font-bold text-white text-xl mb-1">Book Inspection</h3>
            <p className="text-emerald-200/60 text-sm mb-5">
              Set a date for <span className="text-white font-medium">{editingLead.name || 'this lead'}</span>
            </p>
            <label className="block text-xs font-semibold text-emerald-300/70 uppercase tracking-wider mb-2">Inspection Date</label>
            <input type="date" value={inspectionDate} onChange={(e) => setInspectionDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-black/30 border border-emerald-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-all mb-6" />
            <div className="flex gap-3">
              <button onClick={() => setEditingLead(null)}
                className="flex-1 py-2.5 rounded-xl border border-emerald-800 text-emerald-200 hover:bg-emerald-900/40 text-sm transition-all">Cancel</button>
              <button onClick={handleSaveLead} disabled={!inspectionDate}
                className="flex-1 py-2.5 rounded-xl bg-[#d4af37] hover:bg-yellow-400 text-black font-bold text-sm transition-all disabled:opacity-40">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem('leovin_admin_auth') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('leovin_admin_auth', 'true');
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('leovin_admin_auth');
    setAuthed(false);
  };

  return authed ? <AdminDashboard onLogout={handleLogout} /> : <LoginGate onLogin={handleLogin} />;
}
