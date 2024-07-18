const socket = io();

socket.on("products", (data) => {
    renderProductos(data);
})

const renderProductos = (data) => {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = ""
    data.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `  <p>Producto: ${item.title}</p>
                            <p>Id: ${item._id}</p>
                            <p>Descripcion: ${item.description}</p>
                            <p>Precio: ${item.price}</p>
                            <p>Stock: ${item.stock}</p>
                            <p>Categoria: ${item.category}</p>
                            <button> Eliminar </button>
                            <hr>`
                            
        productsContainer.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item._id);
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
