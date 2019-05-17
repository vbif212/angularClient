import {Component} from '@angular/core';
import {Issue} from '../model/issue.model';
import {AppService} from '../app.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {

  public currentIssue: Issue;
  private url = 'http://localhost:8085/spring-security-oauth-resource/issues';

  constructor(private service: AppService) {

  }



}
