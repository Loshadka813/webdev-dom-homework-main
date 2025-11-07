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
    if (
      loginElement.value.trim() === "" ||
      loginElement.value.trim().length < 3
    ) {
      alert("Логин должен быть длиннее 3 символов и не должен быть пустым");

      loginElement.classList.add("error");
      setTimeout(() => {
        loginElement.classList.remove("error");
      }, 2000);
      return;
    }

    if (
      nameElement.value.trim() === "" ||
      nameElement.value.trim().length < 3
    ) {
      alert("Имя должен быть длиннее 3 символов и не должен быть пустым");

      nameElement.classList.add("error");
      setTimeout(() => {
        nameElement.classList.remove("error");
      }, 2000);
      return;
    }

    if (
      passwordElement.value.trim() === "" ||
      passwordElement.value.trim().length < 3
    ) {
      alert("Пароль должен быть длиннее 3 символов и не должен быть пустым");

      passwordElement.classList.add("error");
      setTimeout(() => {
        passwordElement.classList.remove("error");
      }, 2000);
      return;
    }

    registration(loginElement.value, nameElement.value, passwordElement.value)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("Пользователь с таким логином уже существует");
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
};
