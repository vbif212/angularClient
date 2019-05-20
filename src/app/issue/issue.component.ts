import {Component, OnInit} from '@angular/core';
import {Issue} from '../model/issue.model';
import {AppService} from '../app.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Comment} from '../model/comment.model';
import {Status} from '../model/status.model';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  public issue: Issue;
  private url = 'http://localhost:8085/spring-security-oauth-resource/issues';
  private id;
  addCommentForm = this.fb.group({
    message: ['', Validators.required],
    status: ['ONGOING', Validators.required]
  });

  constructor(private service: AppService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  logout() {
    this.service.logout();
  }

  goBack() {
    this.location.back();
  }

  getIssue() {
    this.service.getResource(this.url + '/' + this.id)
      .subscribe(
        issue => this.issue = issue
      );
  }

  deleteIssue() {
    this.service.deleteResource(this.url + '/' + this.id).subscribe();
    this.goBack();
  }

  addComment(status: Status, message: string) {
    this.service.addComment(this.url + '/' + this.id + '/comments', new Comment(status, message))
      .subscribe(comment => {
        this.issue.comments.push(comment);
        this.issue.status = comment.status;
      });

  }

  ngOnInit(): void {
    this.getIssue();
  }

}
