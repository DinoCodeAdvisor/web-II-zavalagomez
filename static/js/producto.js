const createButton = document.getElementById('create-producto-button');

const successCreateText = document.getElementById('sucesss-create-text');
const errorCreateText = document.getElementById('error-create-text');
const errorCreateMessage = document.getElementById('error-create-message');

const successDeleteText = document.getElementById('sucesss-delete-text');
const errorDeleteText = document.getElementById('error-delete-text');
const errorDeleteMessage = document.getElementById('error-delete-message');

const tableBody = document.getElementById('recent-productos-table');

function addRecordToTable(id, name, precio, fecha_creacion, localidad) {

    tableBody.insertAdjacentHTML("afterbegin", `
        <tr id="producto-${id}" class="bg-white border border-gray-500">
            <th scope="row" class="border text-center py-4 font-medium text-gray-900 whitespace-nowrap">
                ${name}
            </th>
            <td class="px-6 py-4 text-center border">
                ${precio}
            </td>
            <td class="px-6 py-4 text-center border">
                ${fecha_creacion}
            </td>
            <td class="px-6 py-4 text-center border">
                ${localidad}
            </td>
            <td class="px-6 py-4 text-center border">
                <div class="flex mt-2 justify-center w-full">
                    <button onClick="deleteProducto({{producto.id}})" id="producto-delete-${id}" class="bg-red-800 text-white text-center font-semibold px-10 py-2 rounded-lg hover:bg-gray-600 transition">
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    `);
}

function deleteRecordToTable(id)
{
    tableRow = document.getElementById(`producto-${id}`);
    tableRow.classList.add('hidden');
}

function hideTexts()
{
    successCreateText.classList.add('hidden');
    errorCreateText.classList.add('hidden');
    successDeleteText.classList.add('hidden');
    errorDeleteText.classList.add('hidden');
}

createButton.addEventListener("click", function (event) {
    hideTexts();
    event.preventDefault();

    const form = document.getElementById("create-producto-form");
    const formData = new FormData(form);
    const data = {};
    const token = document.querySelector("#csrf_token").value;

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(PRODUCTO_CREATE_URL, {
        method: "POST",
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) =>
            res.json().then((json) => ({
                status: res.status,
                body: json,
            }))
        )
        .then(({ status, body }) => {
            if (status >= 400 && status <= 500) {
                errorCreateText.classList.remove("hidden");
                errorCreateMessage.innerText =
                    body.error || "An error occurred";
            } else if (status >= 200 && status < 300) {
                successCreateText.classList.remove("hidden");
                
                addRecordToTable(
                    body.data.id,
                    body.data.name,
                    body.data.precio,
                    body.data.fecha_creacion,
                    body.data.localidad_name
                );
            }
        })
        .catch((error) => {
            errorCreateText.classList.remove("hidden");
            errorCreateMessage.innerText = error.message;
        });
});

function deleteProducto(id)
{
    hideTexts();
    event.preventDefault();
    
    const token = document.querySelector("#csrf_token").value;
    fetch(PRODUCTO_DELETE_URL, {
        method: "POST",
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"producto_id": id}),
    })
        .then((res) =>
            res.json().then((json) => ({
                status: res.status,
                body: json,
            }))
        )
        .then(({ status, body }) => {
            if (status >= 400 && status <= 500) {
                errorDeleteText.classList.remove("hidden");
                errorDeleteMessage.innerText =
                    body.error || "An error occurred";
            } else if (status >= 200 && status < 300) {
                successDeleteText.classList.remove("hidden");

                deleteRecordToTable(id);
            }
        })
        .catch((error) => {
            errorCreateText.classList.remove("hidden");
            errorCreateMessage.innerText = error.message;
        });
}