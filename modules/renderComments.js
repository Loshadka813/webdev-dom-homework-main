import { comments } from "./coments.js";
import { initLikeComments } from "./initLike.js"; 
import { initAnswerComment } from "./answer.js"; 

const commentsList = document.querySelector('.comments');

export function renderComments() {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
                <div class="comment-header">
                  <div data-index="${index}">${comment.author}</div>
                  <div>${comment.date || new Date().toLocaleString()}</div>
                </div>
                <div class="comment-body">
                  <div class="comment-text" data-index="${index}">
                    ${comment.text}
                  </div>
                </div>
                <div class="comment-footer">
                  <div class="likes">
                    <span class="likes-counter" data-index="${index}">${comment.likesCount}</span>
                    <button class="like-button" data-index="${index}"></button>
                  </div>
                </div>
              </li>`;
    }).join('');

    commentsList.innerHTML = commentsHtml;
    initLikeComments();

    initAnswerComment();
};