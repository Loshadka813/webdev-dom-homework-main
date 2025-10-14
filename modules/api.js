export const fetchComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-lebakina/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          author: comment.author.name,
          date: comment.date,
          text: comment.text,
          likesCount: comment.likesCount,
          likes: false,
        };
      });

      return appComments;
    });
};

export const postComments = (text, name) => {
  return fetch("https://wedev-api.sky.pro/api/v1/marina-lebakina/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
      forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        if (response.status === 500) {
          throw new Error("Упс.. Сервер упал");
        }
        if (response.status === 400) {
          throw new Error(
            "Вы допустили ошибку. Возможно имя или тест короче 3 символов",
          );
        }

        // throw new Error("Что-то пошло не так");
      }
    })
    .then(() => {
      return fetchComments();
    });
};
