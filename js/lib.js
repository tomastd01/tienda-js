
const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(addButton => {
    addButton.addEventListener("click", () => {
        
        Swal.fire({
            icon: 'success',
            title: 'El producto se ha agregado al carrito.',
            timer: 1000
        })
    })
})