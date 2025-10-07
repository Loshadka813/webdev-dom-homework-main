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
    }),
  }).then(() => {
    return fetchComments();
  });
};
