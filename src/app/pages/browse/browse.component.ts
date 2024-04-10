import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MovieService } from '../../shared/services/movie.service';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, forkJoin, pipe} from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {

  auth = inject(AuthService)
  movieService = inject(MovieService)
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  bannerDetail$ = new Observable<any>()
  bannerVideo$ = new Observable<any>()


  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upComingMovies: IVideoContent[] = [];
  

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getTopRatedMovies(),
    
  ]

  ngOnInit(): void {
    forkJoin(this.sources).pipe(
      map(([movies, tvShows, nowPlaying, topRated])=>{
        this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[15].id)
        this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[15].id)
        return {movies, tvShows, nowPlaying, topRated} 
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
    })
  }

  signOut(){
    sessionStorage.removeItem("loggedInUser")
    this.auth.signOut()
  }
}
