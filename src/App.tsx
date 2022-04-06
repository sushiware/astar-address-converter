import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { u8aToHex, hexToU8a, isHex } from "@polkadot/util";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";

const alice = "ajYMsCKsEAhEvHpeA4XqsfiA9v1CdzZPrCfS6pEfeGHW9j8";
const astarPrefix = 5;

const isValidSS58 = (ss58: string): boolean => {
  if (isHex(ss58)) {
    return false;
  }

  try {
    encodeAddress(decodeAddress(ss58, false, astarPrefix), astarPrefix);

    return true;
  } catch (error) {
    return false;
  }
};

const isValidHex = (hex: string): boolean => {
  if (!isHex(hex)) {
    return false;
  }

  try {
    encodeAddress(hexToU8a(hex), astarPrefix);

    return true;
  } catch (error) {
    return false;
  }
};

const hexToSS58 = (hex: string): string =>
  encodeAddress(hexToU8a(hex), astarPrefix);
const ss58ToHex = (ss58: string): string =>
  u8aToHex(decodeAddress(ss58, false, astarPrefix));

const App: Component = () => {
  const [state, setState] = createSignal({
    ss58_to_hex_from: alice,
    ss58_to_hex_to: ss58ToHex(alice),
    hex_to_ss58_from: ss58ToHex(alice),
    hex_to_ss58_to: hexToSS58(ss58ToHex(alice)),
  });

  const convertSS58ToHex = (ss58: string): void => {
    const hex = isValidSS58(ss58) ? ss58ToHex(ss58) : "";

    console.log(
      hex === "" ? `Invalid ss58: ${ss58}` : `Converted ss58 to hex: ${hex}`
    );

    setState({
      ...state(),
      ...{ ss58_to_hex_from: ss58, ss58_to_hex_to: hex },
    });
  };

  const convertHexToSS58 = (hex: string): void => {
    const ss58 = isValidHex(hex) ? hexToSS58(hex) : "";

    console.log(
      ss58 === "" ? `Invalid hex: ${hex}` : `Converted hex to ss58: ${ss58}`
    );

    setState({
      ...state(),
      ...{ hex_to_ss58_from: hex, hex_to_ss58_to: ss58 },
    });
  };

  return (
    <div>
      <h1>Astar Address Converter</h1>
      <h2>SS58(Native) to Hex(0x~)</h2>
      <p>From</p>
      <input
        type="text"
        onInput={(e) => {
          convertSS58ToHex(e.currentTarget.value);
        }}
        value={state().ss58_to_hex_from}
        size={70}
      />
      <p>To</p>
      <p>{state().ss58_to_hex_to}</p>
      <h2>Hex(0x~) to SS58(Native)</h2>
      <p>From</p>
      <input
        type="text"
        onInput={(e) => {
          convertHexToSS58(e.currentTarget.value);
        }}
        value={state().hex_to_ss58_from}
        size={70}
      />
      <p>To</p>
      <p>{state().hex_to_ss58_to}</p>
      <footer>
        <a href="https://github.com/sushiware">github.com/sushiware</a>
      </footer>
    </div>
  );
};

export default App;
