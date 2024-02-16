// Update quantity

const tableCart = document.querySelector("[table-cart]");

if(tableCart){
    const inputQuantity = tableCart.querySelectorAll("input[name='quantity']");

    // console.log(inputQuantity);

    inputQuantity.forEach(input => {
        input.addEventListener("change", (event) => {
            const quantity = input.value;

            const productId = input.getAttribute("item-id");

            // console.log(quantity);
            // console.log(productId);

            window.location.href = `/cart/update/${productId}/${quantity}`;

        })
    })
}
// End update quantity    