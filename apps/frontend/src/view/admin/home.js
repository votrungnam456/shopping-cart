const AdminHomePage = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Fast Food Shop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden" />
          <img
            src="https://via.placeholder.com/250"
            alt="Burger"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Burger</h2>
            <p className="text-gray-600 mb-4">
              Delicious beef burger with lettuce, tomato, and cheese.
            </p>
            <p className="text-lg font-semibold text-red-500">$5.99</p>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://via.placeholder.com/250"
            alt="Pizza"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Pizza</h2>
            <p className="text-gray-600 mb-4">
              Delicious pizza with assorted toppings.
            </p>
            <p className="text-lg font-semibold text-red-500">$8.99</p>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
