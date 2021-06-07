(Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}),
  false;

const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

document.getElementById('rating_details').click();
const fiveStarRatingsElement = document.querySelectorAll('td[width="90"]')[0].textContent;
const oneStarRatingsElement = document.querySelectorAll('td[width="90"]')[4].textContent;

document.getElementsByClassName('close')[0].click();
const fiveStarRatingsPercentage = fiveStarRatingsElement.match(/\d*(?=%)/);
const fiveStarRatingsAbsolute = fiveStarRatingsElement.match(/(?!\()\d+(?=\))/);

const oneStarRatingsPercentage = oneStarRatingsElement.match(/\d*(?=%)/);
const oneStarRatingsAbsolute = oneStarRatingsElement.match(/(?!\()\d+(?=\))/);

const scorePercentage = fiveStarRatingsPercentage - oneStarRatingsPercentage;
const scoreAbsolute = fiveStarRatingsAbsolute - oneStarRatingsAbsolute;

const ScoreElement = document.createElement('h1');
ScoreElement.innerHTML = ` ${scorePercentage}% (${addCommas(String(scoreAbsolute))})`;

const Headline = document.getElementById('bookTitle');
ScoreElement.appendAfter(Headline);
