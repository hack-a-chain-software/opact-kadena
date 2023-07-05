// import Pact from "pact-lang-api";
// import { ref, computed } from "vue";
// import { defineStore } from "pinia";

// export const useKadena = defineStore("kadena", () => {
//   /**
//    * time a tx lives in mempool since creationTime
//    */
//   const ttl = 28800;

//   const chainId = "0";
//   const networkId = "0";
//   const namespace = "free";
//   const contractName = "memory-wall";

//   const node = "us1.testnet.chainweb.com";

//   const gasStationName = "memory-wall-gas-station";
//   const host = `https://${node}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;

//   const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;

//   const contractAddress = computed(() => `${namespace}.${contractName}`);
//   const gasStationAddress = computed(() => `${namespace}.${gasStationName}`);
//   const explorerURL = computed(
//     () => `https://explorer.chainweb.com/${networkId.slice(0, -2)}`
//   );

//   /** BLOCKCHAIN TRANSACTIONS
//    * use pact-lang-api npm package to interact with Kadena blockchain networks https://github.com/kadena-io/pact-lang-api
//    * all transaction setup is ./kadena-config.js
//    * @param pactCode the pact code
//    * @returns tx result
//    */
//   const sendTx = async ({
//     sender,
//     pactCode,
//     gasLimit = 10000,
//     gasPrice = 0.00000000001,
//   }: {
//     pactCode: string;

//     /**
//      * high gas limit for tx
//      */
//     gasLimit: number;

//     /**
//      * gas price at lowest possible denomination
//      */
//     gasPrice: number;

//     /**
//      * nonce here doesnt matter since the tx will never have the same hash
//      */
//     nonce: string;

//     /**
//      * sender === gas payer of the transaction
//      * set to our gas station account defined in memory-wall-gas-station.pact
//      */
//     sender: string;
//   }) => {
//     /**
//      * calling get-all() function from smart contract
//      */
//     const res = await Pact.fetch.local(
//       {
//         pactCode,

//         /**
//          * pact-lang-api function to construct transaction meta data
//          */
//         meta: Pact.lang.mkMeta(
//           sender,
//           chainId,
//           gasPrice,
//           gasLimit,
//           creationTime(),
//           ttl
//         ),
//       },
//       host
//     );

//     return res.result.data;
//   };

//   // const getMemories = async () => {
//   //   const all = await sendTx(`(${kadenaAPI.contractAddress}.get-all)`);

//   //   all.sort((a: any, b: any) => a["block-height"].int - b["block-height"].int);

//   //   return all;
//   // };

//   return { sendTx };
// });
