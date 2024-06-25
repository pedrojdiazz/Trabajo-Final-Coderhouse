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
                            <button> Eliminar </button>
                            <hr>`
                            
        productsContainer.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        })
    })

} 
  
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}

document.getElementById("sendButton").addEventListener("click", () => {
    addProduct(); 
})

const addProduct = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    }
    
    socket.emit("addProduct", producto);
}
