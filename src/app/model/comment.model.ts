import {Status} from './status.model';

export class Comment {
  id: number;
  timestamp: Date;
  status: Status;
  message: string;

  constructor(status?: Status, message?: string) {
    this.status = status;
    this.message = message;
  }
}
