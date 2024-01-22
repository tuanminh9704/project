const tablePermission = document.querySelector("[table-permissions]");

if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const results = [];
        const rows = tablePermission.querySelectorAll("[data-name]");

        // console.log(rows);

        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            // console.log(inputs);
            if(name == "id"){
                inputs.forEach((input) => {
                    const id = input.value;
                    // console.log(id);
                    results.push({
                        id: id,
                        permission: [],
                    })
                })
            }
            else{
                inputs.forEach((input, index) => {
                    const inputChecked = input.checked;
                    // console.log(inputChecked);
                    if(inputChecked){
                        results[index].permission.push(name);
                    }
                })
            }
        })
        // console.log(results);
        const formChangePermission = document.querySelector("#form-change-permissions");
        const inputFormChangePermission = formChangePermission.querySelector("input");
        inputFormChangePermission.value = JSON.stringify(results);
        formChangePermission.submit();
    })
}


const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");
    
  records.forEach((item, index) => {
    const permissions = item.permissions;
    permissions.forEach(item => {
        const rows = tablePermissions.querySelector(`tr[data-name='${item}']`);
        // console.log(input);
        const input = rows.querySelectorAll("input")[index];
        input.checked = true;
        // console.log(input);
    })
  })
}

