## Getting Started

#### Prerequisites
* [Lightning Network Daemon (LND)](https://github.com/lightningnetwork/lnd)
* [Bitcoind](https://github.com/bitcoin/bitcoin)
* [Postgres](https://www.postgresql.org/download/)
* Environment variables:
```
export POSTGRES_URI="postgresql://[USERNAME]:[PASSWORD]@localhost/donut"
```

#### Setup
1. Start bitccoind
```
bitcoind --testnet --txindex --rpcuser=REPLACEME --rpcpass=REPLACEME
```
2. Once `bitcoind` is synced, start `lnd`:
```
lnd --bitcoin.active --bitcoin.testnet --debuglevel=debug --btcd.rpcuser=REPLACEME --btcd.rpcpass=REPLACEME --externalip=X.X.X.X
```
3. If you already have a `lnd` wallet, unlock it:
```
lncli --rpcserver=localhost:10009 unlock
```
If you do not yet have an `lnd` wallet, create one:
```
lncli --rpcserver=localhost:10009 create
```
4. Create a Postgres database called `donut` and create a user with the appropriate privileges
5. Save all the environment variables from above
6. Clone Block and Jerry's
```
cd ~
git clone https://github.com/BlockAndJerrys/blockandjerrys.git
cd blockandjerrys
```
7. Copy `tls.cert` from `~/Library/Application\ Support/Lnd/tls.cert` to `backend/utils/lightning/tls.cert`.
8. Install dependencies
```
yarn
```
9. Setup DB
```
yarn sync
```
10. Start the web app
```
yarn start
```
11. Start the server
Open a new terminal
```
cd ~/blockandjerrys
yarn testServer // For UI only
yarn server // For real server w/ LND and postgres
```

## Architecture
If you are interested in the architecture of this application, check it out [here](https://github.com/BlockAndJerrys/blockandjerrys/blob/master/ARCHITECTURE.md).

## v1 Testnet Release Media:
A how to [Medium](https://medium.com/@robdurst/so-you-want-to-buy-ice-cream-on-the-bitcoin-testnet-block-and-jerrys-eb66c8d1296e) article.

A demo on [Twitter](https://twitter.com/g_durst/status/960696142445998080).

## A Note to the Community
First of all, thanks for helping out! Block and Jerry's goal is to create a *Hands on Bitcoin* for the masses, introducing the average Joe to the incredible potential of the Lightning Network. This would not be possible without your help and support. 

#### Why Contribute?
Besides the above, we offer a few tangible incentives for contributing:
1. A Block and Jerry's sticker of your choice
2. A mention on the about us community contributors page
