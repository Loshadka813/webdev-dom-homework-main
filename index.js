import { renderComments } from "./modules/renderComments.js";
import { initButtonComment } from "./modules/addButton.js";
import { updateComments } from "./modules/coments.js";

fetch("https://wedev-api.sky.pro/api/v1/marina-lebakina/comments", {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateComments(data.comments);
    renderComments();
  });

initButtonComment();
renderComments();
