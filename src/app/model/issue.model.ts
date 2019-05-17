export class IssueStatus {
  static ADDED = 'ADDED';
  static READY = 'READY';
  static ONGOING = 'ONGOING';
}

export class Issue {
  id: number;
  timestamp: Date;
  status: string;
  description: string;
  name: string;
  messages: string[];

  constructor(description?: string, name?: string) {
    this.description = description;
    this.name = name;
  }
}
