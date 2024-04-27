function postCard() {
  fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((postData) => {
      console.log("Post Data:", postData);
      const posts = postData.posts;
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((userData) => {
          // Fetch post data
          const users = userData.users;
          // console.log("User Data:", users);
          // Log post data

          posts.forEach((post, index) => {
            //   fetch(https:dummyjson.com/comments/post/${post.id})
            fetch(`https://dummyjson.com/comments/post/${post.id}`)
              .then((res) => res.json())
              .then((getallCommentsOnPosts) => {
                const comments = getallCommentsOnPosts.comments;
                console.log(comments);

                fetch("https://dummyjson.com/comments/add", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    body: "This makes all sense to me!",
                    postId: post.id, // Using post.id instead of posts.id
                    userId: 5,
                  }),
                })
                  .then((res) => res.json())
                  .then((addcomment) => {
                    const insertComment = addcomment.insertComment;
                    console.log(insertComment);
                  });

                // Display merged data in the DOM
                const postList = document.getElementById("postList");
                const userIndex = index % users.length;
                const user = users[userIndex];
                const postElement = document.createElement("div");
                postElement.classList.add("card", "mb-3", "p-3");

                postElement.innerHTML = `
                                  <div class="post-header">
                                      <div class="user-name">
                                          <img src=${user.image} alt="" />
                                          <div class="user-info">
                                              <p id="user-name">${
                                                user.firstName
                                              }</p>
                                              <p>${user.address.address}</p>
                                          </div>
                                      </div>
                                      <i class="fa-solid fa-ellipsis" onclick="showProp()"></i>
                                  </div>
                                  <div id="dropdown-list"></div>
                                  <img src="../Images/background1.jpg" class="card-img-top" />
                                  <div class="card-body p-0">
                                      <div class="actions">
                                          <div>
                                              <i class="bi bi-heart"></i>
                                              <i class="bi bi-chat"></i>
                                              <i class="bi bi-share"></i>
                                          </div>
                                          <i class="bi bi-bookmark"></i>
                                      </div>
                                      <div class="liked-by-info">
                                          <div class="liked-persons">
                                              <img src="../Images/prof6.jpg" />
                                              <img src="../Images/prof3.jpg" />
                                              <img src="../Images/prof5.webp" />
                                          </div>
                                          <p>Liked by <b>ulfatrasool</b> and <b>999 others</b></p>
                                      </div>
  
                                      <div>${post.body}</div>
  
                                      <div class="comment-section" id="comment-section">
                                      <h6>Comments</h6>
                                          ${comments
                                            .map(
                                              (comment) => `
                                              
                                              <div class="comment-wrapper">
                                              <p><b>${comment.user.username}:</b> ${comment.body} </p>
                                              <div class="comment-icon">
                                              <i class="fa-regular fa-pen-to-square" id="edit-comment"></i>
                                              <i class="fa-regular fa-trash-can" id="delete-comment"></i>
                                              </div>
                                              </div>  
                                              
                                                  
                                              `
                                            )
                                            .join("")}
                                            </div>
                                            <p class="show-more" onClick="showMore()">show more</p>
                                      <div class="comment-box">
                                          <img src="../Images/Sallahudin.JPEG" alt="" />       
                                          <div class="input-group comment-grp">
                                              <input type="text" id="comment-input" class="comment-input" placeholder="Add comment ..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                              <button type="button" class="comment-btn" onClick="postComment()"><i class="fa-regular fa-paper-plane"></i></button>
                                          </div>
                                      </div>
                                  </div>
                              `;
                postList.appendChild(postElement);
              })
              .catch((error) => {
                console.error("Error fetching comment data:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching post data:", error);
    });
}

//
{
  /* <a href=""
data-bs-toggle="modal"
data-bs-target="#exampleModal"
>
View all comments
</a>

<div
class="modal fade"
id="exampleModal"
tabindex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div class="modal-dialog modal-dialog-scrollable">
<section>
<div class="container my-5 py-5">
  <div class="row d-flex justify-content-center">
    <div class="col-md-12 col-lg-10">
      <div class="card text-body">
         <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="modal-title" id="exampleModalLabel">All Comments</h5>
          <button type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

        <div id="comments-card" class="card-body p-4">

          <div class="d-flex flex-start">
            <img class="rounded-circle shadow-1-strong me-3"
              src="${users[i].image}" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 class="fw-bold mb-1">Maggie Marsh</h6>
              <div class="d-flex align-items-center mb-3">
                <p class="mb-0">
                  March 07, 2021
                  <span class="badge bg-primary">Pending</span>
                </p>
                <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
              </div>
              <p class="mb-0">
             ${comments[i].body}
              </p>
            </div>
          </div>
        </div>
        <hr class="my-0" />
      </div>
    </div>
  </div>
</div>
</section>
</div>
<p class="time">5 minute ago</p>
</section>
<div class="comments-container">
<form>
<div class="form-group">
  <textarea class="form-control status-box" rows="3" placeholder="Enter your comment here..."></textarea>
</div>
</form>
<div class="button-group pull-right">
<a href="#" class="btn btn-primary">Post</a>
</div>
<ul class="posts">
</ul>

 */
}



<div
class="modal fade"
id="exampleModal"
tabindex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div class="modal-dialog modal-dialog-scrollable">
<section>
<div class="container my-5 py-5">
  <div class="row d-flex justify-content-center">
    <div class="col-md-12 col-lg-10">
      <div class="card text-body">
         <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="modal-title" id="exampleModalLabel">All Comments</h5>                
          <button type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

        <div class="card-body p-4">

          <div class="d-flex flex-start">
            <img class="rounded-circle shadow-1-strong me-3"
              src="${userData.image}" alt="avatar" width="60"
              height="60" />
            <div>
              <h6 class="fw-bold mb-1">Maggie Marsh</h6>
              <div class="d-flex align-items-center mb-3">
                <p class="mb-0">
                  March 07, 2021
                  <span class="badge bg-primary">Pending</span>
                </p>
                <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
              </div>
              <p class="mb-0">
              ${
                comments.length > 0
                  ? comments[0].body
                  : "No comments yet"
              }
            </p>
            </div>
          </div>
        </div>

        <hr class="my-0" />
                    
      </div>
    </div>
  </div>
</div>



<section class="caption">
                <p class="like">20 likes</p>
                <p>
                  <b>${userData.username}</b
                  >
                  ${posts[i].title}
                </p>

              <h4> All Comments </h4>

                <p class="mb-0">
                ${comments.length > 0 ? comments[0].body : "No comments yet"}
              </p>
               
              </section>
               
              <div class="comments-container">
              <form>
                <div class="form-group">
                  <textarea class="form-control status-box" rows="3" placeholder="Enter your comment here..."></textarea>
                </div>
              </form>
              <div class="button-group pull-right">
                <a href="#" class="btn btn-primary">Post</a>
              </div>
              <ul class="posts">
              </ul>
