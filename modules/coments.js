export let comments = [
  // {
  //   author: "Глеб Фокин",
  //   date: "12.02.22 12:18",
  //   text: "Это будет первый комментарий на этой странице",
  //   likesCount: 3,
  //   likes: false,
  // },
  // {
  //   author: "Варвара Н.",
  //   date: "13.02.22 19:22",
  //   text: "Мне нравится как оформлена эта страница! ❤",
  //   likesCount: 75,
  //   likes: true,
  // },
];

export const updateComments = (newComments) => {
  comments = newComments;
};
