import spinner from "./assets/spinner.gif";

function Spinner() {
  return (
    <div className='w-100 mt-100'>
      <img src={spinner} alt='Loading....' width={180} />
    </div>
  );
}

export default Spinner;
