(Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}),
  false;

const addCommas = (x) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const appendScore = (itemToAppendTo, score, ratio) => {
  const ScoreElement = document.createElement('h1');
  ScoreElement.innerHTML = `${addCommas(String(score))} (${Math.round(ratio * 100)}%)`;

  ScoreElement.appendAfter(itemToAppendTo);
};

const getScoreData = () => {
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

  const score = Math.round(scoreAbsolute * ratio);

  return { score, ratio };
};

const { score, ratio } = getScoreData();

appendScore(document.getElementsByClassName('Text Text__title1')?.[0], score, ratio);
