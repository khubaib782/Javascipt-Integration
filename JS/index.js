//Display all posts

async function fetchPosts() {
  try {
    const response = await fetch(`https://dummyjson.com/posts?limit=3`);
    const data = await response.json();
    // console.log(data, "DataOne");
    const posts = data.posts;

    const postImage = document.getElementById("feed-container");
    for (let i = 0; i < posts.length; i++) {
      const responseUser = await fetch(
        `https://dummyjson.com/users/${posts[i].userId}`
      );
      const userData = await responseUser.json();
      // const users = userData.users;
      // console.log(userData, "userdata");
      const responseComments = await fetch(
        `https://dummyjson.com/comments/post/${posts[i].id}`
      );

      // console.log(responseComments, "res");
      const commentData = await responseComments.json();
      // console.log(posts[i].id, "Post ID");
      const comments = commentData.comments;
      // console.log("ye ha post id");
      // console.log(posts[i].id);
      // console.log(comments, "comments");
      // console.log(comments[0].body, "comments");
      // if (comments.length > 0) {
      // console.log(comments[0].body, "comments");
      // Your existing code for displaying comments
      // } else {
      // console.log("No comments for this post");
      // Handle the case where there are no comments, perhaps display a message or leave it empty
      // }
      // console.log(users[i].username, " UserName");
      const userElement = document.createElement("div");
      userElement.classList.add("feedPosts");
      userElement.innerHTML = `
      <div class="feed"> 
              <section class="username">
                <div class="image">
                  <a href="/"
                    ><img
                    src="${userData.image}"
                      style="object-fit: cover"
                  /></a>
                </div>
                <div class="id">
                  <a href="/">${userData.username}</a>
                </div>
              </section>
              <section class="post">
                <img
                  src="https://i0.wp.com/myadventuresacrosstheworld.com/wp-content/uploads/2018/03/rice-fields-bali-spa-1-e1522157798920.jpg?resize=1000%2C667&ssl=1"
                />
              </section>
              <section class="btn-group">
                <button type="button" class="btn-love">
                  <i class="far fa-heart fa-lg"></i>
                </button>
                <button type="button" class="btn-comment">
                  <i class="far fa-comment fa-lg"></i>
                </button>
                <button type="button" class="btn-share">
                  <i class="fas fa-share fa-lg"></i>
                </button>
                <button type="button" class="btn-bookmark">
                  <i class="far fa-bookmark fa-lg"></i>
                </button>
              </section>
              <section class="caption">
                <p class="like">20 likes</p>
                <p>
                  <b>${userData.username}</b
                  >
                  ${posts[i].title}
                </p>

                <h5> All Comments </h5>

              
               
              </section>
               
              <div id="comment-card-${posts[i].id}">
              <div class="d-flex justify-content-center mb-4">
                <div style="width: 95%" class="card">
                  <div class="card-body p-2">
                    <div class="">
                      <div class="img-user-div d-flex">
                        <img
                          class="rounded-circle shadow-1-strong me-2"
                          src="${userData.image + 1}"
                          alt="avatar"
                          width="40px"
                          height="40px"
                        />
                        <div>
                          <h6 class="m-0">${userData.firstName}</h6>
                          <p class="m-0 small">
                            ${
                              comments.length > 0
                                ? comments[0].body
                                : "No comments yet"
                            }
                          </p>
                        </div>
                      </div>
            
                      <p class="mb-0 mt-1" style="font-size: 10px; font-weight: 600">
                        3 hours ago
                      </p>
                      <div class="pt-1 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <a style="font-size: 12px" href="#!" class="link-muted me-2"
                            ><i class="fas fa-thumbs-up me-1"></i>132</a
                          >
                          <a style="font-size: 12px" href="#!" class="link-muted me-2"
                            ><i class="fas fa-thumbs-down me-1"></i>15</a
                          >
                          </div>                                            
                          <a style="font-size: 12px" href="#!" class="me-1 link-muted"
                          ><i class="fas fa-reply me-1"></i> Reply</a
                        >
                      </div>
                      <div
                        id="add-comment-${posts[i].id}"
                        class="add-comment-container"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
        
            <div class="comments-container">
            <form>
              <div class="form-group">
              <textarea id="comment-text-${
                posts[i].id
              }" class="form-control status-box" rows="3" placeholder="Enter your comment here..."></textarea>

              </div>
            </form>
            <div class="button-group pull-right">
            <a onclick="addComment(${
              posts[i].id
            })" href="#" class="btn btn-primary">Post</a>
            </div>
            <ul class="posts">
            </ul>
            </div>
      `;
      postImage.appendChild(userElement);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

fetchPosts();

// Get all users

async function getAllUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    // console.log(data, "Data one");
    const users = data.users;
    const allUsers = document.getElementById("user-name");

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userElement = document.createElement("div");
      userElement.classList.add("datainfo");
      userElement.innerHTML = `
        <div>
          <img src="${users[i].image}" />
          <div class="active"></div>
        </div>
        <div class="last-text-div">
          <h6 id="username">${users[i].firstName}</h6>
          <p class="text-muted">${users[i].username}</p>
        </div>
      `;
      allUsers.appendChild(userElement);
    }
    // console.log(users, "Data");
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getAllUsers();

// Add comment

async function addComment(postId) {
  try {
    event.preventDefault();
    const textarea = document.getElementById(`comment-text-${postId}`);

    if (!textarea) {
      console.error(`Textarea with ID 'comment-text-${postId}' not found`);
      return;
    }

    const inputComment = textarea.value;
    const response = await fetch(`https://dummyjson.com/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: inputComment,
        postId: postId,
        userId: 5,
      }),
    });

    if (response.ok) {
      console.log("Comment added successfully");
      textarea.value = "";
      // const commentContainer = document.getElementById(`add-comment-${postId}`);
      const commentContainer = document.getElementById(
        `comment-card-${postId}`
      );
      commentContainer.innerHTML += `
        <div class="d-flex justify-content-center mb-4">         
          <div style="width: 95%" class="card">
            <div class="card-body p-2">
              <div class="img-user-div d-flex">
                <img class="rounded-circle shadow-1-strong me-2" src="https://robohash.org/Coralie.png?set=set41" alt="avatar" width="40px" height="40px">
                <div>
                  <h6 class="m-0">Coralie</h6>
                  <p id="your-comment-${postId}" class="m-0 small">${inputComment}</p>
                </div>
              </div>
              <p class="mb-0 mt-1" style="font-size: 10px;font-weight: 600;">3 hours ago</p>
              <div class="pt-1 d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
              <a style="font-size: 12px" href="#!" class="link-muted me-2"
                ><i class="fas fa-thumbs-up me-1"></i>132</a
              >
              <a style="font-size: 12px" href="#!" class="link-muted me-2"
                ><i class="fas fa-thumbs-down me-1"></i>15</a
              >
              <a style="font-size: 12px" href="#!" class="me-3 link-muted"
              ><i class="fas fa-reply me-1"></i> Reply</a
            >
            </div>
           <div>
           <div onclick="updateComment(${postId})" class="me-3 edit-comment-btn">
                <i class="fas fa-pen"></i> 
              </div>
              
            <div onclick="deleteComment(${postId})" class="me-1 delete-comment-btn">
                <i class="fas fa-trash-alt"></i> 
              </div>
           </div>
              </div>
              <div id="add-comment-6" class="add-comment-container">
              </div>
            </div>              
          </div>
        </div>`;
    } else {
      console.error("Failed to add comment");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Update Comment

async function updateComment(postId) {
  try {
    const textarea = document.getElementById(`comment-text-${postId}`);
    // console.log(textarea, 1);

    const commentContent = document.getElementById(
      `your-comment-${postId}`
    ).textContent;
    // console.log(commentContent, 2);

    textarea.value = commentContent;

    console.log("Comment content retrieved successfully:", commentContent);
    setTimeout(() => {
      // console.log("This message will be logged after 2 seconds.");\
      swal({
        title: "Update!",
        text: "Comment Updated Successfully!",
        icon: "success",
      });
    }, 500);
  } catch (error) {
    console.error("Error updating comment:", error);
  }
}

// Delete Comment

async function deleteComment(commentId) {
  try {
    const response = await fetch(
      `https://dummyjson.com/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Comment deleted successfully");
      setTimeout(() => {
        swal({
          title: "Delete!",
          text: "Comment Deleted Successfully!",
          icon: "error",
        });
      }, 500);
    } else {
      console.error("Failed to delete comment");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

// Function to perform search based on user input
function performSearch() {
  const searchInput = document.getElementById("searchPost").value.trim();
  // console.log(searchInput, "SEarch");
  if (searchInput !== "") {
    searchPosts(searchInput);
  } else {
    console.log("Search is empty");
  }
}

// Function to search posts
async function searchPosts(query) {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts/search?q=${query}`
    );
    const searchData = await response.json();
    const searchPosts = searchData.posts;
    // console.log(searchData, "SP");

    const postImage = document.getElementById("feed-container");
    postImage.innerHTML = "";

    for (let i = 0; i < searchPosts.length; i++) {
      const post = searchPosts[i];
      console.log(post.userId, "POst id");

      const responseUser = await fetch(
        `https://dummyjson.com/users/${post.userId}`
      );
      const userData = await responseUser.json();

      console.log(userData, "USERDATA");

      const userElement = document.createElement("div");
      userElement.classList.add("feedPosts");
      userElement.innerHTML = `
        <div class="feed"> 
          <section class="username">
            <div class="image">
              <a href="/"><img src="${userData.image}" style="object-fit: cover"/></a>
            </div>
            <div class="id">
              <a href="/">${userData.username}</a>
            </div>
          </section>
          <section class="post">
            <img src="https://i0.wp.com/myadventuresacrosstheworld.com/wp-content/uploads/2018/03/rice-fields-bali-spa-1-e1522157798920.jpg?resize=1000%2C667&ssl=1"/>
          </section>
          <section class="btn-group">
            <button type="button" class="btn-love"><i class="far fa-heart fa-lg"></i></button>
            <button type="button" class="btn-comment"><i class="far fa-comment fa-lg"></i></button>
            <button type="button" class="btn-share"><i class="fas fa-share fa-lg"></i></button>
            <button type="button" class="btn-bookmark"><i class="far fa-bookmark fa-lg"></i></button>
          </section>
          <section class="caption">
            <p class="like">20 likes</p>
            <p><b>${userData.username}</b> ${post.title}</p>
            <h5> All Comments </h5>
          </section>
          <div id="comment-card-${post.id}">
        
          </div>
          <div class="comments-container">
            <form>
              <div class="form-group">
                <textarea id="comment-text-${post.id}" class="form-control status-box" rows="3" placeholder="Enter your comment here..."></textarea>
              </div>
            </form>
            <div class="button-group pull-right">
              <a onclick="addComment(${post.id})" href="#" class="btn btn-primary">Post</a>
            </div>
            <ul class="posts"></ul>
          </div>
        </div>
      `;
      postImage.appendChild(userElement);
    }
  } catch (error) {
    console.error("Error fetching search posts:", error);
  }
}
