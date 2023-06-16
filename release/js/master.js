const zeroPad = (num, places) => String(num).padStart(places, '0')

document.querySelector('.more-button').addEventListener('click', scrollToMore);

function scrollToMore(e)
{
  e.preventDefault();
  let st = document.querySelector('section#info').getBoundingClientRect().top;
  $('html, body').animate({
    scrollTop: st
  }, 800)
}

function render()
{
  let now = new Date();
  let estimated = Date.parse('20 jun 2023');
  let difference = new Date(estimated - now);
  let d = difference.getDate();
  let h = difference.getHours();
  let m = difference.getMinutes();
  let s = difference.getSeconds();
  let ms = difference.getMilliseconds();

  let daysData = getStepData(d, 31); 
  document.querySelector('#dd-value').textContent = daysData.string;
  document.getElementById('d-circle').style.strokeDashoffset = (697.5 * (daysData.percent / 100))

  let hoursData = getStepData(h, 24);
  document.querySelector('#hh-value').textContent = hoursData.string;
  document.getElementById('h-circle').style.strokeDashoffset = (697.5 * (hoursData.percent / 100))

  let minutesData = getStepData(m, 60);
  document.querySelector('#mm-value').textContent = minutesData.string;
  document.getElementById('m-circle').style.strokeDashoffset = (697.5 * (minutesData.percent / 100))

  let secondsData = getStepData(s, 60);
  document.querySelector('#ss-value').textContent = secondsData.string;
  document.getElementById('s-circle').style.strokeDashoffset = (697.5 * (secondsData.percent / 100))
  
  requestAnimationFrame(render)
}

function getStepData(value, max, multiplier)
{
  return {
    percent: value / max * 100,
    string: zeroPad(value.toString(), 2)
  }
}

function smooth_scroll_to(element, target, duration) {
  target = Math.round(target);
  duration = Math.round(duration);
  if (duration < 0) {
      return Promise.reject("bad duration");
  }
  if (duration === 0) {
      element.scrollTop = target;
      return Promise.resolve();
  }

  var start_time = Date.now();
  var end_time = start_time + duration;

  var start_top = element.scrollTop;
  var distance = target - start_top;

  var smooth_step = function(start, end, point) {
      if(point <= start) { return 0; }
      if(point >= end) { return 1; }
      var x = (point - start) / (end - start); // interpolation
      return x*x*(3 - 2*x);
  }

  return new Promise(function(resolve, reject) {

      var previous_top = element.scrollTop;

      var scroll_frame = function() {
          if(element.scrollTop != previous_top) {
              reject("interrupted");
              return;
          }

          var now = Date.now();
          var point = smooth_step(start_time, end_time, now);
          var frameTop = Math.round(start_top + (distance * point));
          element.scrollTop = frameTop;

          if(now >= end_time) {
              resolve();
              return;
          }

          if(element.scrollTop === previous_top
              && element.scrollTop !== frameTop) {
              resolve();
              return;
          }
          previous_top = element.scrollTop;

          setTimeout(scroll_frame, 0);
      }

      setTimeout(scroll_frame, 0);
  });
}

render();