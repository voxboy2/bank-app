## Proffesional bank system

This is a professional banking system that enables users to receive money in their wallets. The system operates through a combination of database management, scheduled tasks, and business logic.

Key components of our banking system include:

- Users: Users can be identified using  their Ids, names, email addresses.

- Wallets: Users have wallets to receive payments. When they receieve payments it is credited to their wallets. These wallets store the user's balance. 

- Transactions : Users can initiate multiple transactions, allowing them to receive money within the system.

- Emails: Every user must have verify their emails. 

- Cron Jobs: A cron job is used to automate the referral system's operations. The cron jobs periodically check for qualified users and process rewards.

### Here's how the system works:

- The index.html file contains the code that is used to call the paystack checkout API. 

The technology stack  used include NestJS, TypeORM, and Mysql for efficient management of user data, referrals, and wallets. I also used scheduled tasks provided by the NestJS Schedule library to automate the process.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Efe Stephen Ebieroma](https://www.linkedin.com/in/efe-ebieroma-800512150/)

