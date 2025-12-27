import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Language, User } from '../types';
import { useNavigate } from 'react-router-dom';

// Mock context hook or prop injection would normally provide user. 
// For this structure, we assume user is passed or available via global state.
// Here we accept it as prop for demonstration within the router structure if feasible, 
// OR we use a simple local storage check/mock for the "is logged in" state in this simplified example.

interface ProjectsProps {
  lang: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Mock checking authentication status from localStorage/Session for this component
  // In a real React app, use useContext(AuthContext)
  const isAuthenticated = localStorage.getItem('user_role') !== null; 

  const handleRestrictedAccess = (projectId: string) => {
    if (isAuthenticated) {
      setSelectedProject(projectId);
    } else {
      // Prompt to login
      if (confirm("Restricted Access: Authentication Required. Proceed to Login?")) {
        navigate('/estimate/login');
      }
    }
  };

  const project = PROJECTS.find(p => p.id === selectedProject);

  return (
    <div className="space-y-8 relative">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white uppercase tracking-widest border-l-4 border-amber-500 pl-4">Active Deployments</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="glass-panel bg-white/50 dark:bg-slate-900/60 rounded-xl overflow-hidden group hover:border-amber-500 transition-all duration-500 shadow-lg">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded uppercase shadow-md">
                {project.status}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{project.title}</h2>
                   <p className="text-slate-500 dark:text-slate-400 text-sm font-mono flex items-center gap-2">
                     <span className="text-amber-600 dark:text-amber-500">📍</span> {project.location}
                   </p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <button 
                onClick={() => handleRestrictedAccess(project.id)}
                className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 uppercase text-xs font-bold tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Restricted Access: View Technical Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Specs Modal */}
      {selectedProject && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="animate-pulse">●</span> CONFIDENTIAL // {project.id.toUpperCase()}
              </h3>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">&times;</button>
            </div>
            <div className="p-8 space-y-6">
               <h2 className="text-2xl text-white font-bold">{project.title}</h2>
               <div className="grid grid-cols-2 gap-4 text-sm font-mono text-slate-300">
                 <div className="p-3 bg-slate-950 rounded border border-slate-700">
                   <span className="text-slate-500 block text-xs uppercase mb-1">Budget Code</span>
                   ASW-GOV-2024-X9
                 </div>
                 <div className="p-3 bg-slate-950 rounded border border-slate-700">
                   <span className="text-slate-500 block text-xs uppercase mb-1">Clearance Level</span>
                   LEVEL 4 (DEFENSE)
                 </div>
               </div>
               <div className="text-slate-400 text-sm space-y-2">
                 <p><strong>Load Bearing Capacity:</strong> 75 Tons/sqm (Reinforced)</p>
                 <p><strong>Material Spec:</strong> ASTM A615 Grade 60 Rebar, 5000 PSI Concrete</p>
                 <p><strong>Timeline:</strong> Phase 1 completion due Q3 2025.</p>
                 <p className="italic text-slate-500 mt-4 border-t border-slate-800 pt-2">Note: This document is watermarked with your User ID for leak tracing.</p>
               </div>
               <div className="flex justify-end pt-4">
                 <button onClick={() => window.print()} className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded text-xs font-bold uppercase">Print Spec Sheet</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};