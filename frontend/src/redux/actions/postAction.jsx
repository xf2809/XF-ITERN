import { getAllAppliedPostFailed, getAllAppliedPostSuccess } from "../admin/adminSlice";
import toast from "react-hot-toast";
import {
  createPostSuccess, deletePostSuccess, getAllPostExist, getAllPostFailed, getallPostOtherAdminFailed,
  getallPostOtherAdminSuccess, getAllPostSuccess,
  getBookmark,
  getChangeStatusFailed,
  getchangeStatusSuccess,
  getError,
  getPost,
  updatePostSuccess
} from "../admin/postSlice";
const server = `http://localhost:9009`

export const getAllPostofAllAdmin = (limit = 10, skip = 0) => async (dispatch) => {
  try {
    const url = `${server}/api/post?limit=${limit}&skip=${skip * 10}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getAllPostExist(admin.output));

  } catch (err) {
    // dispatch(getError(err.info.message)) 
  }
}

export const getAllPost = () => async (dispatch) => {
  try {
    const url = `${server}/api/post/all/post`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getAllPostSuccess(admin.output));

  } catch (err) {
    dispatch(getAllPostFailed(err.info.err))
  }
}

export const getAllPostOtherAdmin = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/post/allpost/${id}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getallPostOtherAdminSuccess(admin.output));

  } catch (err) {
    dispatch(getallPostOtherAdminFailed(err.info.err))
  }
}
// all user/student who applied on one post (like that)
export const getAllUserOnPost = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/post/applied/${id}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    dispatch(getAllAppliedPostSuccess(admin.output));
  } catch (err) {
    dispatch(getAllAppliedPostFailed(err.info.err));

  }
}
export const ChangeStatus = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/post/status/${id}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    dispatch(getchangeStatusSuccess(admin.output));

  } catch (err) {
    dispatch(getChangeStatusFailed(err.info.err));

  }
}

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const url = `${server}/api/post/create`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    toast.success("Yeah Sir,Created New Post");
    setTimeout(() => {
      navigate('/admin/allpost')
    }, 1000);
    // dispatch(createPostSuccess(admin.output));
  } catch (err) {
    dispatch(getError(err.info.err));
    toast.error(err.info.err);
  }
}
export const updatePost = (post, id, navigate) => async (dispatch) => {
  try {
    const url = `${server}/api/post/update/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    toast.success("Updated Sir 🫡");
    navigate('/admin/allpost');
    dispatch(getPost(admin));
  } catch (err) {
    dispatch(getError(err.info.err));
  }
}
export const deletePost = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/post/delete/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    toast.success("Deleted Post");
    dispatch(getAllPost());
  } catch (err) {
    dispatch(getError(err.info.err));
    toast.error("Opps!!!");
  }
}
export const viewPost = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/post/${id}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    dispatch(getPost(admin.output));
  } catch (err) {
    dispatch(getError(err.info.err));
  }
}
export const appliedPost = (post) => async (dispatch) => {
  try {
    const url = `${server}/api/v1/applied`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    toast.success(admin.message);
    // dispatch(getPost(admin.output));
  } catch (err) {
    dispatch(getError(err.info.message));
    if (err.info.message.includes("E11000")) {
      toast.error("You already applied !");
    } else {
      toast.error(err.info.message);
    }
  }
}
export const getAllBookmark = () => async (dispatch) => {
  try {
    const url = `${server}/api/v1/bookmark`;
    const res = await fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    // toast.success(admin.message);
    dispatch(getBookmark(admin.bookmark));
  } catch (err) {
    dispatch(getError(err.info.message));
    toast.error(err.info.message);

  }
}
export const addBookmark = (post) => async (dispatch) => {
  try {
    const url = `${server}/api/v1/add/bookmark`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const admin = await res.json();
    toast.success("Added to Bookmark");
  } catch (err) {
    dispatch(getError(err.info.message));
    toast.error(err.info.message);
  }
}

export const feedbackMe = (post) => async (dispatch) => {
  try {

    const url = `${server}/api/v1/feedback`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }

    const feedback = await res.json();

    toast.success("Thanks for feedback");
  } catch (err) {

    dispatch(getError(err.info.message));
    toast.error(err.message);
  }
}
export const subscribeMe = (post) => async (dispatch) => {
  try {

    const url = `${server}/api/v1/subscribe`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();

      throw error
    }

    const subscribeMe = await res.json();

    toast.success("Thanks for subscribing Us");
  } catch (err) {

    dispatch(getError(err.info.message));
    toast.error(err.info.message);
  }
}