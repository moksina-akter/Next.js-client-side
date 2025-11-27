"use client";

export default function Features() {
  const features = [
    {
      title: "Fast Delivery",
      subtitle: "Lightning Speed",
      description:
        "Get your products quickly and reliably, with tracking updates in real-time.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      subtitle: "100% Safe",
      description:
        "Transactions are safe, encrypted, and protected with multiple layers of security.",
      icon: "💳",
    },
    {
      title: "24/7 Support",
      subtitle: "Always Here",
      description:
        "We are here to help anytime via chat, email, or phone for any queries.",
      icon: "📞",
    },
    {
      title: "Easy Returns",
      subtitle: "Hassle-Free",
      description:
        "Not satisfied with a product? Return it easily within 30 days with full refund.",
      icon: "↩️",
    },
    {
      title: "Wide Selection",
      subtitle: "Everything You Need",
      description:
        "From electronics to fashion, we offer a huge variety of products for everyone.",
      icon: "🛍️",
    },
    {
      title: "Best Quality",
      subtitle: "Premium Products",
      description:
        "All products are carefully selected and tested to ensure high quality standards.",
      icon: "🏆",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12">Our Features</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
            <h4 className="text-green-500 font-medium mb-2">
              {feature.subtitle}
            </h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
