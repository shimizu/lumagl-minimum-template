/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
//ビデオの初期化
!function videoInit() {
  const videos = document.querySelectorAll("video");
  videos.crossOrigin = "anonymous"; //ユーザー資格情報を送信

  videos.preload = "auto"; // 自動で動画データの読み込みを行う

  videos.muted = true; //音声をミュートに

  videos.loop = true; //ループ再生を有効化

  videos.autoplay = true; //自動再生を有効化

  videos.forEach(function (video) {
    video.addEventListener("play", function () {
      video.pause();
      video.currentTime = 0;
    });
  });
}(); //videoを指定された秒数まで再生する

const createVideoTween = function () {
  let d3t = null;
  return function (video, targetTime, duration) {
    if (d3t) d3t.stop();
    const currentTime = video.currentTime;
    const scale = d3.scaleLinear().domain([0, duration]).range([0, 1]).clamp(true);
    const interpolateLat = d3.interpolate(currentTime, targetTime);
    d3t = d3.interval(function (e) {
      var i = interpolateLat(scale(e));
      video.currentTime = i;

      if (e > duration) {
        d3t.stop();
        tweened = false;
      }
    }, 1000 / 25);
  };
}; //画像のスクロールテリング


const section1Callback = function (entries) {
  // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const old = d3.select("#photo1").select("span.background");
      d3.select("#photo1").insert("span", "span.background").attr("class", "background new").style("background-image", "url(" + entry.target.dataset.img + ")");
      old.transition().duration(750).style("opacity", 0).remove();
    }
  });
};

const section2Callback = function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //console.log("fire video", entry.target)
      const video = document.querySelector("#video1");
      const time = +entry.target.dataset.time;
      const videoTween = createVideoTween();
      videoTween(video, time, 1000);
    }
  });
}; //スクロール監視オブザーバーを設定する


const setObserver = function (id, callback) {
  const root = document.querySelector(id);
  const elements = root.querySelectorAll(".sc-anker"); //ビューポートの中心を判断基準とするオブザーバー  

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "-50% 20px",
    threshold: 0
  }); // それぞれのboxを監視する

  elements.forEach(elm => {
    observer.observe(elm);
  });
};

setObserver("#section1", section1Callback);
setObserver("#section2", section2Callback);
/******/ })()
;
//# sourceMappingURL=bundle.js.map