#!/bin/bash
#
# Remove unnecessary cruft from ABI files
#
# Uses JQ: https://stedolan.github.io/jq/
#
# https://ethereum.stackexchange.com/questions/83299/decreasing-the-size-of-abi-files
#
# https://stackoverflow.com/questions/48529016/remove-a-keyvalue-from-an-json-object-using-jq
#

set -e

for abi in build/contracts/*.json ; do
  echo "Shrinking $abi"

  # Truffle compile generates this data by default
  # These are only necessary when deploying the contract or verifying it on EtherScan
  # cat trick: https://stackoverflow.com/a/60744617/315168
  cat <<< $(jq 'delpaths([["ast"], ["metadata"], ["source"], ["legacyAST"], ["devdoc"]])' $abi) > $abi
done