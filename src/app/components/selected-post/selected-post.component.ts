import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.scss']
})
export class SelectedPostComponent implements OnInit {
  public selectedId: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.selectedId = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
