export default function form() {
  const form = document.querySelector('.registration__form')

  if (!form) return

  const button = document.querySelector('.registration__submit')
  validateForm()

  form.addEventListener('change', validateForm)
  form.addEventListener('input', validateForm)

  function validateForm() {
    const els = Array.from(form.querySelectorAll('[required]'))
    const invalidEls = els.filter(el => !el.validity.valid)

    if (invalidEls.length > 0) {
      button.disabled = true
    } else {
      button.disabled = false
    }
  }
}
