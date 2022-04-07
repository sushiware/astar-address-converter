import { evmToAddress, isEthereumAddress } from "@polkadot/util-crypto";

export const SAMPLE_EVM_ADDRESS = "0x84dE0ea110D75f7A8d205eD8868c36a0Aad3E30e";

const astarPrefix = 5;

export const ethreumAddressToAstarNetworkAddress = (address: string): string =>
  evmToAddress(address, astarPrefix);

export const isValidEthreumAddress = (address: string): boolean =>
  isEthereumAddress(address);
