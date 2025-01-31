import { Connection, PublicKey } from "@solana/web3.js";

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC_URL);

export const getPumpFunTokens = async () => {
  try {
    const pumpFunAddress = new PublicKey(process.env.NEXT_PUBLIC_PUMP_FUN_CONTRACT || "INSERT_PUMP_FUN_CONTRACT_ADDRESS_HERE");
    const signatures = await connection.getSignaturesForAddress(pumpFunAddress, { limit: 10 });
    if (!signatures || signatures.length === 0) {
      throw new Error("No recent transactions found for Pump.fun contract.");
    }
    return signatures;
  } catch (error) {
    console.error("🚨 Error fetching Pump.fun tokens:", error.message);
    return [];
  }
};