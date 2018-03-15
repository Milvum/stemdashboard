/* tslint:disable*/
/// <reference path="../../node_modules/immutable/dist/immutable.d.ts" />

type GUID = string;

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Environment = 'TEST' | 'ETEST' | 'ACCEPTANCE' | 'PRODUCTION';

interface IConfig {
  debug: boolean;
  url: string;
  port: number;
}

declare const APP_ENV: Environment;
declare const APP_CONFIG: IConfig;

interface IRecordState<S> extends Immutable.Map<string, any> {
  toObject(): S;
}

interface ISocketData {
  type: string;
  payload: any;
}

interface ITranslations {
  start: string;
  done: string;
  customersQueueName: string;
  waitingZero: string;
  waitingSingular: string;
  waitingPlural: string;
  signOut: string;
  idleQueueText: string;
  booth: string;
  bar: string;
  glasses: string;
}

interface ILocale {
  'nl_NL': ITranslations;
  'fr_FR': ITranslations;
}

declare interface Candidate {
  name: string,
  address: string,
  party: string,
  order: number,
  votes?: number,
}

type ABIType = 'function' | 'constructor' | 'fallback' | 'event';

declare interface ABIInput {
  name: string,
  type: string,
}

declare interface ABIDescription {
  type: ABIType,
  name?: string,
  inputs: ABIInput[],
  outputs?: ABIInput[],
  constant?: boolean,
  payable?: boolean
}

declare interface Network {
  events: any,
  links: any,
  address: string,
  updated_at: number,
}

declare interface ContractInfo {
  contract_name: string,
  abi: ABIDescription[],
  unlinked_binary: string,
  networks: Network[],
  schema_version: string,
  updated_at: number,
}
