const standCardTemplate = document.querySelector("[data-stand-template]")
const standCardContainer = document.querySelector("[data-stand-cards-container]")
const searchStandInput = document.querySelector("[stand-search]")

let numdata = []

searchStandInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  numdata.forEach(stand => {
    const isVisible =
      stand.area.toLowerCase().includes(value) ||
      stand.phn.toLowerCase().includes(value)
    stand.element.classList.toggle("hide", !isVisible)
  })
})

fetch('assets/ksrtc-numbers.json')
  .then(res => res.json())
  .then(data => {
    numdata = data.map(stand => {
      const standInfo = standCardTemplate.content.cloneNode(true).children[0]
      const area = standInfo.querySelector("[data-area]")
      const phn = standInfo.querySelector("[data-phn]")
      area.textContent = stand.area
      phn.textContent = stand.phn
      standCardContainer.append(standInfo)
      return { area: stand.area, phn: stand.phn, element: standInfo }
    })
})

//Search table by highlighting the matching text
function searchHighlight() {
  clearHighlights(); // Clear existing highlights first
  const input = document.getElementById("text-to-search").value.trim().toLowerCase();
  if (!input) return;

  document.querySelectorAll("td").forEach(cell => {
    const text = cell.textContent;
    if (text.toLowerCase().includes(input)) {
      const regex = new RegExp(`(${input})`, 'gi');
      cell.innerHTML = text.replace(regex, `<mark class="highlight">$1</mark>`);
    }
  });
}

function clearHighlights() {
  document.querySelectorAll("td").forEach(cell => {
    cell.innerHTML = cell.textContent;
  });
}