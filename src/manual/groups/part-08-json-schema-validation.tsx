import React from "react";
import { FileJson, Shield } from "lucide-react";
import { ManualDrawer } from "../components/ManualDrawer";
import { ManualSectionDrawer } from "../components/ManualSectionDrawer";
import { CANONICAL_JSON_SHAPE } from "../examples/canonical-json-shape";
import { JSON_SCHEMA_DEFINITION } from "../examples/json-schema-definition";
import { TYPES_IMPLEMENTATION } from "../examples/types-implementation";
import { JSON_SCHEMA_TYPES_IMPLEMENTATION } from "../examples/json-schema-types-implementation";
import { SCHEMA_IMPLEMENTATION } from "../examples/schema-implementation";
import { VALIDATE_IMPLEMENTATION } from "../examples/validate-implementation";
import { SCHEMA_DESIGN_PRINCIPLES } from "../content/implementation-guidance";

export function Part08JsonSchemaValidation() {
  return (
    <>
      <ManualSectionDrawer
        icon={FileJson}
        title="Part VIII. JSON Schema & Validation"
        subtitle="Canonical Run Record Contract"
      >
        <div className="space-y-4">
          <ManualDrawer title="A. Canonical JSON Shape (Example)">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  This is the practical schema in JSON form. It represents a single, layered run record that preserves all necessary context for research and engineering.
                </p>
              </div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[400px]">
                {CANONICAL_JSON_SHAPE}
              </pre>
            </div>
          </ManualDrawer>

          <ManualDrawer title="B. JSON Schema Definition (Draft 2020-12)">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  The canonical CompassRunRecord is governed by a Draft 2020-12 JSON Schema. This ensures that any exported data can be validated by standard tooling.
                </p>
              </div>
              <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[300px]">
                {JSON_SCHEMA_DEFINITION}
              </pre>
            </div>
          </ManualDrawer>

          <ManualDrawer title="C. Validation Strategy">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  To keep the system tidy, we split the implementation into three distinct layers. This prevents the engine types, JSON Schema, and runtime validation from drifting apart.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">types.ts</div>
                  <p className="text-[10px] text-white/30">The TypeScript interfaces (the practical contract).</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">schema.ts</div>
                  <p className="text-[10px] text-white/30">The JSON Schema object (the structural contract).</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">validate.ts</div>
                  <p className="text-[10px] text-white/30">The runtime validator (the enforcement layer).</p>
                </div>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="D. Schema Design Principles">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p className="text-cyan-400 font-medium italic">
                  "The most important structural split is what lets you export a compact research record, a DB row, or a full debug file without changing the meaning of the run."
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SCHEMA_DESIGN_PRINCIPLES.map((item, i) => (
                  <div key={i} className="flex gap-2 p-3 bg-black/20 rounded-lg border border-white/5">
                    <span className="font-mono text-cyan-400 shrink-0">{item.k}:</span>
                    <span className="text-white/40 text-[10px]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="E. Implementation: types.ts">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  This is the core TypeScript contract that governs the Compass simulation. It is designed to be shared between the simulation engine, the database ingestion layer, and the research export tools.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Source: /src/types.ts</div>
                  <FileJson className="w-3 h-3 text-cyan-400/40" />
                </div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[500px]">
                  {TYPES_IMPLEMENTATION}
                </pre>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="F. Implementation: json-schema-types.ts">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  To ensure consistency and avoid circular dependencies, we define the JSON Schema meta-types in a dedicated shared file. This allows both the schema definition and the runtime validator to share the same structural contract.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Source: /src/json-schema-types.ts</div>
                  <FileJson className="w-3 h-3 text-cyan-400/40" />
                </div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[500px]">
                  {JSON_SCHEMA_TYPES_IMPLEMENTATION}
                </pre>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="G. Implementation: schema.ts">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  The structural contract is defined using JSON Schema (Draft 2020-12). This allows for automated validation of simulation records across different platforms and languages.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Source: /src/schema.ts</div>
                  <FileJson className="w-3 h-3 text-cyan-400/40" />
                </div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[500px]">
                  {SCHEMA_IMPLEMENTATION}
                </pre>
              </div>
            </div>
          </ManualDrawer>

          <ManualDrawer title="H. Implementation: validate.ts">
            <div className="space-y-6">
              <div className="space-y-4 text-[10px] text-white/40 leading-relaxed">
                <p>
                  The runtime validation layer provides a lightweight, dependency-free way to verify Compass simulation records. While the JSON Schema provides the structural contract, this validator ensures that incoming data can be safely cast to the TypeScript interfaces.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Source: /src/validate.ts</div>
                  <FileJson className="w-3 h-3 text-cyan-400/40" />
                </div>
                <pre className="p-4 bg-black/40 rounded-xl border border-white/5 text-[9px] font-mono text-cyan-400 overflow-x-auto max-h-[500px]">
                  {VALIDATE_IMPLEMENTATION}
                </pre>
              </div>
            </div>
          </ManualDrawer>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
            <p className="text-[11px] text-cyan-400/80 leading-relaxed font-medium italic text-center">
              "The canonical CompassRunRecord is the single source of truth for simulation data. By defining it piece-by-piece and governing it with JSON Schema, we ensure that research observations remain valid across engine versions and storage backends."
            </p>
          </div>
        </div>
      </ManualSectionDrawer>
    </>
  );
}
