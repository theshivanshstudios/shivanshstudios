/* =========================================================================
   Testimonials. To add / edit a review, just edit this list — each entry is
   { name, meta, stars (1-5), text }. The marquee updates automatically.
   ========================================================================= */
(function () {
  var REVIEWS = [
    { name: "Priya & Aakash", meta: "Wedding · Jaipur", stars: 5,
      text: "Very satisfied with their schedule and behaviour — friendly and they understood exactly what we wanted. In love with their work." },
    { name: "Neha & Rohan", meta: "Pre-Wedding · Udaipur", stars: 5,
      text: "They delivered everything I had in mind and more. One of the finest photography teams in Jaipur — truly artistic." },
    { name: "Sanya & Vikram", meta: "Destination Wedding", stars: 5,
      text: "Professional from the first call to final delivery. Our album feels like a film we can hold. Absolutely worth it." },
    { name: "Ananya & Karthik", meta: "Wedding · Jaipur", stars: 5,
      text: "Every emotion of our big day was captured so beautifully. The team made us feel completely at ease throughout." },
    { name: "Megha & Arjun", meta: "Couple Portraits", stars: 5,
      text: "Timeless, elegant and so natural. We keep reliving the day every time we open our gallery. Highly recommended." },
    { name: "Ishita & Rahul", meta: "Pre-Wedding · Jaipur", stars: 5,
      text: "Creative direction, locations, editing — flawless. They turned a simple idea into something cinematic and unforgettable." },
    { name: "Pooja & Siddharth", meta: "Wedding · Rajasthan", stars: 5,
      text: "Reliable, punctual and incredibly talented. They captured moments we didn't even know happened. Thank you, team!" }
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
