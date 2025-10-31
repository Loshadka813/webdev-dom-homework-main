const textInput = document.querySelector('.add-form-text')

import { comments } from './coments.js'

export const initAnswerComment = () => {
    const commentsElements = document.querySelectorAll('li')

    for (const commentEl of commentsElements) {
        const index = commentEl.dataset.index

        commentEl.addEventListener('click', () => {
            textInput.value = `${comments[index].author}:  ${comments[index].text}\n\nОтвет: `
        })
    }
}
