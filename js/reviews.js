/* =========================================================================
   Testimonials. To add / edit a review, just edit this list — each entry is
   { name, meta, stars (1-5), text }. The marquee updates automatically.
   ========================================================================= */
(function () {
  /* Real Google reviews. Longest entries are lightly trimmed for the cards;
     full versions live on the Google Business Profile. */
  var REVIEWS = [
    { name: "Aarti Agarwal", meta: "Wedding · Google Review", stars: 5,
      text: "Their work is not just photography, it's pure art — cinematic, elegant and full of life. Choosing this team was the best decision we made." },
    { name: "Mayank Agarwal", meta: "Wedding · Google Review", stars: 5,
      text: "Whenever I look at the photos and videos, the entire day comes back to life. Pure cinematic vibes — they captured emotions, not just moments." },
    { name: "Yadvendra “Ravi” Sharma", meta: "Wedding · Jaipur", stars: 5,
      text: "Truly the best wedding photographer in Jaipur — every moment captured beautifully. Professional, friendly and incredibly talented." },
    { name: "Sunil Singh Ramawat", meta: "Wedding · Google Review", stars: 5,
      text: "Professional, friendly staff and awesome picture quality. Everyone at my wedding loved them — and the editing was fantastic. Highly recommended." },
    { name: "Nisha Sharma", meta: "Wedding · Google Review", stars: 5,
      text: "They put their heart and soul into making our wedding special. Very professional and experienced — highly recommended." },
    { name: "Tanmay Gautam", meta: "Google Review · Local Guide", stars: 5,
      text: "Wonderful, friendly team — especially Anurag bhaiya. Traditional, cinematic and candid, all brilliant. Highly recommend." },
    { name: "Chirag Kaushik", meta: "Google Review · Local Guide", stars: 5,
      text: "Easily the best experience with a photographer to date. Personable, talented, and they made everyone feel completely at ease." },
    { name: "Anil Vashist", meta: "Pre-Wedding · Google Review", stars: 5,
      text: "One of the best pre-wedding photographers and film-makers. Awesome work and a very professional team." }
  ];

  var track = document.getElementById("review-track");
  if (!track) return;

  function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function initials(name) {
    return name.replace(/&/g, " ").trim().split(/\s+/).slice(0, 2)
               .map(function (w) { return w[0]; }).join("").toUpperCase();
  }
  function card(r) {
    var el = document.createElement("article");
    el.className = "review-card";
    el.innerHTML =
      '<div class="review-stars">' + stars(r.stars) + '</div>' +
      '<p>' + r.text + '</p>' +
      '<div class="review-who"><span class="av">' + initials(r.name) + '</span>' +
      '<div><div class="nm">' + r.name + '</div><div class="mt">' + r.meta + '</div></div></div>';
    return el;
  }

  /* duplicate the set so the marquee loops seamlessly */
  REVIEWS.concat(REVIEWS).forEach(function (r) { track.appendChild(card(r)); });
})();
