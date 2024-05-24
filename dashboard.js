let selected_page = null;
let sub_pages = [];
let sub_pages_url = [];
let dashboard_flipflop_toggle = true;

function config_dashboard() {
  let categories = {
    "index": "/index.html",
    "socials": "/pages/socials/socials.html",
    "articles": "/pages/articles/articles.html",
    "videos": "/pages/videos/videos.html",
    "changelog": "/pages/changelog/changelog.html",
  };
  
  let current_page = window.location.pathname;
  let path_segments = current_page.split("/");
  if (path_segments.length >= 3 && path_segments[path_segments.length - 3] == "article") {
    path_segments[path_segments.length - 1] = "articles.html";
  }
  
  let file_name = path_segments[path_segments.length - 1] || "index.html";
  console.log(`file_name: ${file_name}`);

  for (const [name, page] of Object.entries(categories)) {
    if (page.endsWith(file_name)) {
      let file_name_extention = name.split(".");
      let file_name_extentionless = file_name_extention[0];
      let file_name_upper = file_name_extentionless.charAt(0).toUpperCase() + file_name_extentionless.slice(1);
      selected_page = file_name_upper;
    }
    else {
      let file_name_extention = name.split(".");
      let file_name_extentionless = file_name_extention[0];
      let file_name_upper = file_name_extentionless.charAt(0).toUpperCase() + file_name_extentionless.slice(1);
      sub_pages.push(file_name_upper);
      sub_pages_url.push(page);
    }
    
    console.log(`page: ${page}`);
  }
  
  console.log(`selected_page: ${selected_page}`);
  console.log(`sub_pages: ${sub_pages.join(", ")}`);
}


function add_dashboard() {
  let button_elements = [];

  for (let [index, elem] of sub_pages.entries()) {

    let button = `<button class="dashboard_button font_config">${elem}</button>`
    let a = `<a class="dashboard_a" href="${sub_pages_url[index]}">${button}</a>`;

    button_elements.push(a);
  }
  
  let dashboard_text = `Byte Dice | ${selected_page} | `;

  let dashboard_content_str = `
    <div class="dashboard_bar">
      ${dashboard_text}${button_elements.join("")}
    </div>
  `;

  let dashboard_base = document.createElement("div");
  dashboard_base.className = "dashboard_blur";
  dashboard_base.innerHTML = dashboard_content_str;
  
  document.body.appendChild(dashboard_base);
  
  let expander_button = document.createElement("button");
  expander_button.className = "dashboard_expander_button font_config";
  expander_button.textContent = "☰";

  expander_button.onclick = () => {
    if ( expander_button.innerText == "☰") {
      toggle_dashboard_size();
      expander_button.innerText = "🗕";
    } else {
      toggle_dashboard_size();
      expander_button.innerText = "☰";
    }
  };

  document.body.appendChild(expander_button);
  
  console.log("added dashboard");
}


function expand_dashboard() {
  let dashboard_bar = document.getElementsByClassName("dashboard_bar")[0];
  let dashboard_blur = document.getElementsByClassName("dashboard_blur")[0];

  dashboard_bar.style.maxHeight = "100%";
  dashboard_bar.style.display = "flex";
  dashboard_bar.style.flexWrap = "wrap";
  
  dashboard_blur.style.maxHeight = "100%";
}

function collapse_dashboard() {
  let dashboard_bar = document.getElementsByClassName("dashboard_bar")[0];
  let dashboard_blur = document.getElementsByClassName("dashboard_blur")[0];

  dashboard_bar.style.maxHeight = "100px";
  dashboard_bar.style.display = "block";
  dashboard_bar.style.flexWrap = "nowrap";
  
  dashboard_blur.style.maxHeight = "200px";
}


function toggle_dashboard_size() {
  if (dashboard_flipflop_toggle) {
    expand_dashboard();
    dashboard_flipflop_toggle = false;
  }
  else {
    collapse_dashboard();
    dashboard_flipflop_toggle = true;
  }
}


config_dashboard();
add_dashboard();