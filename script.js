/// API INFORMATION
const API_KEY = "7075fe0e90af85d27887ececc303ff63";
const BASE_URL_DISCOVER = "https://api.themoviedb.org/3/discover/movie";
const BASE_URL_DETAILS = "https://api.themoviedb.org/3/movie";

getMovies = (sortParam) => {
  let topMovies = fetch(
    `${BASE_URL_DISCOVER}?api_key=${API_KEY}&language=fr-FR&sort_by=${sortParam}&include_adult=true&include_video=false&primary_release_year=2020&vote_count.gte=1000`
  );
  return topMovies
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
searchMovies = (sortParam) => {
  let clearList = document.getElementById("movie-list");
  clearList.innerHTML = "";
  getMovies(sortParam)
    .then((movies) => {
      showMovies(movies);
    })
    .catch((err) => {
      console.log(err);
    });
};
getDetails = (id) => {
  let details_url = fetch(
    `${BASE_URL_DETAILS}/${id}?api_key=${API_KEY}&language=fr-FR`
  );
  return details_url
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

getMargin = (id) => {
  getDetail(id).then((res) => {
    let margin = res.revenue - res.budget;

    return margin;
  });
};

budgetDetails = "";
showMovies = (moviesList) => {
  moviesList.results.slice(0, 10).forEach((movie) => {
    getDetails(movie.id).then((res) => {
      let margin = res.revenue - res.budget;
      console.log(res.title);
      console.log(res.revenue);
      console.log(res.budget);
      let div = document.createElement("div");
      div.className = "movie-card card m-2";
      div.id = "movie-card";
      div.style.width = "22em";
      div.innerHTML = `<img
        class="card-img-top"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt=""
    />
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex align-items-center">
            <p class="pr-2 mb-0 font-weight-bold">Release date</p>
            <p class="mb-0">${movie.release_date}</p>
        </li>
        <li class="list-group-item d-flex align-items-center">
            <p class="pr-2 mb-0 font-weight-bold">Note</p>
            <p class="mb-0">${movie.vote_average}</p>
        </li>
        
        <li class="list-group-item d-flex align-items-center">
            <p class="pr-2 mb-0 font-weight-bold">Gross margin</p>
            <p class="mb-0">${margin === 0 ? "" : margin}</p>
        </li>
    </ul>`;
      document.getElementById("movie-list").appendChild(div);
      // console.log(budgetDetails);
      // return res.budget;
    });
  });
};
