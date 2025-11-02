import { comments } from "./comments.js";
import { initLikeComments } from "./initLike.js";
import { initAnswerComment } from "./answer.js";

const commentsList = document.querySelector(".comments");

export function renderComments() {
  const likesCount = 0;
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
                <div class="comment-header">
                  <div data-index="${index}">${comment.author}</div>
                  <div>${new Date(comment.date).toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</div>
                </div>
                <div class="comment-body">
                  <div class="comment-text" data-index="${index}">
                    ${comment.text}
                  </div>
                </div>
                <div class="comment-footer">
                  <div class="likes">
                    <span class="likes-counter" data-index="${index}">${comment.likes || likesCount}</span>
                    <button class="like-button" data-index="${index}"></button>
                  </div>
                </div>
              </li>`;
    })
    .join("");

  commentsList.innerHTML = commentsHtml;
  initLikeComments();

  initAnswerComment();
}
