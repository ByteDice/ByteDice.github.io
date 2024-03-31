console.log("animation script loaded")

let dir_x = new Map();
let dir_y = new Map();
let speed = new Map();
let anim_elems = Array.from(document.getElementsByClassName("float_div"));

function spawn_idiots() {
  for (let _ of Array(6).keys()) {
    let img = document.createElement('img');
    img.src = "/assets/idiot.gif";
    img.className = "float_div idiot";
    img.style.width = "20%";
    img.style.height = "auto";
    document.body.appendChild(img);
    console.log("idiots spawned");
  }

  let anim_idiots = Array.from(document.getElementsByClassName("idiot"));
  anim_elems = Array.from(document.getElementsByClassName("float_div"));

  for (let elem of anim_idiots) {
    let start_dir_x = Math.random() < 0.5 ? -1 : 1;
    let start_dir_y = Math.random() < 0.5 ? -1 : 1;
    let start_speed = Math.random() * 5 + 3;
    dir_x.set(elem, start_dir_x);
    dir_y.set(elem, start_dir_y);
    speed.set(elem, start_speed);

    elem.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    elem.style.top = Math.floor(Math.random() * window.innerHeight) + "px";

    elem.setAttribute('draggable', false);
    console.log("idiots configged");
  }
}



window.addEventListener('load', function() {
  function animate(elem, dir_x, dir_y, speed) {
    let rect = elem.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;
    let height = rect.height;
    let width = rect.width;
    let top_mid = top + height / 2;
    let left_mid = left + width / 2;

    elem.style.left = (left + (dir_x * speed)) + "px";
    elem.style.top = (top + (dir_y * speed)) + "px";

    if ((top_mid >= window.innerHeight && dir_y > 0) || (top_mid <= 0 && dir_y < 0)) {
      dir_y *= -1;
    }

    if ((left_mid >= window.innerWidth && dir_x > 0) || (left_mid <= 0 && dir_x < 0)) {
      dir_x *= -1;
    }

    return [dir_x, dir_y];
  }

  function begin() {
    anim_elems = Array.from(document.getElementsByClassName("float_div"));

    for (let elem of anim_elems) {
      let start_dir_x = Math.random() < 0.5 ? -1 : 1;
      let start_dir_y = Math.random() < 0.5 ? -1 : 1;
      let start_speed = Math.random() * 1 + 0.75;
      dir_x.set(elem, start_dir_x);
      dir_y.set(elem, start_dir_y);
      speed.set(elem, start_speed);

      elem.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      elem.style.top = Math.floor(Math.random() * window.innerHeight) + "px";

      elem.setAttribute('draggable', false);
    }

    let idiot_spawned = false;
    
    function idiot() {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();

      if (hour == 3 && minute == 33 && !idiot_spawned) {
        idiot_spawned = true;
        spawn_idiots();
      }
    }

    function animateFrames() {
      for (let elem of anim_elems) {
        let [new_dir_x, new_dir_y] = animate(elem, dir_x.get(elem), dir_y.get(elem), speed.get(elem));
        dir_x.set(elem, new_dir_x);
        dir_y.set(elem, new_dir_y);
        idiot();
      }
      requestAnimationFrame(animateFrames);
    }

    animateFrames();
  }

  begin();
});
