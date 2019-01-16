"use strict";

const cards = document.querySelectorAll('.card');
const thumbnails = document.querySelectorAll('.thumbnail');
const titles = document.querySelectorAll('.title');
const infos = document.querySelectorAll('.info');
const texts = document.querySelectorAll('.self-text');
const links = document.querySelectorAll('.nav-item');
const facebook = document.querySelector('#social-link1');
const instagram = document.querySelector('#social-link2');

/**************************** 
FUNCTIONS
****************************/

const populateInfo = (index, thumbnail, title, info, text) => {
  thumbnails[index].src = thumbnail;
  titles[index].innerHTML = title;
  infos[index].innerHTML = info;
  texts[index].innerHTML = text;
}

/**************************** 
XHR REQUEST HANDLER
****************************/

const requestHandler = function () {
  let response = JSON.parse(this.responseText);
  let posts = response.data.children;
  for (let i = 0; i < 25; i++) {
    let thumbnail = "";
    let selfText = "";
    let info = `by ${posts[i].data.author} &bull; ${moment.unix(posts[i].data.created_utc).fromNow()} &bull; ${posts[i].data.ups} upvotes`;

    if (posts[i].data.thumbnail) {
      if (posts[i].data.thumbnail.slice(0, 4) !== "http") {
        thumbnail = "/assets/No_Image_Available.jpg";
      } else {
        thumbnail = posts[i].data.thumbnail;
      }
    }


    if (posts[i].data.selftext) {
      selfText = posts[i].data.selftext;
    } else {
      selfText = "No subtext available..."
    }


    populateInfo(i, thumbnail, posts[i].data.title, info, selfText);
  }
};

/**************************** 
XHR
****************************/

let url = 'https://www.reddit.com/r/oahu/.json';

const subreddits = [
  'https://www.reddit.com/r/blunderyears/.json',
  'https://www.reddit.com/r/Aww/.json',
  'https://www.reddit.com/r/Tinder/.json',
  'https://www.reddit.com/r/BikiniBottomTwitter/.json',
  'https://www.reddit.com/r/52weeksofcooking/.json',
  'https://www.reddit.com/r/100YearsAgo/.json',
  'https://www.reddit.com/r/nonononoYES/.json',
  'https://www.reddit.com/r/FanTheories/.json',
  'https://www.reddit.com/r/NetflixBestOf/.json',
  'https://www.reddit.com/r/gameofthrones/.json'
];

const queryAPI = () => {
  const request = new XMLHttpRequest();

  request.addEventListener('load', requestHandler);
  request.open('GET', url);
  request.send();
};

queryAPI();

/****************************
EVENT LISTENERS
****************************/

links.forEach(link => {
  link.addEventListener('click', () => {
    if (link.dataset.url === "RANDOM") {
      url = subreddits[Math.floor(Math.random() * subreddits.length)];
      queryAPI();
    } else {
      url = link.dataset.url;
      queryAPI();
    }
  });
});

cards.forEach(card => {
  card.addEventListener('click', () => {
    let newUrl = url.slice(0, url.length - 5);
    window.open(newUrl);
  });
});

facebook.addEventListener('click', () => {
  window.open('https://www.facebook.com/reddit');
});

instagram.addEventListener('click', () => {
  window.open('https://www.instagram.com/reddit/');
});
