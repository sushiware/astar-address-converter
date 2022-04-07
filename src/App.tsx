import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  ethreumAddressToAstarNetworkAddress,
  isValidEthreumAddress,
  SAMPLE_EVM_ADDRESS,
} from "./converter";

const App: Component = () => {
  const [state, setState] = createSignal({
    ethreum_address: SAMPLE_EVM_ADDRESS,
    astar_network_address:
      ethreumAddressToAstarNetworkAddress(SAMPLE_EVM_ADDRESS),
  });

  const convertEthreumAddressToAstarNetworkAddress = (
    ethreum_address: string
  ): void => {
    const astar_network_address = isValidEthreumAddress(ethreum_address)
      ? ethreumAddressToAstarNetworkAddress(ethreum_address)
      : "";

    console.log(
      astar_network_address === ""
        ? `Invalid evm address: ${ethreum_address}`
        : `Converted evm address to astar network address: ${astar_network_address}`
    );

    setState({
      ethreum_address: ethreum_address,
      astar_network_address: astar_network_address,
    });
  };

  return (
    <div>
      <h1>EVM To Astar Address Converter</h1>
      <h2>EVM(0x~) to Astar(Native)</h2>
      <p>From</p>
      <input
        type="text"
        onInput={(e) => {
          convertEthreumAddressToAstarNetworkAddress(e.currentTarget.value);
        }}
        value={state().ethreum_address}
        size={70}
      />
      <p>To</p>
      <p>{state().astar_network_address}</p>
      <footer>
        <a href="https://github.com/sushiware/astar-address-converter">
          https://github.com/sushiware/astar-address-converter
        </a>
      </footer>
    </div>
  );
};

export default App;
