import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/Post.model';
import { Subscription } from '../../../node_modules/rxjs';
import { PostsService } from '../posts.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
    this.postsService.emitPosts();
  }

  onNewPost(){
    this.router.navigate(['/posts/', 'new']);
  }

  onDeletePost(post: Post){
    this.postsService.removePost(post);
  }

  
  onLoveIt(index: number){
    this.postsService.loveIt(index);
  }

  onDontLoveIt(index: number){
    this.postsService.dontLoveIt(index);
  }

  getColor(index: number){
    if(this.posts[index].loveIts > 0){
      return 'green';
    }else if(this.posts[index].loveIts < 0){
      return 'red';
    }
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
