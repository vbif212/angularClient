import {Status} from './status.model';
import {Comment} from './comment.model';

export class Issue {
  id: number;
  timestamp: Date;
  status: Status;
  description: string;
  name: string;
  comments: Comment[];

  constructor(description?: string, name?: string) {
    this.description = description;
    this.name = name;
  }
}
