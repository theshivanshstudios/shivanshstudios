/* =========================================================================
   Shivansh Studios — site behaviour
   nav · hero slideshow · scroll reveals · stat counters ·
   contact compose (WhatsApp / email) · portfolio galleries + lightbox
   ========================================================================= */
(function () {
  "use strict";

  /* ---- contact constants (edit these in ONE place) ------------------- */
  var WHATSAPP = "917015154812";                       // no +, no spaces
  var EMAIL    = "shivanshstudios2021@gmail.com";

  /* ---- sticky nav + mobile menu -------------------------------------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---- hero crossfade slideshow -------------------------------------- */
  var slidesHost = document.querySelector(".hero-slides");
  if (slidesHost && window.HERO_IMAGES && window.HERO_IMAGES.length) {
    window.HERO_IMAGES.forEach(function (src, i) {
      var s = document.createElement("div");
      s.className = "hero-slide" + (i === 0 ? " active" : "");
      s.style.backgroundImage = "url('" + src + "')";
      slidesHost.appendChild(s);
    });
    var slides = slidesHost.querySelectorAll(".hero-slide");
    if (slides.length > 1) {
      var cur = 0;
      setInterval(function () {
        slides[cur].classList.remove("active");
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add("active");
      }, 5500);
    }
  }

  /* ---- scroll reveal -------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- animated stat counters ---------------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = +el.getAttribute("data-count"),
            suffix = el.getAttribute("data-suffix") || "", t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1600, 1);
          el.textContent = Math.floor(p * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- contact form -> WhatsApp / email ------------------------------ */
  var form = document.getElementById("inquiry-form");
  if (form) {
    var gather = function () {
      var g = function (n) { var f = form.elements[n]; return f ? f.value.trim() : ""; };
      return {
        name: g("name"), email: g("email"), phone: g("phone"),
        type: g("eventType"), date: g("eventDate"), msg: g("message")
      };
    };
    var compose = function (d) {
      return (
        "New enquiry from the website%0A%0A" +
        "Name: " + encodeURIComponent(d.name) + "%0A" +
        "Email: " + encodeURIComponent(d.email) + "%0A" +
        "Phone: " + encodeURIComponent(d.phone) + "%0A" +
        "Event: " + encodeURIComponent(d.type) + "%0A" +
        "Date: " + encodeURIComponent(d.date) + "%0A" +
        "Message: " + encodeURIComponent(d.msg)
      );
    };
    var valid = function (d) {
      if (!d.name || !d.phone) {
        alert("Please share at least your name and phone number so we can reach you.");
        return false;
      }
      return true;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = gather();
      if (!valid(d)) return;
      window.open("https://wa.me/" + WHATSAPP + "?text=" + compose(d), "_blank");
    });
    var emailBtn = document.getElementById("send-email");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        var d = gather();
        if (!valid(d)) return;
        var body = compose(d).replace(/%0A/g, "\n");
        try { body = decodeURIComponent(body); } catch (err) {}
        window.location.href = "mailto:" + EMAIL +
          "?subject=" + encodeURIComponent("Photography Enquiry — " + (d.name || "")) +
          "&body=" + encodeURIComponent(body);
      });
    }
  }

  /* ---- portfolio gallery + lightbox ---------------------------------- */
  var grid = document.getElementById("gallery-grid");
  if (grid && window.GALLERY) {
    var cat = grid.getAttribute("data-category");
    var data = window.GALLERY[cat];
    if (data) {
      var base = "../images/portfolio/" + cat + "/";
      data.images.forEach(function (file, i) {
        var fig = document.createElement("figure");
        fig.className = "ph";
        var img = document.createElement("img");
        img.loading = "lazy";
        img.src = base + "thumb/" + file;
        img.alt = data.label + " photography by Shivansh Studios, Jaipur — " + (i + 1);
        img.setAttribute("data-full", base + "full/" + file);
        fig.appendChild(img);
        fig.addEventListener("click", function () { openLightbox(i); });
        grid.appendChild(fig);
      });

      /* lightbox */
      var lb = document.getElementById("lightbox"),
          lbImg = lb.querySelector("img"),
          lbCount = lb.querySelector(".lb-count"),
          idx = 0, fulls = data.images.map(function (f) { return base + "full/" + f; });

      function show(i) {
        idx = (i + fulls.length) % fulls.length;
        lbImg.src = fulls[idx];
        lbCount.textContent = (idx + 1) + " / " + fulls.length;
      }
      function openLightbox(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
      function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }

      lb.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
      lb.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
      lb.querySelector(".lb-close").addEventListener("click", close);
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight") show(idx + 1);
        if (e.key === "ArrowLeft") show(idx - 1);
      });
    }
  }

  /* ---- footer year ---------------------------------------------------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
