import { Belt } from '../utils/Belt';

export const MessageType = Belt.strEnum([
  'LST_LOCATIONS',
  'LST_FEATURES',
  'LST_ADVISORS',
  'LST_QUEUES',
  'LST_CUSTOMERS',
  'MSG_CONNECT_WATCH',
  'MSG_REGISTER_WATCH',
  'MSG_SIGNIN_WATCH',
  'MSG_SELECT_QUEUE',
  'MSG_SIGNOFF_WATCH',
  'MSG_CUSTOMER_ACCEPT',
  'MSG_CUSTOMER_HELPED',
  'MSG_PING',
  'UPD_ADVISOR_DEL',
  'UPD_ADVISOR',
  'UPD_CUSTOMER',
  'UPD_CUSTOMER_DEL',
  'REQ_ADVISOR',
  'REQ_TIME',
  'SET_QUEUE',
  'ERR_CUSTOMERNOTFOUND',
  'ERR_NOEXTRATIME',
  'ERR_CUSTOMERACCEPTED',
]);

export type MessageType = keyof typeof MessageType;