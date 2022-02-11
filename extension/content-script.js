(Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}),
  false;

const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const appendScore = (itemToAppendTo, scoreAbsolute, ratio) => {
  const calculatedScore = Math.round(scoreAbsolute * ratio);

  const ScoreElement = document.createElement('h1');
  ScoreElement.innerHTML = ` ${Math.round(ratio * 100)}% (${addCommas(String(calculatedScore))})`;

  ScoreElement.appendAfter(itemToAppendTo);
};

if (document.getElementById('rating_details')) {
  document.getElementById('rating_details').click();
  const fiveStarRatingsElement = document.querySelectorAll('td[width="90"]')[0].textContent;
  const oneStarRatingsElement = document.querySelectorAll('td[width="90"]')[4].textContent;

  document.getElementsByClassName('close')[0].click();
  const fiveStarRatingsPercentage = fiveStarRatingsElement.match(/\d*(?=%)/);
  const fiveStarRatingsAbsolute = fiveStarRatingsElement.match(/(?!\()\d+(?=\))/);

  const oneStarRatingsPercentage = oneStarRatingsElement.match(/\d*(?=%)/);
  const oneStarRatingsAbsolute = oneStarRatingsElement.match(/(?!\()\d+(?=\))/);

  const ratio = (fiveStarRatingsPercentage - oneStarRatingsPercentage) / 100;
  const scoreAbsolute = fiveStarRatingsAbsolute - oneStarRatingsAbsolute;

  appendScore((Headline = document.getElementById('bookTitle')), scoreAbsolute, ratio);
} else {
  const fiveStarRatings = document
    .querySelectorAll('div.RatingsHistogram__labelTotal')[0]
    .textContent.match(/^[^\(]+/g)[0]
    .replace(/,|\s/g, '');
  const oneStarRatings = document
    .querySelectorAll('div.RatingsHistogram__labelTotal')[4]
    .textContent.match(/^[^\(]+/g)[0]
    .replace(/,|\s/g, '');

  const ratingsElement = document.querySelector(
    '.RatingStatistics__meta > [data-testid="ratingsCount"]'
  ).textContent;

  const ratingsCount = ratingsElement.match(/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?(?=\s+ratings)/g)?.[0];
  const totalRatings = parseFloat(ratingsCount.replace(/,/g, ''));

  const scoreAbsolute = fiveStarRatings - oneStarRatings;

  const ratio = scoreAbsolute / totalRatings;

  appendScore(document.getElementsByClassName('Text Text__title1')?.[0], scoreAbsolute, ratio);
}
