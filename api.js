// let postData = {
//     id:10,
//     body:'foo'
// };

//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify(postData)
//   })
//     .then((response) =>{
//         return response.json();
//     } ).then((result) =>{
//         console.log(result);
//     })
//     .catch(error => console.error('Error:', error));

//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//     .then((response) =>{
//         return response.json();
//     } ).then((result) =>{
//         console.log(result);
//     })
//     .catch(error => console.error('Error:', error));

//     fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//     .then((response) =>{
//         return response.json();
//     } ).then((result) =>{
//         console.log(result);
//     })
//     .catch(error => console.error('Error:', error));

//     fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(postData)
//   })
//     .then((response) =>{
//         return response.json();
//     } ).then((result) =>{
//         console.log(result);
//     })
//     .catch(error => console.error('Error:', error));

const tableEle = document.getElementById("urlResults");
document.addEventListener("DOMContentLoaded", () => {
  fetchPost();
});

function fetchPost() {
  const postUrl = "https://jsonplaceholder.typicode.com/posts";
  fetch(postUrl, {
    method: "GET",
    headers: { user: "bala" },
  })
    .then((response) => {
      return response.json();
    })
    .then((posts) => {
      console.log(typeof posts);
      let tablerow = "";
      for (let post of posts) {
        tablerow += `<tr>
            <td>${post.userId}</td>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            <td>
            <div style='display:flex;'>
            <button class='update-post' onClick = 'returnId(${post.id})'>Update</button>
            <button class='delete-post' id='delete'>Delete</button>
            </div>
            </td>
            </tr>`;
      }
      tableEle.innerHTML = tablerow;
    });
}

const addPB = document.getElementById("addpost");
console.log(addPB);
addPB.addEventListener("click", (e) => {
  const addMO = document.getElementById("addmodal");
  addMO.style.display = "block";
});

const closeEle = document.getElementsByClassName("close");
for (let closeEl of closeEle) {
  closeEl.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog();
  });
}

function closeDialog() {
  const addMO = document.getElementById("addmodal");
  addMO.style.display = "none";
  const updateMO = document.getElementById("updatemodal");
  updateMO.style.display = "none";
  const deleteMO = document.getElementById("deletemodal");
  deleteMO.style.display = "none";
}

const addmodal = document.getElementById("addmodal");
addmodal.addEventListener("submit", (e) => {
  e.preventDefault();
  var userid = document.getElementById("userId").value;
  // var id = document.getElementById('id').value;
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts/", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
      user: "bala",
    },
    body: JSON.stringify({
      userId: userid,
      // id:id,
      title: title,
      body: body,
    }),
  })
    .then((response) => {
      closeDialog();
      e.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});

tableEle.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("update-post")) {
    document.getElementById("updatemodal").style.display = "block";
    const postId =
      target.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.textContent;
    console.log(postId);
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        // console.log(results);
        let reqPost = results.find((result) => result.id === Number(postId));
        console.log(reqPost);
        populatePost(reqPost);
      });
  }
});

let populatePost = (post) => {
  document.getElementById("uuserId").value = post.userId;
  document.getElementById("utitle").value = post.title;
  document.getElementById("ubody").value = post.body;
};

function returnId(id) {
  console.log("button is clicked at ID:", id);
  const updatebutton = document.querySelector("#updatebutton");
  updatebutton.addEventListener("click", (e) => {
    e.preventDefault();
    const userIdupdate = document.getElementById("uuserId").value;
    const titleupdate = document.getElementById("utitle").value;
    const bodyupdate = document.getElementById("ubody").value;
    console.log(userIdupdate, titleupdate, bodyupdate);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/JSON",
        user: "bala",
      },
      body: JSON.stringify({
        userId: userIdupdate,
        title: titleupdate,
        body: bodyupdate,
      }),
    }).then((response) => {
      console.log(response.json());
      closeDialog();
    });
  });
}

//Delete Posts

// deletebutton.addEventListener('click',() => {
// //    document.getElementById('deletepopup').style.display = 'none';
// });
tableEle.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("delete-post")) {
    document.getElementById("deletemodal").style.display = "block";
    const yesbutton = document.getElementById("yesbutton");
    // console.log(yesbutton);
    yesbutton.addEventListener("click", () => {
      let postid =
        target.parentElement.parentElement.parentElement.firstElementChild
          .nextElementSibling.textContent;
      //  console.log(postid);
      fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          closeDialog();
        });
    });
  }
});

const nobutton = document.getElementById("nobutton");

nobutton.addEventListener("click", () => {
  closeDialog();
});
