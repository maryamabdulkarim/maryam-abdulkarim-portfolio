import React, { useState } from 'react';
import { ArrowRightLeft, Activity, Sliders, CheckCircle2, RefreshCw, Sparkles, Send } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fintech' | 'health' | 'design'>('fintech');

  // Widget 1 State: Fintech FX
  const [fxAmount, setFxAmount] = useState<number>(250);
  const [targetCurrency, setTargetCurrency] = useState<'NGN' | 'KES' | 'GHS' | 'EUR'>('NGN');
  const [isTransacting, setIsTransacting] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);

  const exchangeRates = {
    NGN: 1540.5,
    KES: 131.2,
    GHS: 15.8,
    EUR: 0.92
  };

  const calculatedOutput = (fxAmount * exchangeRates[targetCurrency]).toLocaleString(undefined, {
    maximumFractionDigits: 2
  });

  const handleSimulateTransfer = () => {
    setIsTransacting(true);
    setTxSuccess(false);
    setTimeout(() => {
      setIsTransacting(false);
      setTxSuccess(true);
      setTimeout(() => setTxSuccess(false), 4000);
    }, 1200);
  };

  // Widget 2 State: HealthTech AMR
  const [selectedOrganism, setSelectedOrganism] = useState<'E_COLI' | 'KLEBSIELLA' | 'STAPH_AUREUS'>('E_COLI');
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<'CIPRO' | 'MEROPENEM' | 'AMIKACIN' | 'VANCOMYCIN'>('MEROPENEM');

  const organisms = {
    E_COLI: { name: 'Escherichia coli (UPEC strain)', gram: 'Gram-negative rod', origin: 'Clinical Urine Isolate' },
    KLEBSIELLA: { name: 'Klebsiella pneumoniae (ESBL+)', gram: 'Gram-negative bacillus', origin: 'Sputum Culture' },
    STAPH_AUREUS: { name: 'Staphylococcus aureus (MRSA)', gram: 'Gram-positive cocci', origin: 'Wound Biopsy' }
  };

  const amrData: Record<string, Record<string, { status: 'Susceptible' | 'Intermediate' | 'Resistant'; mic: string; rationale: string }>> = {
    E_COLI: {
      CIPRO: { status: 'Resistant', mic: '≥ 4 µg/mL', rationale: 'GyrA mutation detected. High fluoroquinolone resistance.' },
      MEROPENEM: { status: 'Susceptible', mic: '≤ 0.5 µg/mL', rationale: 'Carbapenem integrity intact. Optimal clinical choice.' },
      AMIKACIN: { status: 'Susceptible', mic: '≤ 2 µg/mL', rationale: 'Effective aminoglycoside synergism.' },
      VANCOMYCIN: { status: 'Resistant', mic: '> 32 µg/mL', rationale: 'Naturally resistant (Gram-negative outer membrane barrier).' }
    },
    KLEBSIELLA: {
      CIPRO: { status: 'Resistant', mic: '≥ 8 µg/mL', rationale: 'High plasmid-mediated quinolone resistance (qnr).' },
      MEROPENEM: { status: 'Intermediate', mic: '2 µg/mL', rationale: 'Borderline carbapenemase production suspected.' },
      AMIKACIN: { status: 'Susceptible', mic: '4 µg/mL', rationale: 'Preserved susceptibility for combination therapy.' },
      VANCOMYCIN: { status: 'Resistant', mic: '> 64 µg/mL', rationale: 'Intrinsically inactive against Enterobacteriaceae.' }
    },
    STAPH_AUREUS: {
      CIPRO: { status: 'Intermediate', mic: '2 µg/mL', rationale: 'Variable clinical response in deep-tissue infections.' },
      MEROPENEM: { status: 'Resistant', mic: '≥ 16 µg/mL', rationale: 'Modified PBP2a (mecA gene) confers beta-lactam resistance.' },
      AMIKACIN: { status: 'Intermediate', mic: '16 µg/mL', rationale: 'Sub-therapeutic without adjunctive beta-lactam.' },
      VANCOMYCIN: { status: 'Susceptible', mic: '1 µg/mL', rationale: 'Standard therapy for MRSA under therapeutic drug monitoring.' }
    }
  };

  const currentAmr = amrData[selectedOrganism][selectedAntibiotic];

  return (
    <section className="py-20 md:py-28 border-b border-neutral-900 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE PROVING GROUND</span>
              <span aria-hidden="true">/</span>
              <span>LIVE MICRO-APPLICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Craft Sandbox
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-light">
              Experience sample interactive modules engineered with responsive logic, real-time calculation, and domain-native workflows.
            </p>
          </div>

          {/* Playground Tabs */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'fintech'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Fintech Engine</span>
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'health'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>AMR Health Matrix</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Fintech Remittance Engine */}
        {activeTab === 'fintech' && (
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400">DEMO 01 · NEXUS FINPULSE ARCHITECTURE</span>
                <h3 className="text-2xl font-bold text-white">
                  Real-Time Multi-Currency FX Pipeline
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Interactive simulation of the high-velocity cross-border settlement engine built for African professionals and diaspora merchants.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                  <span>Guaranteed FX Rate</span>
                  <span className="text-white">1 USD = {exchangeRates[targetCurrency]} {targetCurrency}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                  <span>Network Processing Fee</span>
                  <span className="text-emerald-400">0.00 USD (Zero Fee Promotion)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                  <span>Estimated Settlement Speed</span>
                  <span className="text-white">&lt; 1.4 seconds</span>
                </div>
              </div>
            </div>

            {/* Interactive Calculator UI */}
            <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-800 rounded-xl p-6 md:p-8 space-y-6">
              
              {/* Send Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400">You Send (USD)</label>
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 focus-within:border-amber-400 transition-colors">
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    value={fxAmount}
                    onChange={(e) => setFxAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-transparent text-xl font-bold font-mono text-white focus:outline-none"
                  />
                  <span className="text-sm font-semibold text-neutral-300 px-2 py-1 rounded bg-neutral-800 font-mono">
                    USD ($)
                  </span>
                </div>
              </div>

              {/* Target Currency Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400">Recipient Currency</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['NGN', 'KES', 'GHS', 'EUR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setTargetCurrency(curr)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        targetCurrency === curr
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Receives Output */}
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-neutral-400">Recipient Receives</p>
                  <p className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
                    {calculatedOutput} <span className="text-sm font-normal text-white">{targetCurrency}</span>
                  </p>
                </div>
                <div className="text-right text-[11px] font-mono text-emerald-400">
                  Instant P2P
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulateTransfer}
                disabled={isTransacting}
                className="w-full py-3.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-75"
              >
                {isTransacting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>Processing Cryptographic Hash...</span>
                  </>
                ) : txSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                    <span>Settlement Confirmed in 1.2s!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>Execute Simulated Transfer</span>
                  </>
                )}
              </button>

            </div>

          </div>
        )}

        {/* Tab 2: HealthTech AMR Susceptibility Matrix */}
        {activeTab === 'health' && (
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400">DEMO 02 · MEDTRACK CLINICAL ALGORITHM</span>
                <h3 className="text-2xl font-bold text-white">
                  AMR Clinical Breakpoint Interpreter
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Laboratory surveillance module mapping bacterial susceptibility against CLSI guideline cutoffs, demonstrating Maryam's health data informatics expertise.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs space-y-2">
                <div className="text-neutral-400 font-mono">Active Pathogen Profile:</div>
                <div className="font-semibold text-white">{organisms[selectedOrganism].name}</div>
                <div className="text-neutral-400">{organisms[selectedOrganism].gram} · {organisms[selectedOrganism].origin}</div>
              </div>
            </div>

            {/* Matrix Controls & Output */}
            <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-800 rounded-xl p-6 md:p-8 space-y-6">
              
              {/* Organism Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400">Select Bacterial Isolate</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'E_COLI', label: 'E. coli' },
                    { key: 'KLEBSIELLA', label: 'K. pneumoniae' },
                    { key: 'STAPH_AUREUS', label: 'S. aureus' }
                  ].map((org) => (
                    <button
                      key={org.key}
                      onClick={() => setSelectedOrganism(org.key as any)}
                      className={`p-2.5 text-xs rounded-lg border text-left transition-colors ${
                        selectedOrganism === org.key
                          ? 'bg-neutral-800 text-white border-amber-400 font-medium'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {org.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Antibiotic Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400">Select Antibiotic Agent</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'CIPRO', label: 'Ciprofloxacin' },
                    { key: 'MEROPENEM', label: 'Meropenem' },
                    { key: 'AMIKACIN', label: 'Amikacin' },
                    { key: 'VANCOMYCIN', label: 'Vancomycin' }
                  ].map((atb) => (
                    <button
                      key={atb.key}
                      onClick={() => setSelectedAntibiotic(atb.key as any)}
                      className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors truncate ${
                        selectedAntibiotic === atb.key
                          ? 'bg-neutral-800 text-white border-amber-400 font-medium'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {atb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinical Result Card */}
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">CLSI Clinical Interpretation</span>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded font-mono ${
                      currentAmr.status === 'Susceptible'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : currentAmr.status === 'Intermediate'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {currentAmr.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-mono">Minimum Inhibitory Conc. (MIC):</span>
                  <span className="font-mono text-white font-bold">{currentAmr.mic}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  <strong className="text-white font-medium">Pharmacological Rationale: </strong>
                  {currentAmr.rationale}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
