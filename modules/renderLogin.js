import { fetchComments, login, updateToken, updateName } from "./api.js";
import { updateComments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { renderRegistration } from "./renderRegistration.js";

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
    if (loginElement.value.trim() === "") {
      loginElement.classList.add("error");
      setTimeout(() => {
        loginElement.classList.remove("error");
      }, 2000);
      return;
    }

    if (passwordElement.value.trim() === "") {
      passwordElement.classList.add("error");
      setTimeout(() => {
        passwordElement.classList.remove("error");
      }, 2000);
      return;
    }

    login(loginElement.value, passwordElement.value)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("Неправильный логин или пароль");
          }
          throw new Error(
            "Неверно введены данные. Проверьте еще раз и попробуйте снова",
          );
        }
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

  const buttonReg = document.getElementById("registration-button");

  buttonReg.addEventListener("click", () => {
    renderRegistration();
  });
};
