const todoList = document.getElementById("todoList");
const formEl = document.querySelector(".form");

// const wrapper = document.querySelector(".wrapper");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    if (data.todoItems === "") {
      alert("You should enter task");
    } else {
      const addTodoData = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!addTodoData.ok) {
        throw new Error("Failed to post new data");
      }
    }
  } catch (error) {
    console.error(error);
  }
});

const showTodoList = async () => {
  try {
    const response = await fetch("http://localhost:3000/todoList");
    if (!response.ok) {
      throw new Error("Failed to fetch new data");
    }
    const data = await response.json();
    if (data.length > 0) {
      document.querySelector(".wrapper").style.display = "flex";
    }
    data.forEach((item) => {
      const listItems = document.createElement("li");
      const delBtn = document.createElement("button");
      delBtn.classList.add("delBtn");
      delBtn.classList.add("btn");
      delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      listItems.textContent = item.todoItems;
      delBtn.addEventListener("click", () => deleteData(item.id));
      todoList.appendChild(listItems);
      listItems.appendChild(delBtn);
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (itemId) => {
  try {
    const deleteResponse = await fetch(
      `http://localhost:3000/todoList/${itemId}`,
      {
        method: "DELETE",
      }
    );
    if (!deleteResponse.ok) {
      throw new Error("Failed to delete data");
    }
  } catch (error) {
    console.error(error);
  }
};
showTodoList();
