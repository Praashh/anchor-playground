import Home from "./components/landing/Home"
import { ThemeProvider } from "./components/theme-provider"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import MainNav from "./components/landing/MainNav";
import { BrowserRouter } from "react-router-dom";

export default function App() {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = "https://api.devnet.solana.com";

  const wallets = useMemo(
    () => [],
    [network]
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <BrowserRouter>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <MainNav/>
          <Home />
        </WalletProvider>
      </ConnectionProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
