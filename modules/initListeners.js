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
        comments[index].likesCount--;
        comments[index].likes = false;
        likeElement.classList.remove("-active-like");
      } else {
        comments[index].likesCount++;
        comments[index].likes = true;
        likeElement.classList.add("-active-like");
      }

      renderComments();
    });
  }
};
