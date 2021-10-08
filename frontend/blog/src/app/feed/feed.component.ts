import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  listPost: Post[];
  post: Post = new Post();
  nome: string;
  filterName: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data.filter(
        (post) =>
          this.filterName === '' ||
          post.nome.toLowerCase().includes(this.filterName.toLowerCase())
      );
    });
  }

  cadastrarMensagem(): void {
    this.postService.postMensagem(this.post).subscribe((data: Post) => {
      this.post = data;
      location.assign('/feed');
    });
  }

  filter(): void {
    this.findPosts();
  }
}
