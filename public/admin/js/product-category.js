//Button Change Status

const buttonChangeStatusCategory = document.querySelectorAll("[button-change-status-category]");

if(buttonChangeStatusCategory.length > 0){

    const formChangeStatusCategory = document.querySelector("[form-change-status-category]");

    const path = formChangeStatusCategory.getAttribute("data-path");
    buttonChangeStatusCategory.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");

            const currentStatus = button.getAttribute("data-status");

            const changeStatus = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${changeStatus}/${id}?_method=PATCH`;

            formChangeStatusCategory.action = action;

            formChangeStatusCategory.submit();
        })
    })
}

// End Button Change Status


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


// Filter Status

const buttonFilterStatus = document.querySelectorAll("[button-status]");
// console.log(buttonFilterStatus);

if(buttonFilterStatus.length > 0){
  const url = new URL(window.location.href);

  buttonFilterStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if(status){
        url.searchParams.set("status", status);
      }
      else{
        url.searchParams.delete("status");
      }

      window.location.href = url;
    })
  })
}

// End Filter Status

// Search

const formSearchCategory = document.querySelector("#form-search");

if(formSearchCategory){
  const url = new URL(window.location.href);
  formSearchCategory.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;

    if(keyword){
      url.searchParams.set("keyword", keyword);
    }
    else{
      url.searchParams.delete("keyword");
    }

    window.location.href = url;
  })
}


// End Search