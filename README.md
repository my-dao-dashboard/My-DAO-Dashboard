# My-DAO-Dashboard

[![Build Status](https://travis-ci.org/wslyvh/My-DAO-Dashboard.svg?branch=master)](https://travis-ci.org/wslyvh/My-DAO-Dashboard)

## Introduction

You will soon be in a position where you are a voting member of more DAOs than you can possible manage.

* Aragon 
* Moloch DAO 
* Metacartel
* MakerDAO (soon)
* Genesis DAO (soon)
* dxDAO (soon)
* and many more..

Also, things will soon get totally out of hand with the option to create new DAOs with Aragon or Colony or...

You will have a different stake in each DAO, different contracts, and there will come responsibilities that you must undertake as part of your involvement in each DAO (like votes).

It's going to get really messy really quickly.

## Idea description

My DAO Dashboard is a user-centric dashboard where you can manage all DAO's that you're participating in, based on your own Ethereum address.

## Online demo

* [Online demo](https://my-dao-dashboard.herokuapp.com/)

The demo requires a web3 browser (with unlocked Metamask) account. This works both in browser, as well as via mobile.
In order to use the dashboard the account that you're logged in with, needs to be a member of a DAO (Aragon, Moloch or Metacartel).

* [Create or join a DAO](https://mainnet.aragon.org/)

For demo-purposes you can add one of the following account via the settings page: 
* `0x59a5493513ba2378ed57ae5ecfb8a027e9d80365` // Moloch DAO member
* `0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88` // Moloch DAO -and- Metacartel member
* `0xd6e371526cdaee04cd8af225d42e37bc14688d9e` // Metacartel member

Adding this acts as if you're logged-in as one of those address and populates the dashboard with data.

## Bounty integrations 

* [The Graph - Build Or Use A Subgraph](https://github.com/ethberlinzwei/Bounties/issues/11)
We're using the subgraphs to query the MolochDAO-based DAO's (Moloch DAO, Metacartel)
* [3Box - Best Use of Storage Spaces](https://github.com/ethberlinzwei/Bounties/issues/3)
We're using 3Box storage space to add additional accounts for those concerned about Privacy. You can login with your 3Box profile and add additional addresses that you want to see in your dashboard.
* [3Box - Best Overall 3Box Integration](https://github.com/ethberlinzwei/Bounties/issues/1)
See above.