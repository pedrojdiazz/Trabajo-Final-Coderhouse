const socket = io();

socket.on("products", (data) => {
    renderProductos(data);
})

const renderProductos = (data) => {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = ""
    data.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `  <p>${item.title}</p>
                            <p>${item.id}</p>
                            <p>${item.description}</p>
                            <p>${item.price}</p>
                            <p>${item.stock}</p>
                            <p>${item.category}</p>
                            <button> Eliminar </button>`
        productsContainer.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        })
    })

}   

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}