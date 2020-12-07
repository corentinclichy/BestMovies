"use strict";

/// API INFORMATION
var API_KEY = "7075fe0e90af85d27887ececc303ff63";
var BASE_URL_DISCOVER = "https://api.themoviedb.org/3/discover/movie";
var BASE_URL_DETAILS = "https://api.themoviedb.org/3/movie";

getMovies = function getMovies(sortParam) {
  var topMovies = fetch("".concat(BASE_URL_DISCOVER, "?api_key=").concat(API_KEY, "&language=fr-FR&sort_by=").concat(sortParam, "&include_adult=true&include_video=false&primary_release_year=2020&vote_count.gte=1000"));
  return topMovies.then(function (res) {
    return res.json();
  })["catch"](function (err) {
    console.log(err);
  });
};

searchMovies = function searchMovies(sortParam) {
  var clearList = document.getElementById("movie-list");
  clearList.innerHTML = "";
  getMovies(sortParam).then(function (movies) {
    showMovies(movies);
  })["catch"](function (err) {
    console.log(err);
  });
};

getDetails = function getDetails(id) {
  var details_url = fetch("".concat(BASE_URL_DETAILS, "/").concat(id, "?api_key=").concat(API_KEY, "&language=fr-FR"));
  return details_url.then(function (res) {
    return res.json();
  })["catch"](function (err) {
    console.log(err);
  });
};

console.log(getDetails(583083).then(function (res) {
  return res;
}));
var budgetDetails;

showMovies = function showMovies(moviesList) {
  moviesList.results.slice(0, 10).map(function (movie) {
    var budget = getDetails(movie.id).then(function (res) {
      budgetDetails = res.budget;
      console.log(budgetDetails);
      return res.budget;
    });
    var div = document.createElement("div");
    div.className = "movie-card card m-2";
    div.id = "movie-card";
    div.style.width = "22em";
    div.innerHTML = "<img\n        class=\"card-img-top\"\n        src=\"https://image.tmdb.org/t/p/w500/".concat(movie.poster_path, "\"\n        alt=\"\"\n    />\n    <div class=\"card-body\">\n        <h4 class=\"card-title\">").concat(movie.title, "</h4>\n    </div>\n    <ul class=\"list-group list-group-flush\">\n        <li class=\"list-group-item d-flex align-items-center\">\n            <p class=\"pr-2 mb-0 font-weight-bold\">Release date</p>\n            <p class=\"mb-0\">").concat(movie.release_date, "</p>\n        </li>\n        <li class=\"list-group-item d-flex align-items-center\">\n            <p class=\"pr-2 mb-0 font-weight-bold\">Note</p>\n            <p class=\"mb-0\">").concat(movie.vote_average, "</p>\n        </li>\n        <li class=\"list-group-item d-flex align-items-center\">\n            <p class=\"pr-2 mb-0 font-weight-bold\">Budget</p>\n            <p class=\"mb-0\">").concat(budgetDetails, "</p>\n        </li>\n    </ul>");
    document.getElementById("movie-list").appendChild(div);
  });
};