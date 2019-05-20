import {Component, OnInit} from '@angular/core';
import {Issue} from '../model/issue.model';
import {AppService} from '../app.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  public issues: Issue[];
  private url = 'http://localhost:8085/spring-security-oauth-resource/issues';
  addForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private service: AppService, private fb: FormBuilder) {
  }

  getIssues() {
    this.service.getAllResources(this.url)
      .subscribe(
        data => this.issues = data,
        error => console.log(error)
      );
  }

  createIssue(name, description) {
    this.service.createResource(this.url, new Issue(description, name))
      .subscribe(
        data => this.issues.push(data),
        error => alert(error));
  }

  ngOnInit(): void {
    this.getIssues();
  }

}
