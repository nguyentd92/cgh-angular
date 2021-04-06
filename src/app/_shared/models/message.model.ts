export enum MessageType {
  Error,
  Success
}

export interface Message {
  type: MessageType
  content: string;
}
