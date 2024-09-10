export interface Movie {
  id: number
  titel: string
  premiärår: number
  bildlänk: string
}

export interface MovieNoId {
  titel: string
  premiärår: number
  bildlänk: string
}

function generateId(): number {
  let max = 0
  movies.forEach((movie) => {
    if (movie.id > max) {
      max = movie.id
    }
  })
  return max + 1
}

export function addMovie(newMovie: MovieNoId): void {
  const movie: Movie = { ...newMovie, id: generateId() }
  movies.push(movie)
}

export function deleteMovie(id:number):void {
   movies = movies.filter(movie=> movie.id !== id)
}

export let movies: Movie[] = [
  {
    id: 1,
    titel: 'My Neighbor Totoro',
    premiärår: 1988,
    bildlänk:
    'https://www.imdb.com/title/tt0096283/mediaviewer/rm3112135425/?ref_=tt_ov_i',
  },
  
  {
    id: 2,
    titel: 'Spirited Away',
    premiärår: 2001,
    bildlänk:
    'https://www.imdb.com/title/tt0245429/mediaviewer/rm2176151040/?ref_=tt_ov_i',
  },
  
  {
    id: 3,
    titel: 'Princess Mononoke',
    premiärår: 1997,
    bildlänk:
    'https://www.imdb.com/title/tt0119698/mediaviewer/rm194816000/?ref_=tt_ov_i',
  },
  
  {
    id: 4,
    titel: "Howl's Moving Castle",
    premiärår: 2004,
    bildlänk:
    'https://www.imdb.com/title/tt0347149/mediaviewer/rm2760427520/?ref_=tt_ov_i',
  },
  
  {
    id: 5,
    titel: "Kiki's Delivery Service",
    premiärår: 1989,
    bildlänk:
    'https://www.imdb.com/title/tt0097814/mediaviewer/rm2268951552/?ref_=tt_ov_i',
  },
]

