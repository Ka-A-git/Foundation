import { DBProviderType } from 'types/Wallet';
import { Connector } from 'wagmi';

interface WalletSessionArgs {
  token: string;
  connector: Connector;
}

interface ConnectWalletSessionData {
  done: boolean;
}

export async function connectWalletSession(
  args: WalletSessionArgs
): Promise<ConnectWalletSessionData> {
  const { token, connector } = args;

  const res = await fetch('/api/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      connectorType: getConnectorType(connector.id),
    }),
  });

  const data = await res.json();
  return data;
}

export async function disconnectWalletSession(): Promise<{ done: boolean }> {
  const res = await fetch('/api/disconnect', {
    method: 'POST',
  });

  const data: { done: boolean } = await res.json();
  return data;
}

// We have to use differnt enums here as the the DB expects Metamask as the injected value
const getConnectorType = (connectorId: string): DBProviderType =>
  connectorId === 'injected'
    ? DBProviderType.MetaMask
    : DBProviderType.WalletConnect;
