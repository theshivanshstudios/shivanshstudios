/* =========================================================================
   Testimonials. To add / edit a review, just edit this list — each entry is
   { name, meta, stars (1-5), text }. The marquee updates automatically.
   ========================================================================= */
(function () {
  /* Real Google reviews. Longest entries are lightly trimmed for the cards;
     full versions live on the Google Business Profile. */
  var REVIEWS = [
    { name: "Aarti Agarwal", meta: "Wedding · Google Review", stars: 5,
      text: "Choosing this team for our wedding was honestly the best decision we made. Their work is not just photography, it's pure art — every smile, every emotion, every special moment captured so perfectly. The final photos and videos came out absolutely stunning: cinematic, elegant and full of life. Highly recommended!" },
    { name: "Mayank Agarwal", meta: "Wedding · Google Review", stars: 5,
      text: "Honestly, words fall short for their work. Every little moment was captured so perfectly that whenever I look at the photos and videos, the entire day comes back to life. Their creativity, camera angles and editing are next-level — pure cinematic vibes. They didn't just shoot, they captured emotions." },
    { name: "Yadvendra “Ravi” Sharma", meta: "Wedding · Jaipur", stars: 5,
      text: "Shivansh Studios is truly the best wedding photographer in Jaipur! They captured every special moment of our wedding beautifully. The team was professional, friendly and incredibly talented. If you're looking for the top wedding photographers in Jaipur, look no further!" },
    { name: "Sunil Singh Ramawat", meta: "Wedding · Google Review", stars: 5,
      text: "Professional and friendly staff and an amazing experience — the picture quality is awesome. Everyone at my wedding loved my photographers; they were relaxed, helpful and got amazing photos of everyone, plus a fantastic job with the editing. I recommend Shivansh Studios to everyone." },
    { name: "Nisha Sharma", meta: "Wedding · Google Review", stars: 5,
      text: "The team was amazing. They put their heart and soul into making our wedding amazingly special. The Shivansh Studios team is very professional and experienced — so highly recommended to everyone." },
    { name: "Tanmay Gautam", meta: "Google Review · Local Guide", stars: 5,
      text: "Shivansh Studios is perfect for photography sessions. All the staff are wonderful and friendly in nature, especially Anurag bhaiya. I recommend them to anyone searching for traditional, cinematic or candid photography." },
    { name: "Chirag Kaushik", meta: "Google Review · Local Guide", stars: 5,
      text: "Easily the best experience with a photographer to date! Super personable and very talented at their craft. They made sure everyone was comfortable and enjoying the experience. Thank you, Shivansh Studios." },
    { name: "Anil Vashist", meta: "Pre-Wedding · Google Review", stars: 5,
      text: "One of the best pre-wedding photographers and video makers. Awesome work and a very professional team." }
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
