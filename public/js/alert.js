// Show Alert

const showAlert = document.querySelector("[show-alert]");

if(showAlert){
  const dataTime = showAlert.getAttribute("data-time");
  // console.log(dataTime);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, dataTime);

  const closeAlert = showAlert.querySelector("[close-alert]");

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}

// End Show Alert

