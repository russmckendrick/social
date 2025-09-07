export interface Artist {
  name: string;
  biography: string;
  uri_artist: string;
}

export interface Images {
  hi_res: string;
  medium: string;
  avatar?: string;
}

export interface Record {
  release_name: string;
  release_artist: string;
  date_release_year: string;
  genre_names: string[];
  artists: Artist[];
  images_uri_release: Images;
  images_uri_artist: Images;
  uri_release: string;
  json_detailed_release: string;
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
}