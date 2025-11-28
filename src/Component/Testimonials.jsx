"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alice Johnson",
      text: "Great service, highly recommend! The delivery was super fast and the products are top-notch.",
      avatar: "https://i.ibb.co.com/LDbzZK5m/alice.jpg",
      rating: 5,
    },
    {
      name: "Bob Smith",
      text: "Fast delivery and excellent support. I had some questions and they answered immediately.",
      avatar: "https://i.ibb.co.com/whpPTJjy/smith.jpg",
      rating: 4,
    },
    {
      name: "Clara Lee",
      text: "Products arrived in perfect condition. Very happy with the shopping experience.",
      avatar: "https://i.ibb.co.com/nxcxzkD/clara.jpg",
      rating: 5,
    },
    {
      name: "David Kim",
      text: "Amazing variety of products. I found everything I needed and the checkout was smooth.",
      avatar: "https://i.ibb.co.com/rGhzFM7v/david.jpg",
      rating: 4,
    },
    {
      name: "Emma Williams",
      text: "Customer support is fantastic! They helped me choose the right product for my needs.",
      avatar: "https://i.ibb.co.com/TBRs8fJZ/ad.jpg",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <section className="py-20 bg-green-50 text-center">
      <h2 className="text-3xl text-green-600 font-bold mb-12">
        What Our Customers Say
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 mb-2">{t.text}</p>
            <div className="text-yellow-500 mb-2">{renderStars(t.rating)}</div>
            <h4 className="font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
