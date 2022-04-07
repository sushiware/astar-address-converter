import {
  ethreumAddressToAstarNetworkAddress,
  isValidEthreumAddress,
  SAMPLE_EVM_ADDRESS,
} from "../src/converter";

import { suite } from "uvu";
import * as assert from "uvu/assert";

const test = suite("converter");

test("ethreumAddressToAstarNetworkAddress", () => {
  assert.is(
    ethreumAddressToAstarNetworkAddress(SAMPLE_EVM_ADDRESS),
    "YCYGncNAXbMGPxpz3oaTQTPTCj2ZHu6awsJ4bhaHtn6TZck"
  );
});

test("isValidEthreumAddress", () => {
  assert.ok(isValidEthreumAddress(SAMPLE_EVM_ADDRESS));
  assert.not.ok(isValidEthreumAddress("0x0000000000000000"));
});

test.run();
