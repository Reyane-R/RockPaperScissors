const { ligoSampleCode } = require("@ligo-js/core");
const { tezosNode } = require("@ligo-js/domains/tezos-node");
const { compileLigo } = ligoSampleCode.compileContract;
const { originateLigo } = ligoSampleCode.originateContract;
const { TezosToolkit } = require("@taquito/taquito");
const { InMemorySigner } = require("@taquito/signer");

const leaderboardContractCode = `
type leaderboard is map(nat, nat);

type storage is
  { leaderboard : leaderboard;
    totalGames : nat };

let%entry main (p : nat) (s : storage) : storage * list(operation) =
  let updatedLeaderboard = Map.literal
    [ (1n, Map.find_default 0n 1n s.leaderboard + p) ;
      (2n, Map.find_default 0n 2n s.leaderboard + 1n) ] in
  ( { s with leaderboard = updatedLeaderboard ; totalGames = s.totalGames + 1n },
    [] );
`;

async function deployContract() {
    const Tezos = new TezosToolkit("YOUR_RPC_ENDPOINT");
    const signer = await InMemorySigner.fromSecretKey("YOUR_PRIVATE_KEY");
    Tezos.setProvider({ signer });

    const compiledContract = compileLigo(leaderboardContractCode, tezosNode);
    const contractAddress = await originateLigo(compiledContract, Tezos);
    console.log("Contract deployed at:", contractAddress);
    return contractAddress;
}

deployContract().catch(console.error);
