const comments = [
  {
    author: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likesCount: 3,
    likes: false,
  },
  {
    author: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likesCount: 75,
    likes: true,
  },
];

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const commentsList = document.querySelector(".comments");

const initAnswerComment = () => {
  const commentsElements = document.querySelectorAll("li");

  for (const commentEl of commentsElements) {
    const index = commentEl.dataset.index;

    commentEl.addEventListener("click", () => {
      textInput.value = `${comments[index].author}:  ${comments[index].text}\n\nОтвет: `;
    });
  }
};

function renderComments() {
  const commentsHtml = comments
    .map((comment, index) => {
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
    })
    .join("");

  commentsList.innerHTML = commentsHtml;
  initLikeComments();

  initAnswerComment();
}

addButton.addEventListener("click", () => {
  const name = nameInput.value
    .trim()
    .replaceAll("<", "&lt")
    .replaceAll(">", "&gt");
  const text = textInput.value
    .trim()
    .replaceAll("<", "&lt")
    .replaceAll(">", "&gt");

  nameInput.classList.remove("error");
  textInput.classList.remove("error");

  if (name === "") {
    nameInput.classList.add("error");
    return;
  }

  if (text === "") {
    textInput.classList.add("error");
    return;
  }

  const newDate = new Date().toLocaleString();

  comments.push({
    author: name,
    date: newDate,
    text: text,
    likesCount: 0,
    likes: false,
  });

  nameInput.value = "";
  textInput.value = "";

  renderComments();
});

const initLikeComments = () => {
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

renderComments();
