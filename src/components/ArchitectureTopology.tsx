'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchitectureNode } from '@/data/projects';
import { ArrowRight, CheckCircle2, Cpu, Zap, Activity } from 'lucide-react';
import { playClick, playHover } from '@/utils/audio';

interface ArchitectureTopologyProps {
  nodes: ArchitectureNode[];
  projectTitle: string;
}

export default function ArchitectureTopology({ nodes, projectTitle }: ArchitectureTopologyProps) {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  if (!nodes || nodes.length === 0) return null;

  const activeNode = nodes[activeNodeIndex];

  return (
    <div className="w-full bg-[#080d14]/90 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={16} className="text-primary animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary-light">
              Interactive Topology Explorer
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Topología de Datos: {projectTitle}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE ARCHITECTURE
          </span>
        </div>
      </div>

      {/* Node Pathway (Responsive: Horizontal scroll on desktop, vertical stack on small screens) */}
      <div className="my-8 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-2">
          {nodes.map((node, index) => {
            const isActive = index === activeNodeIndex;
            return (
              <div key={node.step} className="flex-1 flex flex-col md:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    playClick();
                    setActiveNodeIndex(index);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-primary/20 border-primary shadow-[0_0_25px_rgba(0,242,254,0.25)] text-white scale-[1.02]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06] text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isActive ? 'bg-primary text-black' : 'bg-white/10 text-gray-300'
                    }`}>
                      ETAPA {node.step}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {node.latencyOrRole}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
                    {node.name}
                  </h4>
                  <p className="text-[11px] font-mono text-gray-400 truncate mt-0.5">
                    {node.tech}
                  </p>
                </button>

                {/* Arrow connector between nodes on desktop */}
                {index < nodes.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-gray-600 px-1">
                    <ArrowRight size={14} className="text-gray-500 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-5 md:p-6 rounded-2xl bg-black/40 border border-primary/20 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary">
                <Cpu size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">
                  Etapa {activeNode.step} · Especificación Técnica
                </span>
                <h4 className="text-lg md:text-xl font-bold text-white">
                  {activeNode.name}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-cyan-300">
                Stack: {activeNode.tech}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-emerald-400">
                Métrica: {activeNode.latencyOrRole}
              </span>
            </div>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
            {activeNode.detail}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <Zap size={14} className="text-amber-400" />
            <span>Optimizada para máxima concurrencia y tolerancia a fallos.</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
