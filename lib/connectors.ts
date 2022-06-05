import { chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { AlchemyProvider, WebSocketProvider } from '@ethersproject/providers';

import getAlchemyAPIKey from './getAlchemyAPIKey';

import { WALLETCONNECT_BRIDGE } from 'lib/constants';

const chains = [chain.goerli, chain.mainnet, chain.ropsten, chain.rinkeby];

// shimDisconnect is helpful so that after disconnecting with MetaMask even after a page reload it will stay disconnected
export const connectors = [
  new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    chains,
    options: {
      rpc: {
        1: process.env.NEXT_PUBLIC_RPC_URI,
        3: process.env.NEXT_PUBLIC_RPC_URI,
        4: process.env.NEXT_PUBLIC_RPC_URI,
        5: process.env.NEXT_PUBLIC_RPC_URI,
      },
      qrcode: true,
      bridge: WALLETCONNECT_BRIDGE,
      qrcodeModalOptions: {
        mobileLinks: ['rainbow', 'metamask', 'trust', 'imtoken', 'argent'],
      },
    },
  }),
];

interface ProviderArgs {
  chainId: number;
}

export const getProvider = ({ chainId }: ProviderArgs): AlchemyProvider => {
  try {
    return new AlchemyProvider(chainId, getAlchemyAPIKey());
  } catch (error) {
    return;
  }
};

export const getWebSocketProvider = ({
  chainId,
}: ProviderArgs): WebSocketProvider => {
  try {
    return AlchemyProvider.getWebSocketProvider(chainId, getAlchemyAPIKey());
  } catch (error) {
    return;
  }
};
