import { renderComments } from "./renderComments.js";
import { comments } from "./comments.js";

export const initLikeComments = () => {
  for (const likeElement of document.querySelectorAll(".like-button")) {
    const index = likeElement.dataset.index;

    if (comments[index].likes) {
      likeElement.classList.add("-active-like");
    }

    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeElement.dataset.index;

      if (comments[index].likes) {
        comments[index].likes--;
        comments[index].isLiked = false;
        likeElement.classList.remove("-active-like");
      } else {
        comments[index].likes++;
        comments[index].isLiked = true;
        likeElement.classList.add("-active-like");
      }

      renderComments();
    });
  }
};
