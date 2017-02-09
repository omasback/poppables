export default function cardSlideUp() {
  const cardsList = document.querySelectorAll('.aboutCard');
  cardsList.forEach((card, index) => {
    const time = (1 + (.166 * index)) * 1000;
    setTimeout(() => {
      card.classList.add('slideUpAnimation')
    }, time)
  })
}
