import {Component} from '@angular/core';
import {Issue} from '../model/issue.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {

  public issue = new Issue('test', 'name');
  private url = 'http://localhost:8085/spring-security-oauth-resource/issues';

  constructor(private service: AppService) {
  }

  createIssue() {
    this.service.createResource(this.url, this.issue)
      .subscribe(
        data => this.issue = data,
        error => this.issue.name = 'Error');
  }

  getIssues() {
    this.service.getAllResources(this.url)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }
}
