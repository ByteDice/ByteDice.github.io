function add_sidebar(articles) {
  let sidebar_base = document.createElement("div");
  sidebar_base.className = "sidebar";

  document.body.appendChild(sidebar_base);

  let text = document.createElement("p");
  text.style.fontSize = "30px";
  text.textContent = "Articles:"
  sidebar_base.appendChild(text);

  let list = document.createElement("ul");
  sidebar_base.appendChild(list);

  for (let [item, value] of Object.entries(articles)) {
    let list_item = document.createElement("li");
    list_item.style.marginBottom = "5px";
    let a = document.createElement("a");
    a.className = "sidebar_link"
    a.textContent = item;
    a.href = `/pages/articles/article/${value}/${value}.html`;
    list_item.appendChild(a);
    list.appendChild(list_item);
  }

  console.log("added sidebar");
}


window.addEventListener('load', function() {
  let articles = {
    "How to make your first Discord bot": "discord_bot_tuto",
  };

  add_sidebar(articles);
});