import { renderComments } from "./modules/renderComments.js";
// import { initButtonComment } from './modules/addButton.js'
import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";

import { renderLogin } from "./modules/renderLogin.js";

document.querySelector(".comments").innerHTML = "Загрузка данных...";

fetchComments()
  .then((data) => {
    updateComments(data);
    renderComments();
  })
  .catch((error) => {
    alert(error.message);
  });

// initButtonComment(renderComments)

renderLogin();
