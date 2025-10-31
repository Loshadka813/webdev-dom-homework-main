export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <div class="form">
      <h3 class="form-title">Регистрация</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Введите логин"><br>
        <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя"><br>
        <input type="text" id="password-input" class="input" placeholder="Введите пароль"> <br>
        <button class="add-form-button" id="login-button">Зарегистрироваться</button>
      </div>
    </div>
    `
}
