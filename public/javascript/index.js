const moreButton = document.querySelectorAll('.more')

moreButton.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.children[1].classList.toggle('d-none')
  })
})
