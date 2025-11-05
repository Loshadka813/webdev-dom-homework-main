import { fetchComments, registration, updateToken, updateName } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export const renderRegistration = () => {
  const container = document.querySelector(".container");

  const regHtml = `
    <div class="form">
      <h3 class="form-title">Регистрация</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Введите логин"><br>
        <input type="text" id="name-input" class="input" placeholder="Введите ваше имя"><br>
        <input type="text" id="password-input" class="input" placeholder="Введите пароль"> <br>
        <button class="add-form-button" id="reg-button">Зарегистрироваться</button>
      </div>
    </div>
    `;

  container.innerHTML = regHtml;

  const buttonRegistration = document.getElementById("reg-button");
  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");
  const nameElement = document.getElementById("name-input");

  buttonRegistration.addEventListener("click", () => {
    registration(loginElement.value, nameElement.value, passwordElement.value)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateToken(data.user.token);
        updateName(data.user.name);
        fetchComments().then((data) => {
          updateComments(data);
          renderComments();
        });
      });
  });
};
