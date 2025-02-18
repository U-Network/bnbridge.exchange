

drop table if exists eth_accounts;
create table eth_accounts (
  uuid char(36) primary key,
  private_key varchar(128),
  address varchar(64),
  encr_key varchar(128),
  created timestamp
);


drop table if exists bnb_accounts;
create table bnb_accounts (
  uuid char(36) primary key,
  public_key varchar(128),
  -- Inappropriate name, raw mnemonic of a bnb account encrypted by key `(KEY:dbPassword)`
  seed_phrase varchar(512),
  address varchar(64),
  key_name varchar(64),
  -- Inappropriate name, raw password used to operate with bnbcli encrypted by key `(KEY:dbPassword)`
  password varchar(128),
  -- dbPassword, a bip39 mnemonic
  encr_key varchar(128),
  created timestamp
);


drop table if exists tokens;
create table tokens (
  uuid char(36) primary key,
  name varchar(64),
  symbol varchar(10),
  unique_symbol varchar(32),
  total_supply varchar(64),
  erc20_address varchar(64),
  mintable boolean,
  minimum_swap_amount varchar(32),
  fee_per_swap varchar(32),
  eth_account_uuid char(36),
  bnb_account_uuid char(36),
  processed boolean,
  listing_proposed boolean,
  listing_proposal_uuid char(36),
  listed boolean,
  created timestamp
);


drop table if exists swaps;
create table swaps (
  uuid char(36) primary key,
  token_uuid char(36),
  client_account_uuid char(36),
  eth_address varchar(64),
  bnb_address varchar(64),
  amount varchar(32),
  deposit_transaction_hash varchar(128),
  transfer_transaction_hash varchar(128),
  processed boolean,
  created timestamp
);


drop table if exists list_proposals;
create table list_proposals (
  uuid char(36) primary key,
  token_uuid char(36),
  unique_symbol varchar(32),
  title varchar(128),
  description varchar(128),
  initial_price varchar(32),
  expiry_time bigint,
  voting_period bigint,
  submitted boolean,
  transaction_hash varchar(64),
  proposal_id bigint,
  processed boolean,
  voting_status varchar(32),
  created timestamp
);


drop table if exists client_accounts;
create table client_accounts (
  uuid char(36) primary key,
  bnb_address varchar(64),
  client_eth_account_uuid char(36),
  encr_key varchar(512),
  created timestamp
);


drop table if exists client_eth_accounts;
create table client_eth_accounts (
  uuid char(36) primary key,
  -- Inappropriate name, encrypted eth private key using `(KEY:dbPassword)` as encryption key
  private_key varchar(256),
  address varchar(64),
  -- dbPassword, a newly generated bip39 mnemonic for each created eth account
  encr_key varchar(128),
  created timestamp
);
