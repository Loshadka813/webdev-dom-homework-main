const authToken = "https://wedev-api.sky.pro/api/user";

export let token = "";
export const updateToken = (newToken) => {
  token = newToken;
};

export let name = "";
export const updateName = (newName) => {
  name = newName;
};

export const fetchComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v2/marina-lebakina/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        if (response.status === 500) {
          throw new Error("Упс.. Сервер упал");
        }

        throw new Error("Что-то пошло не так");
      }
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          author: comment.author.name,
          date: comment.date,
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      return appComments;
    });
};

export const postComments = (text, name) => {
  return fetch("https://wedev-api.sky.pro/api/v2/marina-lebakina/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
          throw new Error("Вы допустили ошибку");
        }
        throw new Error("Что-то пошло не так");
      }
    })
    .then(() => {
      return fetchComments();
    });
};

export const login = (login, password) => {
  return fetch(authToken + "/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
};

export const registration = (login, name, password) => {
  return fetch(authToken, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });
};
