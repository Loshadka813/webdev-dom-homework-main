import { fetchComments, login, updateToken, updateName } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = () => {
  const container = document.querySelector(".container");

  const loginHtml = `
    <div class="form">
      <h3 class="form-title">Вход</h3>
      <div class="form-row">
        <input 
        type="text" 
        id="login-input" 
        class="input" 
        placeholder="Введите логин">
        <br>
        <input 
        type="text" 
        id="password-input" 
        class="input" 
        placeholder="Введите пароль">
        <br>
        <button class="add-form-button" id="login-button">Войти</button>
        <button class="add-form-button" id="registration-button">Зарегистрироваться</button>
      </div>
    </div>
    `;

  container.innerHTML = loginHtml;

  const buttonLogin = document.getElementById("login-button");
  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");

  buttonLogin.addEventListener("click", () => {
    login(loginElement.value, passwordElement.value)
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
