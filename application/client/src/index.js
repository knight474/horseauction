import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import AuctionStoreArtifact from "./truffle-build/HorseAuction.json";

/* global window */
 
import Web3 from 'web3'
 
const fallback = 'wss://mainnet.infura.io/ws'
 
function resolveWeb3(resolve, reject){
 
  // Modern dapp browsers...
  if (window.ethereum) {
      console.log('web3, using ethereum provider')
     
      window.web3 = new Web3(window.ethereum);
 
      window.ethereum
        .enable()
        .then( _ => {
          resolve(window.web3)
        })
        .catch( err => {
          console.warn('access denied by user', err)
          reject()
        })
       
  }
 
  // Legacy dapp browsers...
  else if (window.web3) {
    console.log('web3, using legacy provider')
   
    window.web3 = new Web3(window.web3.currentProvider);
   
    resolve(window.web3)
  }
 
  // fallback provider
  else if (typeof window.web3 === undefined) {
    console.log('web3, using fallback provider')
   
    window.web3 = new Web3(fallback);
    window.metamask = false;
   
    resolve(window.web3)
  }
 
  // Non-dapp browsers...
  else {
    console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!');
   
    reject()
  }
 
}
 
 
export function web3resolver(){
  return new Promise((resolve, reject) => {
   
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => resolveWeb3(resolve, reject) )
   
    // resolve immediatly
    if (document.readyState === `complete`) resolveWeb3(resolve, reject)
  })
}




web3resolver().then(function() {
    const AuctionStore = {
        contractName: AuctionStoreArtifact.contractName,
        web3Contract: new window.web3.eth.Contract(AuctionStoreArtifact.abi, "0x55Ecded9928C3B2f0e750B4292D81b3b5988Ccd0")
    }
    
    // let drizzle know what contracts we want
    const options = { contracts: [AuctionStore], events: {AuctionStore:["NewBundle","NewBid","AuctionEnded"]} };
            
    // Drizzle Store
    //
    const drizzleStore = generateStore(options);
    const drizzle = new Drizzle(options, drizzleStore);
    ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.register();
})


