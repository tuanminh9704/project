// Filter Status

const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    const url = new URL(window.location.href);
    // console.log(url);
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}
// End Filer Status


// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log(event.target.elements.keyword.value);
        
        const keyword = event.target.elements.keyword.value;
        console.log(keyword);
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// End Form search


// Button Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination.length > 0){
    const url = new URL(window.location.href);
    buttonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            if(page){
                url.searchParams.set("page", page);
            }
            window.location.href = url.href;
        })
    })
}

// End Button Pagination


// Button change status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("[form-change-status ]");

    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path);
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");

            const id = button.getAttribute("data-id");

            const changeStatus = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${changeStatus}/${id}?_method=PATCH`;

            formChangeStatus.action = action;

            formChangeStatus.submit();

        })
    })
}

// End button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true;
      });
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if(countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {

    event.preventDefault();

    const inputsChecked = document.querySelectorAll("input[name='id']:checked");


    const typeChange = event.target.elements.type.value;
    // console.log(typeChange);

    if(typeChange == "delete-all"){
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa bản ghi này?");

      if(!isConfirm){
        return;
      }
    } 
    if(inputsChecked.length > 0) {
      const ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");


      inputsChecked.forEach(input => {
        const id = input.value;
        if(typeChange == "change-position"){

          const position = input.closest("tr").querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        }
        else{
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End form-change-multi


// Button Delete

const buttonDelete = document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0){
  const formDelete = document.querySelector("[form-delete]");

  const path = formDelete.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {

      const id = button.getAttribute("data-id");
      // console.log(id);

      const isConfirm = confirm("Bạn có chắc chắn muốn xóa bản ghi này?");

      if(isConfirm){
        const action = path + `/${id}?_method=DELETE`;
      
        formDelete.action = action;
  
        formDelete.submit();
      }
    })
  })
}

// End Button Delete


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

// Preview Upload Image

const uploadImage = document.querySelector("[upload-image]");

if(uploadImage){
  // console.log(uploadImage);
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (event) => {
    const [file] = uploadImageInput.files
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
}

// End Preview Upload Image



// Button restore

const buttonRestore = document.querySelectorAll("[button-restore]");
if(buttonRestore.length > 0){
  // console.log(buttonRestore);
  const formRestore = document.querySelector("[form-restore]");

  buttonRestore.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");

      const path = formRestore.getAttribute("data-path");

      const action = path + `/${id}?_method=PATCH`;

      const isConfirm = confirm("Bạn có muốn khôi phục sản phẩm này không?");

      if(isConfirm){

        formRestore.action = action

        formRestore.submit();
      }

    })
  })
}
// End Button restore

// BUtton delete (trash)

const buttonDeletePermanen = document.querySelectorAll("[button-delete-permanent]");

if(buttonDeletePermanen.length > 0){

  // console.log(buttonDeletePermanen);
  const formDeletePermanent = document.querySelector("[form-delete]");

  buttonDeletePermanen.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");

      const path = formDeletePermanent.getAttribute("data-path");

      const action = path + `/${id}?_method=DELETE`;

      const isConfirm = "Bạn có chắc chắn muốn xóa vĩnh viễn bản ghi này không?";

      // console.log(action);

      if(isConfirm){
        formDeletePermanent.action = action;

        formDeletePermanent.submit();
      }
    })
  })
}

// End button delete (trash)


// Button Delete All

  const  buttonDeleteAllModal = document.querySelector("[button-delete-all-modal]");

  // console.log(buttonDeleteAllModal);

  if(buttonDeleteAllModal){

    const formDeletePermanent = document.querySelector("[form-delete-permanent]");

    // console.log(formDeletePermanent);

    buttonDeleteAllModal.addEventListener("click", () => {
      const inputsChecked = document.querySelectorAll("input[name='id']:checked");

      const ids = [];

      inputsChecked.forEach(input => {
        const id = input.value;

        ids.push(id);
      })
      const queryParams = ids.map(id => `ids=${id}`).join('&');

      const path = formDeletePermanent.getAttribute("data-path");

      const action = `${path}/?${queryParams}&_method=DELETE`;

      const isConfirm = confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${ids.length} không?`);

      if(isConfirm){
      
      formDeletePermanent.action = action;

      formDeletePermanent.submit();
      }
      
    });
  }
// End Button Delete All


// Button Restore All
const  buttonRestoreAll = document.querySelector("[button-restore-all]");


if(buttonRestoreAll){

  const formRestoreAll = document.querySelector("[form-restore-all]");

  buttonRestoreAll.addEventListener("click", () => {
    const inputsChecked = document.querySelectorAll("input[name='id']:checked");

    const ids = [];

    inputsChecked.forEach(input => {
      const id = input.value;

      ids.push(id);
    })
    const queryParams = ids.map(id => `ids=${id}`).join('&');

    const path = formRestoreAll.getAttribute("data-path");

    const action = `${path}/?${queryParams}&_method=PATCH`;

    const isConfirm = confirm(`Bạn có chắc chắn muốn khôi phục ${ids.length} không?`);

    if(isConfirm){
    
      formRestoreAll.action = action;

      formRestoreAll.submit();
    }
    
  });
}
// End Button Restore All


// sort by criteria

const sort = document.querySelector("[sort]");
  // sort
if(sort){
  const url = new URL(window.location.href);
  console.log(url);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });
  // end sort

  // Button Clear Sort
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  })

// End Button Clear Sort

// sort selected

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  const stringSort = `${sortKey}-${sortValue}`;
  const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
  console.log(optionSelected);

  optionSelected.selected = true;

// end sort selected

}
// End sort by criteria


