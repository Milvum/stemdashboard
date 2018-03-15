# [StemApp](https://milvum.github.io/stemapp/)

At the end of 2016 we started our journey with the goal: making digital voting possible for The Netherlands. In co-creation with five municipalities, we worked together to enable citizen participation on the blockchain. We believe this is a perfect step for making digital voting on the blockchain a reality. We have worked hard to realize the project and are pleased that a first version is now available for further development. That is why we are now doing an Open Source release of our StemApp project. We invite developers and security researchers to help The Netherlands in the next phase of digital voting. We be

Please mention [Milvum](https://milvum.com) in communications when using this code.

# StemDashboard

A simple web dashboard, used to display the casted votes. It obtains the candidate list through the npm module and requests the number of votes from ballot-dispenser.

## StemApp-stack dependencies
This project depends on the following StemApp projects:
* [candidates](https://github.com/Milvum/candidates) (npm module)
* [ballot-dispenser](https://github.com/Milvum/stemdashboard) (running server)

## Starting the website

* Configure the endpoint of the ballot-dispenser (currently hardcoded in `src/main/utils/Ethereum.ts`).
* Run `npm i`
* Run `npm start`

You'll be able to find the website on `localhost:8081` (unless configured otherwise).

## Disclaimer

The project in the current state is not market ready and thus should only be used for pilots or testing. In its current state the StemApp is not yet fully tested and not entirely secure (see open issues in the whitepaper). This version is also not yet ready for a release on the public Ethereum network. Milvum is not accountable for the use of the StemApp in any way, and the possible outcomes this may have.
