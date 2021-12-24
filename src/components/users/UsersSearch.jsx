import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";

function UsersSearch() {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter user", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({
        type: "GET_USERS",
        payload: users,
      });
      setText("");
    }
  };

  return (
    <div className=' grid grid-cols-1 xl:grid-cols-2 lg:grid-col-2 md:grid-col-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit} action='' className='form-control'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search'
              className='w-full pr-40 bg-gray-200 input input-lg text-black'
              value={text}
              onChange={handleChange}
            />
            <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>
              Go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className='btn btn-ghost btn-lg'>
            clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersSearch;
