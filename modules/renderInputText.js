export const renderRegistration = () => {
    const app = document.getElementById('app')

    app.innerHTML = `
    <div class="add-form">
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    `
}
