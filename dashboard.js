window.addEventListener('load', function() {
  let selected_page = null;
  let sub_pages = [];
  let sub_pages_url = [];
  
  function config_dashboard() {
    let categories = {
      "index": "/index.html",
      "socials": "/pages/socials/socials.html",
      "articles": "/pages/articles/articles.html",
      "videos": "/pages/videos/videos.html",
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
    let dashboard_base = document.createElement("div");
    dashboard_base.className = "dashboard_bar font_config";

    let button_elements = [];

    for (let [index, elem] of sub_pages.entries()) {
      let a = document.createElement('a');
      a.className = "dashboard_a";
      a.href = sub_pages_url[index];

      let button = document.createElement('button');
      button.className = "dashboard_button font_config";
      button.textContent = elem;

      a.appendChild(button);

      button_elements.push(a);
    }
    
    let dashboard_text = `Byte Dice | ${selected_page} | `;
    
    dashboard_base.textContent = dashboard_text;
    document.body.appendChild(dashboard_base);

    for (let button_element of button_elements) {
      dashboard_base.appendChild(button_element);
    }
    
    console.log("added dashboard");
  }

  config_dashboard();
  add_dashboard();
});