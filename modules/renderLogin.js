import { fetchComments, login, updateToken } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { renderInputText } from "./renderInputText.js";

export const renderLogin = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="form">
      <h3 class="form-title">Вход</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Введите логин"><br>
        <input type="text" id="password-input" class="input" placeholder="Введите пароль"> <br>
        <button class="add-form-button" id="login-button">Войти</button>
        <button class="add-form-button" id="registration-button">Зарегистрироваться</button>
      </div>
    </div>
    `;

  const buttonLogin = document.getElementById("login-button");
  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");

  buttonLogin.addEventListener("click", () => {
    login(loginElement.value, passwordElement.value)
      .then((response) => {
        return response.json();
      })
      .then((responseDate) => {
        updateToken(responseDate.user.token);
        fetchComments().then((data) => {
          updateComments(data);
          renderComments();
          renderInputText();
        });
      });
  });
};
