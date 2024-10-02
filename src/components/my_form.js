
const MyForm = ({topic, submit, name, setName, phone, setPhone, e}) => {
    return (         <div className="flex items-center justify-center min-h-screen">
        <form 
        className="bg-white shadow-lg rounded-lg p-8 space-y-6 w-full max-w-md"
        onSubmit={submit}
        >
          <h2 className="text-center text-2xl font-bold">{topic}</h2>
  
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value = {name}
              onChange = {setName}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              value = {phone}
              onChange ={setPhone}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />

          </div>
  
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Done
            </button>
          </div>
        </form>
      </div> );
}
 
export default MyForm;