
/**
 * Bridge and event types for the Telos kernel.
 */
export const BRIDGE_EVENT_TYPES = `
interface BridgeEvent {
  step: number;
  fromDomain: string;
  toDomain: string;
  fromSymbol: SymbolID;
  toSymbol: SymbolID;
  bridgeSymbol: SymbolID;    // The symbol that bridges them
  deltaScore: number;
  coherenceShift: number;
}

interface BridgeSummary {
  totalActivations: number;
  activationsByFamily: Record<string, number>;
  mostActiveBridge: string;
  meanActivationRate: number;
}
`;
