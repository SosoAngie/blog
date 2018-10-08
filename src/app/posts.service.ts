import { Injectable } from '@angular/core';
import { Subject } from '../../node_modules/rxjs';
import { Post } from './models/Post.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts = [
    {
      title: 'Premier Post',
      content: 'BlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlou',
      createdAt: new Date(),
      loveIts: 0
    },
    {
      title: 'Second Post',
      content: 'BlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlou',
      createdAt: new Date(),
      loveIts: 0
            
    },
    {
      title: 'Troisième Post',
      content: 'BlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlouBlou',
      createdAt: new Date(),
      loveIts: 0
    }
  ];
  
  postsSubject = new Subject<Post[]>();

  constructor() { this.savePosts(); }

  emitPosts(){
    this.postsSubject.next(this.posts);
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts(){
      firebase.database().ref('/posts').on('value', (data) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  createNewPost(post: Post){
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post){
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post){
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  loveIt(index: number){
    this.posts[index].loveIts++;
  }

  dontLoveIt(index: number){
    this.posts[index].loveIts--;
  }

}
