(() => {
  const addCommas = (x) => x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const getScoreData = () => {
    const fiveStarRatings = parseInt(
      document.querySelector('[data-testid="labelTotal-5"]')
        .textContent.match(/^[^\(]+/)[0]
        .replace(/,|\s/g, ''),
      10
    );
    const oneStarRatings = parseInt(
      document.querySelector('[data-testid="labelTotal-1"]')
        .textContent.match(/^[^\(]+/)[0]
        .replace(/,|\s/g, ''),
      10
    );
    const totalRatings = parseInt(
      document.querySelector('[data-testid="ratingsCount"]')
        .textContent.match(/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?(?=\s+ratings)/)[0]
        .replace(/,/g, ''),
      10
    );

    const scoreAbsolute = fiveStarRatings - oneStarRatings;
    const ratio = scoreAbsolute / totalRatings;
    const score = Math.round(scoreAbsolute * ratio);

    return { score, ratio };
  };

  const appendScore = (bookTitle) => {
    const { score, ratio } = getScoreData();
    const scoreElement = document.createElement('h1');
    scoreElement.textContent = `${addCommas(String(score))} (${Math.round(ratio * 100)}%)`;
    bookTitle.parentNode.insertBefore(scoreElement, bookTitle.nextSibling);
  };

  const init = () => {
    const bookTitle = document.querySelector('[data-testid="bookTitle"]');
    const labelTotal5 = document.querySelector('[data-testid="labelTotal-5"]');

    if (bookTitle && labelTotal5) {
      appendScore(bookTitle);
      return;
    }

    const observer = new MutationObserver(() => {
      const bookTitle = document.querySelector('[data-testid="bookTitle"]');
      const labelTotal5 = document.querySelector('[data-testid="labelTotal-5"]');

      if (bookTitle && labelTotal5) {
        appendScore(bookTitle);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  init();
})();
