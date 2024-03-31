window.addEventListener('load', function() {
  let articles = { // {"article name": "article.html"}
    "example": "example.html",
    "example 2": "example.html"
  };
  
  function config_sidebar() {
  }

  function add_sidebar() {
    let sidebar_base = document.createElement("div");
    sidebar_base.className = "sidebar";

    document.body.appendChild(sidebar_base);

    let list = document.createElement("ul");
    sidebar_base.appendChild(list);

    for (let [item, value] of Object.entries(articles)) {
      let list_item = document.createElement("li");
      list_item.style.marginBottom = "5px";
      let a = document.createElement("a");
      a.textContent = item;
      a.href = `article/${value}`;
      list_item.appendChild(a);
      list.appendChild(list_item);
    }

    console.log("added sidebar");
  }
  
  config_sidebar();
  add_sidebar();
});