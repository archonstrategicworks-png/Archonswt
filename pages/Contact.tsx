import React, { useState } from 'react';
import { COMPANY_INFO, TRANSLATIONS } from '../constants';
import { Language } from '../types';

export const Contact: React.FC<{lang: Language}> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate SMTP transmission
    setTimeout(() => {
      console.log("Transmission sent to:", COMPANY_INFO.email);
      console.log("Payload:", formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div className="border-b border-amber-500/30 pb-4 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-slate-800 dark:text-white uppercase tracking-widest">Secure Comms Channel</h1>
           <p className="text-amber-600 dark:text-amber-500 font-mono text-xs mt-1">ENCRYPTION: AES-256 // DESTINATION: HQ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Details Card */}
        <div className="glass-panel p-8 rounded-xl border-l-4 border-amber-500 h-fit">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-wider">Headquarters Coordinates</h2>
          
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-amber-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="font-bold uppercase text-xs text-slate-500 mb-1">Corporate Office</p>
                <p>{COMPANY_INFO.address_office}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-amber-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <p className="font-bold uppercase text-xs text-slate-500 mb-1">Registered Address</p>
                <p>{COMPANY_INFO.address_reg}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-amber-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="font-bold uppercase text-xs text-slate-500 mb-1">Secure Line</p>
                <p className="font-mono text-lg tracking-wider">{COMPANY_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-amber-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-bold uppercase text-xs text-slate-500 mb-1">Digital Protocol</p>
                <p className="font-mono text-amber-500">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">{COMPANY_INFO.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-slate-500">Operative Name</label>
                 <input 
                   required
                   type="text" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-3 text-sm focus:border-amber-500 outline-none transition-colors"
                   placeholder="Enter Full Name"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-slate-500">Return Channel (Email)</label>
                 <input 
                   required
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-3 text-sm focus:border-amber-500 outline-none transition-colors"
                   placeholder="name@organization.com"
                 />
               </div>
             </div>
             
             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-slate-500">Subject Directive</label>
               <input 
                 required
                 type="text" 
                 value={formData.subject}
                 onChange={(e) => setFormData({...formData, subject: e.target.value})}
                 className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-3 text-sm focus:border-amber-500 outline-none transition-colors"
                 placeholder="e.g., Tender Inquiry #404"
               />
             </div>

             <div className="space-y-2">
               <label className="text-xs font-bold uppercase text-slate-500">Briefing / Message</label>
               <textarea 
                 required
                 rows={5}
                 value={formData.message}
                 onChange={(e) => setFormData({...formData, message: e.target.value})}
                 className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-3 text-sm focus:border-amber-500 outline-none transition-colors"
                 placeholder="Enter detailed specifications or inquiry..."
               />
             </div>

             <button 
                type="submit" 
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded font-bold uppercase tracking-widest text-sm transition-all ${
                  status === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                }`}
             >
               {status === 'idle' && 'Transmit Message'}
               {status === 'sending' && 'Encrypting & Sending...'}
               {status === 'success' && 'Transmission Confirmed'}
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};